import archiver from 'archiver';
import { execa } from 'execa';
import fs from 'fs';
import fsExtra from 'fs-extra';
import walk from 'ignore-walk';
import path from 'path';
import type { PackageJson } from 'type-fest';

/**
 * Run a command and return only the exit code
 *
 * @param command The command to run
 * @param options Optional options including working directory
 * @returns Promise resolving to just the exit code
 */
export async function runForExitCode(command: string, options: { cwd?: string } = {}): Promise<number> {
  try {
    const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd();

    // Run with stdio: 'ignore' to suppress output
    const { exitCode } = await execa(command, {
      shell: true,
      cwd,
      stdio: 'ignore', // Don't show any output
      reject: false, // Don't throw on non-zero exit code
    });

    return exitCode ?? 1; // Handle undefined by returning 1
  } catch (error) {
    // In case of other errors (not command execution errors)
    return 1;
  }
}

/**
 * Run a command in a specific directory that inherits IO and throws on error
 *
 * @param command The command to run
 * @param cwd Working directory
 * @returns Promise that resolves when command completes successfully or rejects on error
 */
export async function runInDirectory(command: string, cwd: string): Promise<void> {
  const resolvedCwd = path.resolve(cwd);

  // Run with stdio: 'inherit' to show output
  await execa(command, {
    shell: true,
    cwd: resolvedCwd,
    stdio: 'inherit',
  });
}

/**
 * Get the version from the package.json file.
 *
 * @returns Promise resolving to the package version string
 */
export function getPackageVersion(): string {
  const pkgJsonPath = path.join(__dirname, '..', '..', '..', 'package.json');
  const content = fsExtra.readJSONSync(pkgJsonPath) as PackageJson;
  if (!content.version) {
    throw new Error('package.json does not contain a version');
  }
  return content.version;
}

/**
 * Checks if uv is installed
 */
export async function isUvInstalled(): Promise<boolean> {
  const exitCode = await runForExitCode('uv --version');
  return exitCode === 0;
}

/**
 * Checks if pnpm is installed.
 */
export async function isPnpmInstalled(): Promise<boolean> {
  const exitCode = await runForExitCode('pnpm --version');
  return exitCode === 0;
}

/**
 * Zips a directory into a file
 *
 * @param sourceDir Directory to zip
 * @param outPath Path to output zip file
 * @returns Promise that resolves when zip is complete
 */
export async function zipDirectory(inputDir: string, outputZip: string): Promise<void> {
  const entries = await walk({
    path: inputDir,
    ignoreFiles: ['.gitignore', '.dockerignore'],
    includeEmpty: true,
    follow: false,
  });

  const output = fs.createWriteStream(outputZip);
  const archive = archiver('zip', { zlib: { level: 9 } });

  const finalizePromise = new Promise<void>((resolve, reject) => {
    output.on('close', resolve);
    archive.on('error', reject);
  });

  archive.pipe(output);

  for (const entry of entries) {
    const fullPath = path.join(inputDir, entry);
    const stat = fs.statSync(fullPath);
    const archivePath = entry.split(path.sep).join('/'); // Normalize to Unix slashes

    if (stat.isFile()) {
      archive.file(fullPath, { name: archivePath });
    } else if (stat.isDirectory()) {
      archive.append('', { name: archivePath.endsWith('/') ? archivePath : archivePath + '/' });
    }
  }

  await archive.finalize();
  await finalizePromise;
}
