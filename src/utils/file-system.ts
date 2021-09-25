import { promises as fs } from "fs";

/**
 * @description Function used to read a file from the file system
 * @param path - The absolute path to the file
 * @returns A buffer of the file or `undefined` if no file found
 */
export async function readFile(path: string): Promise<Buffer | void> {
  try {
    return await fs.readFile(path);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    } else {
      console.error(error);
    }
  }
}

/**
 * @description Function used to write a new file to the file system
 * @param path - The absolute path to the file
 * @param data - A buffer containing your file data
 * @returns A buffer of the file or `undefined` if no file found
 */
export async function writeFile(path: string, data: Buffer): Promise<Buffer | void> {
  try {
    return await fs.writeFile(path, data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    } else {
      console.error(error);
    }
  }
}

/**
 * @description Function used to create a new directory in the file system
 * @param path - The absolute path to where the directory will be created
 */
export async function makeDir(path: string): Promise<string | void> {
  try {
    await fs.mkdir(path, { recursive: true });

    return `Directory created at ${path}!`;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Got an error trying to make directory: ${error.message}`);
    } else {
      console.error(error);
    }
  }
}

/**
 * @description Function used to verify if a path already exists in the file system
 * @param path - The absolute path to be verified
 * @returns `true` or `false`
 */
export async function doesPathExist(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch (error: unknown) {
    return false;
  }
}
