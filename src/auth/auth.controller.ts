import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@ApiTags("auth")
@Controller({ version: "1", path: "auth" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthDto })
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiUnauthorizedResponse({ description: "Unauthorized action." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Post("signin")
  public async loginWithEmailAndPassword(@Body() authDto: AuthDto) {
    return this.authService.loginWithEmailAndPassword(authDto);
  }

  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: "The record has been successfully created." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiConflictResponse({ description: "The record has an internal conflict." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Post("signup")
  public async signUpWithEmailAndPassword(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpWithEmailAndPassword(createUserDto);
  }
}
