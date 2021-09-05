import { Prop } from "@nestjs/mongoose";
import { ObjectID } from "mongodb";

export abstract class BaseEntitySchema {
  @Prop()
  readonly _id: ObjectID;
}
