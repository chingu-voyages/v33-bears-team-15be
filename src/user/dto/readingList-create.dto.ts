import {
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ReadingListKind, ReadingListType } from "../reading-list.enum";

export class CreateReadingListDto {
  @IsString()
  @IsDefined()
  @MinLength(3, { message: "Name must have at least 3 characters" })
  @MaxLength(54, { message: "Name must have at most 54 characters" })
  name!: string;

  @IsString()
  @IsOptional()
  @MinLength(20, { message: "Name must have at least 20 characters" })
  @MaxLength(1024, { message: "Name must have at most 1024 characters" })
  description?: string;

  @IsString({ each: true })
  @IsDefined()
  books!: string[];

  @IsEnum(ReadingListKind)
  @IsDefined()
  kind!: ReadingListType;
}
