import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";

export class AuthDto {
  @ApiProperty({
    type: "String",
    description: "Email address",
    default: "test@email.com",
  })
  @IsEmail({}, { message: "Email address must be a valid email!" })
  @IsDefined({ message: "Email address must not be empty!" })
  email!: string;

  @ApiProperty({ type: "String", description: "User password", default: "password123" })
  @IsDefined({ message: "Password must not be empty!" })
  @MinLength(6, { message: "Passowrd must have at least 6 characters!" })
  @MaxLength(32, { message: "Password must be at most 32 characters!" })
  password!: string;
}
