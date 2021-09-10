import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

import { BaseEntitySchema } from "@/db/base.schema";
import {
  IReadingList,
  ReadingListKind,
  ReadingListType,
} from "../interfaces/readingList.interface";

export class ReadingListEntity extends BaseEntitySchema implements IReadingList {
  @Prop({ required: true, type: "String" })
  name!: string;

  @Prop({ required: false, type: "String" })
  description!: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: "book" }] })
  books!: string[];

  @Prop({
    required: true,
    enum: Object.values(ReadingListKind),
    default: ReadingListKind.PUBLIC,
  })
  kind!: ReadingListType;
}

export const ReadingListEntitySchema = SchemaFactory.createForClass(ReadingListEntity);
