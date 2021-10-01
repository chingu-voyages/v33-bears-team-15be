import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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

  @Get("google")
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiConflictResponse({ description: "The record has an internal conflict." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @UseGuards(AuthGuard("google"))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get("google/redirect")
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiConflictResponse({ description: "The record has an internal conflict." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req: any) {
    return this.authService.googleLogin(req);
  }
}
