import { Document, SchemaTypes } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { BaseEntitySchema } from "@/db/base.schema";
import { BookEntity } from "@/book/models/book.entity";

export type AuthorDocument = AuthorEntity & Document;

@Schema({ collection: "authors" })
export class AuthorEntity extends BaseEntitySchema {
  @Prop({ required: true, unique: true, trim: true, minlength: 3, maxlength: 54 })
  public name!: string;

  @Prop({ required: false, default: "", trim: true, maxlength: 2048 })
  public biography?: string;

  @Prop({ required: true, type: [{ type: SchemaTypes.ObjectId, ref: "books" }] })
  public books!: BookEntity[];

  @Prop({ required: false, default: "", trim: true })
  public avatar?: string;
}

export const AuthorEntitySchema = SchemaFactory.createForClass(AuthorEntity);
