import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate, IsOptional, IsPositive, IsString } from "class-validator";
import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ description: "Book file source path", required: false })
  @IsString({ message: "Path must be of type string!" })
  @IsOptional()
  srcPath?: string;

  @ApiProperty({ description: "Book cover image source path", required: false })
  @IsString({ message: "Path must be of type string!" })
  @IsOptional()
  srcCoverPath?: string;

  @ApiProperty({ description: "Book file source path", required: false })
  @IsDate({ message: "Published Date must be a valid Date type!" })
  @IsOptional()
  publishedDate?: Date;

  @ApiProperty({ description: "A list of book review ID references", required: false })
  @IsString({ each: true, message: "Review Must be of type string!" })
  @IsOptional()
  reviews?: string[];

  @ApiProperty({ description: "Total number of book reviews", required: false })
  @IsPositive({ message: "Total reviews must be a positive number!" })
  @IsOptional()
  totalReviews?: number;
}
