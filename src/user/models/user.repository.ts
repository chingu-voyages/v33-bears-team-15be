import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { EntityRepository } from "@db/entity.repository";
import { UserDocument, UserEntity } from "./user.entity";

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(UserEntity.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
