import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { EntityRepository } from "@/db/entity.repository";
import { CategoryDocument, CategoryEntity } from "./category.entity";

@Injectable()
export class CategoryRepository extends EntityRepository<CategoryDocument> {
  constructor(@InjectModel(CategoryEntity.name) categoryModel: Model<CategoryDocument>) {
    super(categoryModel);
  }
}
