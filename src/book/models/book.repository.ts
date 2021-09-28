import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { EntityRepository } from "@/db/entity.repository";
import { BookDocument, BookEntity } from "./book.entity";

@Injectable()
export class BookRepository extends EntityRepository<BookDocument> {
  constructor(@InjectModel(BookEntity.name) bookModel: Model<BookDocument>) {
    super(bookModel);
  }
}
