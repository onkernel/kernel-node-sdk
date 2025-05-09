#!/usr/bin/env bun
import chalk from 'chalk';
import { Command } from 'commander';
import fs, { createReadStream } from 'fs';
import getPort from 'get-port';
import os from 'os';
import path from 'path';
import * as tmp from 'tmp';
import type { KernelJson } from '../core/app-framework';
import { Kernel } from '../index';
import { packageApp } from './lib/package';
import { getPackageVersion, isPnpmInstalled, isUvInstalled, zipDirectory } from './lib/util';

const program = new Command();

// When we package a ts app, we have the option to use a custom kernel sdk dependency in package.json.
// This is useful for local dev.
// KERNEL_NODE_SDK_OVERRIDE=/Users/rafaelgarcia/code/onkernel/kernel/packages/sdk-node
// KERNEL_NODE_SDK_OVERRIDE_VERSION=0.0.1alpha.1
const KERNEL_NODE_SDK_OVERRIDE = process.env['KERNEL_NODE_SDK_OVERRIDE'] || undefined;
// Same for python...
// KERNEL_PYTHON_SDK_OVERRIDE=/Users/rafaelgarcia/code/onkernel/kernel/packages/sdk-python
// KERNEL_PYTHON_SDK_OVERRIDE_VERSION=0.0.1alpha.1
const KERNEL_PYTHON_SDK_OVERRIDE = process.env['KERNEL_PYTHON_SDK_OVERRIDE'] || undefined;

// Point to a local version of the boot loader or a specific version
const KERNEL_NODE_BOOT_LOADER_OVERRIDE = process.env['KERNEL_NODE_BOOT_LOADER_OVERRIDE'] || undefined;
const KERNEL_PYTHON_BOOT_LOADER_OVERRIDE = process.env['KERNEL_PYTHON_BOOT_LOADER_OVERRIDE'] || undefined;

if (process.argv.length === 3 && ['-v', '--version'].includes(process.argv[2]!)) {
  console.log(getPackageVersion());
  process.exit(0);
}

program.name('kernel').description('CLI for Kernel deployment and invocation');

program
  .command('deploy')
  .description('Deploy a Kernel application')
  .argument('<entrypoint>', 'Path to entrypoint file (TypeScript or Python)')
  .option('--local', 'Does not publish the app to Kernel, but installs it on disk for invoking locally')
  .option('--version <version>', 'Specify a version for the app (defaults to current timestamp)')
  .action(async (entrypoint, options) => {
    const resolvedEntrypoint = path.resolve(entrypoint);
    if (!fs.existsSync(resolvedEntrypoint)) {
      console.error(`Error: Entrypoint ${resolvedEntrypoint} doesn't exist`);
      process.exit(1);
    }

    // package up the app for either uploading or local deployment
    const dotKernelDir = await packageApp({
      sourceDir: path.dirname(resolvedEntrypoint), // TODO: handle nested entrypoint, i.e. ./src/entrypoint.ts
      entrypoint: resolvedEntrypoint,
      sdkOverrides: {
        ...(KERNEL_NODE_SDK_OVERRIDE && { node: KERNEL_NODE_SDK_OVERRIDE }),
        ...(KERNEL_PYTHON_SDK_OVERRIDE && { python: KERNEL_PYTHON_SDK_OVERRIDE }),
      },
      bootLoaderOverrides: {
        ...(KERNEL_NODE_BOOT_LOADER_OVERRIDE && { node: KERNEL_NODE_BOOT_LOADER_OVERRIDE }),
        ...(KERNEL_PYTHON_BOOT_LOADER_OVERRIDE && { python: KERNEL_PYTHON_BOOT_LOADER_OVERRIDE }),
      },
    });

    if (options.local) {
      const kernelJson = JSON.parse(
        fs.readFileSync(path.join(dotKernelDir, 'app', 'kernel.json'), 'utf8'),
      ) as KernelJson;
      for (const app of kernelJson.apps) {
        if (!app.actions || app.actions.length === 0) {
          console.error(`App "${app.name}" has no actions`);
          process.exit(1);
        }
        console.log(
          `App "${app.name}" successfully deployed locally and ready to \`kernel invoke --local ${quoteIfNeeded(app.name)} ${quoteIfNeeded(app.actions[0]!.name)}\``,
        );
      }
    } else {
      if (!process.env['KERNEL_API_KEY']) {
        console.error('Error: KERNEL_API_KEY environment variable is not set');
        console.error('Please set your Kernel API key using: export KERNEL_API_KEY=your_api_key');
        process.exit(1);
      }

      // Read kernel.json to get app info
      const kernelJson = JSON.parse(
        fs.readFileSync(path.join(dotKernelDir, 'app', 'kernel.json'), 'utf8'),
      ) as KernelJson;

      if (!kernelJson.apps || kernelJson.apps.length === 0) {
        console.error('Error: No apps found in kernel.json');
        process.exit(1);
      }

      const appName = kernelJson.apps[0]?.name;
      if (!appName) {
        console.error('Error: App name not found in kernel.json');
        process.exit(1);
      }

      // Create a Kernel client
      const client = new Kernel({
        apiKey: process.env['KERNEL_API_KEY'],
        baseURL: process.env['KERNEL_BASE_URL'] || 'http://localhost:3001',
      });

      // Set version (use provided version or generate from timestamp)
      const version = options.version || Date.now().toString();

      console.log(chalk.green(`Compressing files...`));
      const tmpZipFile = tmp.fileSync({ postfix: '.zip' });

      try {
        // Zip the packaged app
        await zipDirectory(path.join(dotKernelDir, 'app'), tmpZipFile.name);

        console.log(chalk.green(`Uploading app "${appName}" (version: ${version})...`));

        // Deploy to Kernel
        const response = await client.apps.deploy({
          appName: appName,
          file: createReadStream(tmpZipFile.name),
          version: version,
        });

        console.log(chalk.green(`App "${appName}" successfully deployed to Kernel`));
        console.log(
          `You can invoke it with: kernel invoke --version ${version} ${quoteIfNeeded(appName)} ${quoteIfNeeded(kernelJson.apps[0]!.actions[0]!.name)} PAYLOAD`,
        );
      } catch (error) {
        console.error('Error deploying to Kernel:', error);
        process.exit(1);
      } finally {
        // Clean up temp file
        tmpZipFile.removeCallback();
      }
    }
  });

