import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

import { BaseEntitySchema } from "@db/base.schema";
import { IUser, UserRole, UserRoleType } from "../interfaces/user.interface";
import { IReadingList } from "../interfaces/readingList.interface";
import { CreateReadingListDto } from "../dto/readingList-create.dto";

export type UserDocument = UserEntity & Document;

@Schema({ collection: "users" })
export class UserEntity extends BaseEntitySchema implements IUser {
  @Prop({ required: true, unique: true, trim: true })
  public email!: string;

  @Prop({
    type: String,
    unique: true,
    trim: true,
    default: null,
    minlength: 3,
    maxlength: 12,
    lowercase: true,
  })
  public username!: string | null;

  @Prop({ required: true, trim: true })
  public password!: string;

  @Prop({ required: true, trim: true })
  public fullName!: string;

  @Prop({ default: "", trim: true })
  public avatar!: string;

  @Prop({ type: String, default: null })
  public birthday!: Date | null;

  @Prop({ default: "", trim: true })
  public biography!: string;

  @Prop({
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.READER,
  })
  public role!: UserRoleType;

  @Prop({ type: String, default: null })
  public internalComment!: string | null;

  @Prop({ require: true })
  public firstLogin!: Date;

  @Prop({ required: true })
  public lastLogin!: Date;

  @Prop([CreateReadingListDto])
  public readingList!: IReadingList[];

  // TODO: update `wishList` type to the Book Entity
  // once it has been created => `wishList!: Book[]`
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: "book" }] })
  public wishList!: string[];
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);
