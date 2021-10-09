import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ReviewRepository } from "./models/review.repository";
import { BookRepository } from "@/book/models/book.repository";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { ReviewEntity, ReviewEntitySchema } from "./models/review.entity";
import { BookEntity, BookEntitySchema } from "@/book/models/book.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ReviewEntity.name, schema: ReviewEntitySchema }]),
    MongooseModule.forFeature([{ name: BookEntity.name, schema: BookEntitySchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository, BookRepository],
})
export class ReviewModule {}
