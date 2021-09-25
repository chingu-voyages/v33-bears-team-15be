import { Document, SchemaTypes } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { BaseEntitySchema } from "@/db/base.schema";

export type CategoryDocument = CategoryEntity & Document;

@Schema({ collection: "categories" })
export class CategoryEntity extends BaseEntitySchema {
  @Prop({ required: true, unique: true, trim: true, minlength: 3, maxlength: 256 })
  name!: string;

  @Prop({ required: true, trim: true, minlength: 20, maxlength: 2048 })
  description!: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: "categories", default: null })
  parent!: CategoryEntity | null;
}

export const CategoryEntitySchema = SchemaFactory.createForClass(CategoryEntity);
