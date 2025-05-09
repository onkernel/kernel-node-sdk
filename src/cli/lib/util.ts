import { execa } from 'execa';
import fsExtra from 'fs-extra';
import path, { dirname } from 'path';
import type { PackageJson } from 'type-fest';
import { fileURLToPath } from 'url';

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
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pkgJsonPath = path.join(__dirname, '..', 'package.json');
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
