import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

import { EntityRepository } from "@db/entity.repository";
import { ReviewDocument, ReviewEntity } from "./review.entity";

@Injectable()
export class ReviewRepository extends EntityRepository<ReviewDocument> {
  constructor(@InjectModel(ReviewEntity.name) reviewModel: Model<ReviewDocument>) {
    super(reviewModel);
  }
}