function quoteIfNeeded(str: string) {
  if (str.includes(' ')) {
    return `"${str}"`;
  }
  return str;
}

program
  .command('invoke')
  .description('Invoke a deployed Kernel application')
  .option('--local', 'Invoke a locally deployed application')
  .option('--version <version>', 'Specify a version of the app to invoke')
  .argument('<app_name>', 'Name of the application to invoke')
  .argument('<action_name>', 'Name of the action to invoke')
  .argument('<payload>', 'JSON payload to send to the application')
  .action(async (appName, actionName, payload, options) => {
    let parsedPayload;
    try {
      parsedPayload = JSON.parse(payload);
    } catch (error) {
      console.error('Error: Invalid JSON payload');
      process.exit(1);
    }

    if (!options.local) {
      if (!process.env['KERNEL_API_KEY']) {
        console.error('Error: KERNEL_API_KEY environment variable is not set');
        console.error('Please set your Kernel API key using: export KERNEL_API_KEY=your_api_key');
        process.exit(1);
      }

      // Create a Kernel client
      const client = new Kernel({
        apiKey: process.env['KERNEL_API_KEY'],
        baseURL: process.env['KERNEL_BASE_URL'] || 'http://localhost:3001',
      });

      console.log(`Invoking "${appName}" with action "${actionName}" and payload:`);
      console.log(JSON.stringify(parsedPayload, null, 2));

      try {
        const response = await client.apps.invoke({
          appName,
          actionName,
          payload,
          ...(options.version && { version: options.version }),
        });

        console.log('Result:');
        console.log(JSON.stringify(JSON.parse(response.output || '{}'), null, 2));
      } catch (error) {
        console.error('Error invoking application:', error);
        process.exit(1);
      }
      return;
    }

    console.log(`Invoking "${appName}" with action "${actionName}" and payload:`);
    console.log(JSON.stringify(parsedPayload, null, 2));

    // Get the app directory
    const cacheFile = path.join(os.homedir(), '.local', 'state', 'kernel', 'deploy', 'local', appName);
    if (!fs.existsSync(cacheFile)) {
      console.error(`Error: App "${appName}" local deployment not found. `);
      console.error('Did you `kernel deploy --local <entrypoint>`?');
      process.exit(1);
    }
    const kernelLocalDir = fs.readFileSync(cacheFile, 'utf8').trim();
    if (!fs.existsSync(kernelLocalDir)) {
      console.error(`Error: App "${appName}" local deployment has been corrupted, please re-deploy.`);
      process.exit(1);
    }

    const isPythonApp = fs.existsSync(path.join(kernelLocalDir, 'pyproject.toml'));
    const isTypeScriptApp = fs.existsSync(path.join(kernelLocalDir, 'package.json'));
    const invokeOptions: InvokeLocalOptions = {
      kernelLocalDir,
      appName,
      actionName,
      parsedPayload,
    };
    try {
      if (isPythonApp) {
        await invokeLocalPython(invokeOptions);
      } else if (isTypeScriptApp) {
        await invokeLocalNode(invokeOptions);
      } else {
        throw new Error(`Unsupported app type in ${kernelLocalDir}`);
      }
    } catch (error) {
      console.error('Error invoking application:', error);
      process.exit(1);
    }
  });

/**
 * Waits for a process to output a startup message while echoing stderr
 */
