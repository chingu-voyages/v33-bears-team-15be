import { BookEntity } from "@/book/models/book.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthorDto {
  @ApiProperty({ description: "Author name", default: "Paulette Jiles" })
  @IsString({ message: "Author must be of type string!" })
  @IsDefined({ message: "Author must not be empty!" })
  name!: string;

  @ApiProperty({ description: "Author biography", required: false })
  @IsOptional()
  @MinLength(12, { message: "Biography must be at least 12 characters!" })
  @MaxLength(2048, { message: "Biography must be at most 2048 characters!" })
  biography?: string;

  @ApiProperty({ description: "Author avatar", required: false })
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: "A list of all author's book IDs", default: [] })
  @IsDefined({ message: "Books must not be empty!" })
  books!: BookEntity[];
}
