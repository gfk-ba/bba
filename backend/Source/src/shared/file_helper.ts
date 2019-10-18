/**
 * Contains the helper function for file access
 */

/**
 * Import node libraries
 */
import * as path from 'path';
import * as fs from 'fs';

/**
 * This helper function reads a file specified by a relative path in a synchronously way.
 * @param relativePath The relative path to the file.
 * @returns The file content as a string.
 */
export function readFile(relativePath): string {
  const sourcePath = path.resolve(__dirname, relativePath);
  return fs.readFileSync(sourcePath, 'utf8');
}
