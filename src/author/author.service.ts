import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";

import { AuthorRepository } from "./models/author.repository";
import { CreateAuthorDto, UpdateAuthorDto } from "./dto/index";
import { formatStringForPath, ProcessFile } from "@/utils";

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  private async processAvatarUpload(
    file: Express.Multer.File,
    authorName: string
  ): Promise<string | null> {
    if (file) {
      const formattedAuthorName = formatStringForPath(authorName);

      const pAvatar: ProcessFile = new ProcessFile({
        fileBuffer: file.buffer,
        fileType: "avatar",
        subDir: formattedAuthorName,
      });
      const avatarPath: string = await pAvatar.resizeAndSave({ width: 100, height: 100 });
      Logger.log("Author avatar has been processed and saved!", AuthorService.name);

      return avatarPath;
    }

    Logger.log("No author avatar file has been uploaded!", AuthorService.name);
    return null;
  }

  public async create(file: Express.Multer.File, a: CreateAuthorDto) {
    const authorRecord = await this.authorRepository.findOne({ name: a.name });

    if (authorRecord) {
      throw new ConflictException("Author already exists!");
    }

    const avatarPath: string | null = await this.processAvatarUpload(file, a.name);

    const newAuthorRecord = await this.authorRepository.create({
      ...a,
      avatar: avatarPath,
      books: JSON.parse(a.books as unknown as string),
    });
    Logger.log(`Create new author: ${newAuthorRecord._id}`, AuthorService.name);

    const { __v, ...newAuthorRecordWithoutVersion } = newAuthorRecord.toObject();

    return newAuthorRecordWithoutVersion;
  }

  public async findAll() {
    const authorRecords = await this.authorRepository.find();

    if (!authorRecords || authorRecords.length < 1) {
      throw new NotFoundException("No author records found!");
    }
    Logger.log(`Retrieved all authors`, AuthorService.name);

    return authorRecords;
  }

  public async findOne(id: string) {
    const authorRecord = await this.authorRepository.findById(id);

    if (!authorRecord) {
      throw new NotFoundException("No author record found!");
    }
    Logger.log(`Retrieved author: ${authorRecord._id}`, AuthorService.name);

    return authorRecord;
  }

  public async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const authorRecord = await this.authorRepository.findById(id);

    if (!authorRecord) {
      throw new NotFoundException("No author record found!");
    }

    const updatedAuthorRecord = await this.authorRepository.findByIdAndUpdate(
      id,
      updateAuthorDto
    );

    Logger.log(
      `Update author: ${authorRecord._id}\n\n${updateAuthorDto}`,
      AuthorService.name
    );

    return updatedAuthorRecord;
  }

  public async remove(id: string) {
    const authorRecord = await this.authorRepository.findById(id);

    if (!authorRecord) {
      throw new NotFoundException("No author record found!");
    }

    const deletedAuthorRecord = await this.authorRepository.deleteOne({ _id: id });

    Logger.log(`Delete author: ${authorRecord._id}`, AuthorService.name);

    return deletedAuthorRecord;
  }
}
