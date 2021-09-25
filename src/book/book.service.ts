import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";

import { ProcessFile, formatBookName } from "@/utils";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { UploadBookDto } from "./dto/upload-book.dto";
import { BookRepository } from "./models/book.repository";

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  private async processUploadedFiles(f: UploadBookDto, bookName: string) {
    const coverImage: Buffer | undefined = f.cover?.[0].buffer;
    const pdfFile: Buffer | undefined = f.file?.[0].buffer;
    const formattedBookName: string = formatBookName(bookName);

    const pImg: ProcessFile = new ProcessFile({
      fileBuffer: coverImage,
      fileType: "cover",
      subDir: formattedBookName,
    });
    const pPdf: ProcessFile = new ProcessFile({
      fileBuffer: pdfFile,
      fileType: "file",
      customExt: "pdf",
      subDir: formattedBookName,
    });

    const coverPath: string = await pImg.resizeAndSave({ width: 432, height: 574 });
    const bookPath: string = await pPdf.saveFile();

    return { coverPath, bookPath };
  }

  public async create(files: UploadBookDto, b: CreateBookDto) {
    const bookRecord = await this.bookRepository.findOne({ name: b.name });

    if (bookRecord) {
      throw new ConflictException("Book already exists!");
    }

    const { coverPath, bookPath } = await this.processUploadedFiles(files, b.name);

    const newBookRecord = await this.bookRepository.create({
      ...b,
      publishedDate: Date.now(),
      srcCoverPath: coverPath,
      srcPath: bookPath,
      reviews: [],
      categories: [],
      totalReviews: 0,
    });
    Logger.log(`Create new book: ${newBookRecord._id}`, BookService.name);

    const { __v, ...newBookRecordWithoutVersion } = newBookRecord.toObject();

    return newBookRecordWithoutVersion;
  }

  public async findAll() {
    const bookRecords = await this.bookRepository.find();

    if (!bookRecords || bookRecords.length < 1) {
      throw new NotFoundException("No book records found!");
    }
    Logger.log(`Retrieved all books`, BookService.name);

    return bookRecords;
  }

  public async findOne(id: string) {
    const bookRecord = await this.bookRepository.findById(id);

    if (!bookRecord) {
      throw new NotFoundException("No book record found!");
    }
    Logger.log(`Retrieved book: ${bookRecord._id}`, BookService.name);

    return bookRecord;
  }

  public async update(id: string, updateBookDto: UpdateBookDto) {
    const bookRecord = await this.bookRepository.findById(id);

    if (!bookRecord) {
      throw new NotFoundException("No book record found!");
    }

    const updatedBookRecord = await this.bookRepository.findByIdAndUpdate(
      id,
      updateBookDto
    );

    Logger.log(`Update book: ${bookRecord._id}\n\n${updateBookDto}`, BookService.name);

    return updatedBookRecord;
  }

  public async remove(id: string) {
    const bookRecord = await this.bookRepository.findById(id);

    if (!bookRecord) {
      throw new NotFoundException("No book record found!");
    }

    const deletedBookRecord = await this.bookRepository.deleteOne({ _id: id });

    Logger.log(`Delete book: ${bookRecord._id}`, BookService.name);

    return deletedBookRecord;
  }
}