async function waitForStartupMessage(
  childProcess: { stderr: ReadableStream },
  timeoutMs: number = 30000,
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout waiting for application startup.'));
    }, timeoutMs);

    const reader = childProcess.stderr.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        process.stderr.write(text);

        if (text.includes('Application startup complete.') || text.includes('Kernel application running')) {
          clearTimeout(timeout);
          resolve();
          break;
        }
      }
    } finally {
      reader.releaseLock();
    }
  });
}

type InvokeLocalOptions = {
  kernelLocalDir: string;
  appName: string;
  actionName: string;
  parsedPayload: any;
};

/**
 * Invokes a locally deployed Python app action
 */
async function invokeLocalPython({ kernelLocalDir, appName, actionName, parsedPayload }: InvokeLocalOptions) {
  const uvInstalled = await isUvInstalled();
  if (!uvInstalled) {
    console.error('Error: uv is not installed. Please install it with:');
    console.error('  curl -LsSf https://astral.sh/uv/install.sh | sh');
    process.exit(1);
  }

  // load kernel.json for entrypoint
  const kernelJson = JSON.parse(
    fs.readFileSync(path.join(kernelLocalDir, 'app', 'kernel.json'), 'utf8'),
  ) as KernelJson;
  const entrypoint = kernelJson.entrypoint;
  if (!entrypoint) {
    throw new Error('Local deployment does not have an entrypoint, please try re-deploying.');
  }

  // Find an available port and start the boot loader
  const port = await getPort();
  const pythonProcess = Bun.spawn(
    ['uv', 'run', '--no-cache', 'python', 'main.py', './app', '--port', port.toString()],
    {
      cwd: kernelLocalDir,
      stdio: ['inherit', 'inherit', 'pipe'],
      env: process.env,
    },
  );
  try {
    await waitForStartupMessage(pythonProcess);
  } catch (error) {
    console.error('Error while waiting for application to start:', error);
    pythonProcess.kill();
    process.exit(1);
  }

  try {
    await requestAppAction({ port, appName, actionName, parsedPayload });
  } catch (error) {
    console.error('Error invoking application:', error);
  } finally {
    console.log('Shutting down boot server...');
    pythonProcess.kill();
  }
}

/**
 * Invokes a locally deployed TypeScript app action
 */
async function invokeLocalNode({ kernelLocalDir, appName, actionName, parsedPayload }: InvokeLocalOptions) {
  const pnpmInstalled = await isPnpmInstalled();
  if (!pnpmInstalled) {
    console.error('Error: pnpm is not installed. Please install it with:');
    console.error('  npm install -g pnpm');
    process.exit(1);
  }

  // load kernel.json for entrypoint
  const kernelJson = JSON.parse(
    fs.readFileSync(path.join(kernelLocalDir, 'app', 'kernel.json'), 'utf8'),
  ) as KernelJson;
  const entrypoint = kernelJson.entrypoint;
  if (!entrypoint) {
    throw new Error('Local deployment does not have an entrypoint, please try re-deploying.');
  }

  // Find an available port and start the boot loader
  const port = await getPort();
  const tsProcess = Bun.spawn(
    ['pnpm', 'exec', 'tsx', 'index.ts', '--port', port.toString(), path.join(kernelLocalDir, 'app')],
    {
      cwd: kernelLocalDir,
      stdio: ['inherit', 'inherit', 'pipe'],
      env: process.env,
    },
  );

  try {
    await waitForStartupMessage(tsProcess);
  } catch (error) {
    console.error('Error while waiting for application to start:', error);
    tsProcess.kill();
    process.exit(1);
  }

  try {
    await requestAppAction({ port, appName, actionName, parsedPayload });
  } catch (error) {
    console.error('Error invoking application:', error);
  } finally {
    console.log('Shutting down boot server...');
    tsProcess.kill();
  }
}

async function requestAppAction({
  port,
  appName,
  actionName,
  parsedPayload,
}: {
  port: number;
  appName: string;
  actionName: string;
  parsedPayload: any;
}): Promise<any> {
  let serverReached = false;
  try {
    const healthCheck = await fetch(`http://localhost:${port}/`, {
      method: 'GET',
    }).catch(() => null);
    if (!healthCheck) {
      throw new Error(`Could not connect to boot server at http://localhost:${port}/`);
    }
    serverReached = true;
  } catch (error) {
    console.error('Error connecting to boot server:', error);
    console.error('The boot server might not have started correctly.');
    process.exit(1);
  }

  const response = await fetch(`http://localhost:${port}/apps/${appName}/actions/${actionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedPayload),
  }).catch((error) => {
    console.error(`Failed to connect to action endpoint: ${error.message}`);
    throw new Error(
      `Could not connect to action endpoint at http://localhost:${port}/apps/${appName}/actions/${actionName}`,
    );
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`HTTP error ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  console.log('Result:', JSON.stringify(result, null, 2));

  return result;
}

program.parse();
