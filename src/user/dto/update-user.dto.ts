import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate, IsOptional, MaxLength, MinLength } from "class-validator";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: "String", description: "Username", required: false })
  @IsOptional()
  @MinLength(4, { message: "Username must be at least 4 characters!" })
  @MaxLength(14, { message: "Username must be at least 12 characters!" })
  username?: string;

  @ApiProperty({ type: "String", description: "User avatar", required: false })
  @IsOptional()
  avatar?: string;

  @ApiProperty({ type: "Date", description: "User birthday", required: false })
  @IsOptional()
  @IsDate({ message: "Birthday must be a valid date!" })
  birthday?: Date;

  @ApiProperty({ type: "String", description: "User biography", required: false })
  @IsOptional()
  @MinLength(20, { message: "Biography must be at least 20 characters!" })
  biography?: string;

  @ApiProperty({
    type: "Object",
    description: "New list object to be created",
    required: false,
  })
  @IsOptional()
  newList?: Record<string, unknown>;

  @ApiProperty({
    type: "String",
    description: "New book to be added to wishlist",
    required: false,
  })
  @IsOptional()
  newWish?: string;
}
