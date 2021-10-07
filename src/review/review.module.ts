import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ReviewRepository } from "./models/review.repository";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { ReviewEntity, ReviewEntitySchema } from "./models/review.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ReviewEntity.name, schema: ReviewEntitySchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
