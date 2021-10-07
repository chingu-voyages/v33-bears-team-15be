import { BaseEntitySchema } from "@/db/base.schema";
import { Document, SchemaTypes } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role, RoleType } from "@/auth/role.enum";

export type ReviewDocument = ReviewEntity & Document;

@Schema({ collection: "reviews" })
export class ReviewEntity extends BaseEntitySchema {
  @Prop({ required: true, trim: true, minlength: 100, maxlength: 4000 })
  comment!: string;

  @Prop({ required: true, trim: true })
  rating!: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  user!: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, default: 0 })
  helpful!: string[];

  @Prop({ required: true })
  countHelpFul!: number;

  @Prop({ required: true, enum: Object.values(Role), default: Role.READER })
  type!: RoleType;
}

export const ReviewEntitySchema = SchemaFactory.createForClass(ReviewEntity);
