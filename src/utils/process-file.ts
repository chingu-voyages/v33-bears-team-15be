import * as sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { resolve, join } from "path";
import { InternalServerErrorException, Logger } from "@nestjs/common";

import { doesPathExist, makeDir, writeFile } from "./file-system";

export interface IProcessFile {
  /**
   * Type of the file to be processed
   */
  fileType: ProcessFileType;
  /**
   * The buffer data of the file to be processed
   */
  fileBuffer?: Buffer;
  /**
   * Sub directory name to be placed under
   * @example bucket/{books|avatars}/`subDir`
   */
  subDir?: string;
  /**
   * Custom file name to be saved
   * @default UUID string
   */
  customName?: string;
  /**
   * Custom extension for the file
   * @default "jpeg"
   */
  customExt?: ProcessFileExtType;
}
export type SharpExtType = "jpeg" | "png" | "webp";
export type ProcessFileType = "cover" | "avatar" | "file";
export type ProcessFileExtType = SharpExtType | "pdf";

export interface IResizeImageArgs {
  width: string | number;
  height: string | number;
  customOptions?: sharp.ResizeOptions;
}

const LOG_LABEL = "PROCESS_FILE";

/**
 * @description Used to process inbound files, wraps the `fs` and `sharp` library
 * @class
 * @constructor
 */
export class ProcessFile {
  private readonly buffer: IProcessFile["fileBuffer"];
  private readonly subDir: string;
  private readonly fileName: string;
  private readonly ext: ProcessFileExtType;
  private readonly type: ProcessFileType;

  public constructor(args: IProcessFile) {
    this.buffer = args.fileBuffer;
    this.subDir = args.subDir || uuidv4();
    this.fileName = args.customName || `${Date.now()}-${uuidv4()}`;
    this.ext = args.customExt || "jpeg";
    this.type = args.fileType;
  }

  /**
   * @desciption Gets the custom output dir based on the type of the image
   * @param withResolvedPath {boolean} If option is enabled the output dir will include a fully resolved path
   * @returns {string}  The path to the output dir
   */
  private async getOutputDir(useStaticPath = false): Promise<string> {
    const baseDirPath = useStaticPath ? "/static" : resolve("bucket");

    let outputDir: string;

    if (this.type === "cover" || this.type === "file") {
      outputDir = join(baseDirPath, "books", this.subDir);
    } else {
      outputDir = join(baseDirPath, "avatars", this.subDir);
    }

    const outputDirExists = await doesPathExist(outputDir);

    if (!outputDirExists) {
      await makeDir(outputDir);
    }

    return join(outputDir, `${this.fileName}.${this.ext}`);
  }

  /**
   * @description Writes the file buffer to the filesystem using `fs` module
   * @returns {string} Relative path to the saved file
   */
  public async saveFile(): Promise<string> {
    const outputDir = await this.getOutputDir();

    if (!this.buffer) {
      throw new InternalServerErrorException("File must be a valid buffer!");
    }
    await writeFile(outputDir, this.buffer);

    return this.getOutputDir(true);
  }

  /**
   * @description Resizes and saves an images using the `sharp` module
   * @param {IResizeImageArgs} IResizeImageArgs
   * @param {IResizeImageArgs["width"]} IResizeImageArgs.width - Image width to be resized to
   * @param {IResizeImageArgs["height"]} IResizeImageArgs.height - Image height to be resized to
   * @param {IResizeImageArgs["customOptions"]} IResizeImageArgs.customOptions - Custom `sharp` resize options
   * @returns {string} Relative path to the processed saved file
   */
  public async resizeAndSave({
    width,
    height,
    customOptions,
  }: IResizeImageArgs): Promise<string> {
    if (typeof width === "string") {
      width = Number(width);
    }
    if (typeof height === "string") {
      height = Number(height);
    }

    if (!this.buffer) {
      throw new InternalServerErrorException("File must be a valid buffer!");
    }

    const outputDir: string = await this.getOutputDir();

    try {
      await sharp(this.buffer)
        .resize(width, height, {
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy,
          ...customOptions,
        })
        [this.ext as SharpExtType]({ quality: 90 })
        .toFile(outputDir);

      return this.getOutputDir(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        Logger.error(`Sharp error: ${e.message}`, LOG_LABEL);
      } else {
        Logger.error(e, LOG_LABEL);
      }
      throw new InternalServerErrorException("'Sharp' image resize failed!");
    }
  }
}
