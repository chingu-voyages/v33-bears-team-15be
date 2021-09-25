import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ description: "Category name", default: "Literary Fiction" })
  @IsString({ message: "Name must be of type string!" })
  @MinLength(3, { message: "Name must have at least 3 characters!" })
  @MaxLength(256, { message: "Name must be at most 256 characters!" })
  @IsDefined({ message: "Name must not be empty!" })
  name!: string;

  @ApiProperty({
    description: "Category description",
    default: "Layered novels with literary merit.",
  })
  @IsString({ message: "Description must be of type string!" })
  @MinLength(20, { message: "Description must have at least 54 characters!" })
  @MaxLength(2048, { message: "Description must be at most 4096 characters!" })
  @IsDefined({ message: "Description must not be empty!" })
  description!: string;

  @ApiProperty({
    description: "Parent category which belongs to",
    default: null,
  })
  @IsOptional()
  parent!: string | null;
}
