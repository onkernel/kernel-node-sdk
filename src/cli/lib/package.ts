import type { KernelJson } from '@onkernel/sdk';
import fs from 'fs';
import fsExtra from 'fs-extra';
import os from 'os';
import path from 'path';
import { parse as parseToml, stringify as stringifyToml } from 'smol-toml';
import { NODE_PACKAGE_NAME, PYTHON_PACKAGE_NAME } from './constants';
import { runInDirectory } from './util';

interface PackageConfig {
  sourceDir: string;
  entrypoint: string;
  sdkOverrides: {
    node?: string;
    python?: string;
  };
  bootLoaderOverrides: {
    node?: string;
    python?: string;
  };
}

/**
 * Package a Kernel application.
 * We use a boot loader to export the kernel.json.
 *
 * @param config - The configuration for the package operation
 * @returns Path to the folder containing the kernel.json file + boot loader ready to run the app locally or upload to the cloud.
 */
export async function packageApp(config: PackageConfig): Promise<string> {
  const { sourceDir, entrypoint, sdkOverrides, bootLoaderOverrides } = config;
  const extension = path.extname(entrypoint);

  // Define our directory structure
  const kernelDir = path.resolve(path.join(sourceDir, '.kernel'));
  const kernelLocalDir = path.join(kernelDir, 'local');
  const kernelAppDir = path.join(kernelLocalDir, 'app');

  // Clean and create directories
  if (fs.existsSync(kernelLocalDir)) {
    fs.rmSync(kernelLocalDir, { recursive: true, force: true });
  }
  fs.mkdirSync(kernelLocalDir, { recursive: true });
  fs.mkdirSync(kernelAppDir, { recursive: true });

  // Copy user code dir to a temporary directory first, then move to .kernel/local/app directory
  // This is to avoid the error of copying a directory to a subdirectory of itself
  const tmpDir = path.join(os.tmpdir(), `kernel-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });
  copyDirectoryContents(sourceDir, tmpDir, ['.kernel']);
  if (fs.existsSync(kernelAppDir)) {
    fs.rmSync(kernelAppDir, { recursive: true, force: true });
  }
  fs.renameSync(tmpDir, kernelAppDir);

  // The generated kernel.json path
  const kernelJsonPath = path.join(kernelAppDir, 'kernel.json');

  // Determine the boot loader directory based on file extension
  let bootLoaderPath;
  if (extension === '.py' && bootLoaderOverrides.python) {
    bootLoaderPath = bootLoaderOverrides.python;
  } else if (extension === '.ts' && bootLoaderOverrides.node) {
    bootLoaderPath = bootLoaderOverrides.node;
  } else {
    // eventually this will be a default boot loader downloaded from somewhere
    throw new Error(`No boot loader specified for ${extension}`);
  }

  // Copy the boot loader to .kernel/local
  copyDirectoryContents(bootLoaderPath, kernelLocalDir);

  if (extension === '.py') {
    // 1. Update kernel SDK dependency if override is provided
    if (sdkOverrides.python) {
      if (fs.existsSync(path.join(kernelAppDir, 'pyproject.toml'))) {
        overwriteKernelDependencyInPyproject(
          path.join(kernelAppDir, 'pyproject.toml'),
          sdkOverrides.python,
        );
      }
      if (fs.existsSync(path.join(kernelAppDir, 'requirements.txt'))) {
        overwriteKernelDependencyInRequirementsTxt(
          path.join(kernelAppDir, 'requirements.txt'),
          sdkOverrides.python,
        );
      }
      if (fs.existsSync(path.join(kernelLocalDir, 'pyproject.toml'))) {
        overwriteKernelDependencyInPyproject(
          path.join(kernelLocalDir, 'pyproject.toml'),
          sdkOverrides.python,
        );
      }
    }

    // 2. Generate app_requirements.txt for merging with boot loader's pyproject.toml via uv add -r ./app/app_requirements.txt
    if (fs.existsSync(path.join(kernelAppDir, 'requirements.txt'))) {
      // If requirements.txt exists, just copy it to app_requirements.txt
      fs.copyFileSync(
        path.join(kernelAppDir, 'requirements.txt'),
        path.join(kernelAppDir, 'app_requirements.txt'),
      );
    } else {
      // Otherwise use uv to generate requirements
      await runInDirectory(
        `/bin/bash -c 'uv venv && \
          source .venv/bin/activate && \
          uv sync && \
          uv pip freeze > app_requirements.txt && \
          rm -rf .venv && \
          rm -rf __pycache__'`,
        kernelAppDir,
      );
    }

    // 3. Install app requirements in boot loader environment
    await runInDirectory(
      `/bin/bash -c 'uv venv && \
        source .venv/bin/activate && \
        uv add -r ./app/app_requirements.txt'`,
      kernelLocalDir,
    );

    // 4. Run the boot loader with --export
    await runInDirectory(
      `/bin/bash -c 'source .venv/bin/activate && \
        uv run python main.py --export ${kernelJsonPath} --entrypoint-relpath ${path.relative(sourceDir, entrypoint)} ${path.resolve(kernelAppDir)}'`,
      kernelLocalDir,
    );
  } else if (extension === '.ts') {
    // 1. Merge package.json dependencies
    const appPackageJsonPath = path.join(kernelAppDir, 'package.json');
    const bootPackageJsonPath = path.join(kernelLocalDir, 'package.json');
    if (!fs.existsSync(appPackageJsonPath)) {
      throw new Error('No package.json found in user code');
    }
    const appPackageJson = JSON.parse(fs.readFileSync(appPackageJsonPath, 'utf8'));
    const bootPackageJson = JSON.parse(fs.readFileSync(bootPackageJsonPath, 'utf8'));
    if (appPackageJson.dependencies) {
      if (!bootPackageJson.dependencies) {
        bootPackageJson.dependencies = {};
      }
      for (const [depName, depVersion] of Object.entries(appPackageJson.dependencies)) {
        if (!bootPackageJson.dependencies[depName]) {
          bootPackageJson.dependencies[depName] = depVersion;
        }
      }
    }
    if (appPackageJson.devDependencies) {
      if (!bootPackageJson.devDependencies) {
        bootPackageJson.devDependencies = {};
      }
      for (const [depName, depVersion] of Object.entries(appPackageJson.devDependencies)) {
        if (!bootPackageJson.devDependencies[depName]) {
          bootPackageJson.devDependencies[depName] = depVersion;
        }
      }
    }

    // Override kernel SDK if specified
    if (sdkOverrides.node) {
      bootPackageJson.dependencies[NODE_PACKAGE_NAME] = sdkOverrides.node;
    }
    fs.writeFileSync(bootPackageJsonPath, JSON.stringify(bootPackageJson, null, 2));

    // 2. Install dependencies
    await runInDirectory('pnpm i', kernelLocalDir);

    // 3. Run the boot loader with --export
    await runInDirectory(
      `pnpm exec tsx index.ts --export ${kernelJsonPath} \
      --entrypoint-relpath ${path.relative(sourceDir, entrypoint)} \
      ${path.resolve(kernelAppDir)}`,
      kernelLocalDir,
    );
  } else {
    throw new Error(`Unsupported file extension: ${extension}`);
  }

  // Verify kernel.json was created
  if (!fs.existsSync(kernelJsonPath)) {
    throw new Error('Failed to create kernel.json');
  }

  // cache a mapping from app name to the kernalLocalDir
  // this lets us know where to invoke the app locally when the user runs `kernel invoke --local <app name>'
  const cacheDir = path.join(os.homedir(), '.local', 'state', 'kernel', 'deploy', 'local');
  fs.mkdirSync(cacheDir, { recursive: true });
  const kernelJson = JSON.parse(fs.readFileSync(kernelJsonPath, 'utf8')) as KernelJson;
  for (const app of kernelJson.apps) {
    fs.writeFileSync(path.join(cacheDir, app.name), kernelLocalDir);
  }
  return kernelLocalDir;
}

/**
 * Copy all files from source directory to target directory
 */
export function copyDirectoryContents(
  sourceDir: string,
  targetDir: string,
  excludeDirs: string[] = [],
) {
  fsExtra.copySync(sourceDir, targetDir, {
    filter: (src: string) => {
      const basename = path.basename(src);
      const standardExcludes = [
        '.build',
        'node_modules',
        '.git',
        '.mypy_cache',
        '.venv',
        '__pycache__',
      ];
      return ![...standardExcludes, ...excludeDirs].includes(basename);
    },
    overwrite: true,
  });
}

function overwriteKernelDependencyInPyproject(
  pyprojectPath: string,
  kernelDependencyOverride: string,
) {
  const pyproject = parseToml(fs.readFileSync(pyprojectPath, 'utf8')) as any;
  if (!pyproject.project) {
    pyproject.project = { dependencies: [] };
  } else if (!pyproject.project.dependencies) {
    pyproject.project.dependencies = [];
  }
  pyproject.project.dependencies = pyproject.project.dependencies.filter((dep: string) => {
    return !dep.startsWith(PYTHON_PACKAGE_NAME);
  });
  // If it's a path, add it to tool.uv.sources instead
  if (
    !kernelDependencyOverride.startsWith('/') &&
    !kernelDependencyOverride.startsWith('./') &&
    !kernelDependencyOverride.startsWith('../')
  ) {
    pyproject.project.dependencies.push(kernelDependencyOverride);
  } else {
    pyproject.project.dependencies.push(PYTHON_PACKAGE_NAME);
    if (!pyproject.tool) {
      pyproject.tool = {};
    }
    if (!pyproject.tool.uv) {
      pyproject.tool.uv = {};
    }
    if (!pyproject.tool.uv.sources) {
      pyproject.tool.uv.sources = {};
    }
    pyproject.tool.uv.sources.kernel = { path: kernelDependencyOverride };
  }
  fs.writeFileSync(pyprojectPath, stringifyToml(pyproject));
}

function overwriteKernelDependencyInRequirementsTxt(
  requirementsTxtPath: string,
  kernelDependencyOverride: string,
) {
  const requirementsTxt = fs.readFileSync(requirementsTxtPath, 'utf8');
  const requirementsTxtLines = requirementsTxt.split('\n');
  const newRequirementsTxtLines = requirementsTxtLines.filter((line: string) => {
    return !line.startsWith(PYTHON_PACKAGE_NAME);
  });
  if (
    !kernelDependencyOverride.startsWith('/') &&
    !kernelDependencyOverride.startsWith('./') &&
    !kernelDependencyOverride.startsWith('../')
  ) {
    newRequirementsTxtLines.push(`${PYTHON_PACKAGE_NAME} @ file:${kernelDependencyOverride}`);
  } else {
    newRequirementsTxtLines.push(kernelDependencyOverride);
  }
  fs.writeFileSync(requirementsTxtPath, newRequirementsTxtLines.join('\n'));
}
