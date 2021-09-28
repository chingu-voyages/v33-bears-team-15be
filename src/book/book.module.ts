import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { BookRepository } from "./models/book.repository";
import { BookEntity, BookEntitySchema } from "./models/book.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookEntity.name, schema: BookEntitySchema }]),
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
