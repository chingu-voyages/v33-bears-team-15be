import {
  IsDefined,
  IsISBN,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

const BOOK_NAME = "The Effective Executive";
const BOOK_DESCRIPTION =
  'The measure of the executive, Drucker reminds us, is the ability to "get the right things done." This usually involves doing what other people have overlooked as well as avoiding what is unproductive. Intelligence, imagination, and knowledge may all be wasted in an executive job without the acquired habits of mind that mold them into results.';

export class CreateBookDto {
  @ApiProperty({ description: "Book name", default: BOOK_NAME })
  @IsString({ message: "Name must be of type string!" })
  @MinLength(5, { message: "Name must have at least 5 characters!" })
  @MaxLength(256, { message: "Name must be at most 256 characters!" })
  @IsDefined({ message: "Name must not be empty!" })
  name!: string;

  @ApiProperty({ description: "Book description", default: BOOK_DESCRIPTION })
  @IsString({ message: "Description must be of type string!" })
  @MinLength(54, { message: "Description must have at least 54 characters!" })
  @MaxLength(4096, { message: "Description must be at most 4096 characters!" })
  @IsDefined({ message: "Description must not be empty!" })
  description!: string;

  @ApiProperty({ description: "The author of the book", default: "" })
  @IsString({ message: "Author must be of type string!" })
  @IsDefined({ message: "Author must not be empty!" })
  author!: string;

  @ApiProperty({ description: "The publisher of the book", default: "" })
  @IsString({ message: "Author must be of type string!" })
  @IsDefined({ message: "Author must not be empty!" })
  publisher!: string;

  @ApiProperty({ description: "Book ISBN number", default: 9780062574350 })
  @IsISBN(13, { message: "ISBN version must be '13'" })
  @IsDefined({ message: "ISBN must not be empty!" })
  isbn!: number;

  @ApiProperty({
    description: "A list of book category ID references",
    default: [""],
  })
  @IsString({ each: true, message: "Category must be of type string!" })
  @IsDefined({ message: "Categories must not be empty!" })
  categories!: string[];

  @ApiProperty({ description: "Date of the book release", default: 1519211809934 })
  @IsNumberString({}, { message: "Release Date must be a positive number!" })
  @IsDefined({ message: "Release Date must not be empty!" })
  releaseDate!: number;
}
