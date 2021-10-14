import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Email address",
    default: "test@email.com",
  })
  @IsEmail({}, { message: "Email address must be a valid email!" })
  @IsDefined({ message: "Email address must not be empty!" })
  email!: string;

  @ApiProperty({ description: "User password", default: "password123" })
  @IsDefined({ message: "Password must not be empty!" })
  @MinLength(6, { message: "Passowrd must have at least 6 characters!" })
  @MaxLength(32, { message: "Password must be at most 32 characters!" })
  password!: string;

  @ApiProperty({ description: "User full name", default: "Api Fullname" })
  @IsDefined({ message: "Name must not be empty!" })
  @MinLength(4, { message: "Name must be at least 4 characters!" })
  @MaxLength(26, { message: "Name must be at most 26 characters!" })
  fullName!: string;

  @ApiProperty({ description: "User name" })
  @IsDefined({ message: "Username must not be empty!" })
  @MinLength(3, { message: "Usernames must have at least 3 characters!" })
  @MaxLength(12, { message: "Usernames must be at most 12 characters!" })
  username!: string;
}
