import { PartialType } from "@nestjs/swagger";
import { IsDate, IsOptional, MaxLength, MinLength } from "class-validator";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @MinLength(4, { message: "Username must be at least 4 characters!" })
  @MaxLength(14, { message: "Username must be at least 12 characters!" })
  username?: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  @IsDate({ message: "Birthday must be a valid date!" })
  birthday?: Date;

  @IsOptional()
  @MinLength(20, { message: "Biography must be at least 20 characters!" })
  biography?: string;

  @IsOptional()
  newList?: Record<string, unknown>;

  @IsOptional()
  newWish?: string;
}
