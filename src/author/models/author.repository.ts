import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

import { EntityRepository } from "@/db/entity.repository";
import { AuthorDocument, AuthorEntity } from "./author.entity";

@Injectable()
export class AuthorRepository extends EntityRepository<AuthorDocument> {
  constructor(@InjectModel(AuthorEntity.name) authorModel: Model<AuthorDocument>) {
    super(authorModel);
  }
}
