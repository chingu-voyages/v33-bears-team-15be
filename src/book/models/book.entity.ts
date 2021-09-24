import { Document, SchemaTypes } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { BaseEntitySchema } from "@/db/base.schema";

export type BookDocument = BookEntity & Document;

@Schema({ collection: "books" })
export class BookEntity extends BaseEntitySchema {
  @Prop({ required: true, trim: true, minlength: 5, maxlength: 256 })
  name!: string;

  @Prop({ required: true, trim: true, minlength: 54, maxlength: 4096 })
  description!: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "authors" })
  author!: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "users" })
  publisher!: string;

  @Prop({ required: true })
  srcPath!: string;

  @Prop({ required: true })
  srcCoverPath!: string;

  @Prop({ required: true, min: 13, max: 13 })
  isbn!: number;

  @Prop({ required: true })
  releaseDate!: Date;

  @Prop({ required: true })
  publishedDate!: Date;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "categories" })
  categories!: string[];

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "reviews" })
  reviews!: string[];

  @Prop({ required: true, default: 0, min: 0 })
  totalReviews!: number;
}

export const BookEntitySchema = SchemaFactory.createForClass(BookEntity);
