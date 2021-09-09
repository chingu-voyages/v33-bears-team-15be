import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: "Email address must be a valid email!" })
  @IsDefined({ message: "Email address must not be empty!" })
  email!: string;

  @ApiProperty()
  @IsDefined({ message: "Password must not be empty!" })
  @MinLength(6, { message: "Passowrd must have at least 6 characters!" })
  @MaxLength(32, { message: "Password must be at most 32 characters!" })
  password!: string;

  @ApiProperty()
  @IsDefined({ message: "Name must not be empty!" })
  @MinLength(4, { message: "Name must be at least 4 characters!" })
  @MaxLength(26, { message: "Name must be at most 26 characters!" })
  fullName!: string;
}
