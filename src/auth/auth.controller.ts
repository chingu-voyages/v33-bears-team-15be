import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
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
import { Request } from "express";
import { Profile } from "passport-google-oauth20";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { GoogleAuthGuard } from "./guards/google.guard";

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

  @ApiBody({ type: AuthDto })
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiUnauthorizedResponse({ description: "Unauthorized action." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @Post("signin-admin")
  public async adminLogin(@Body() authDto: AuthDto) {
    return this.authService.adminLogin(authDto);
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
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() _req: Request) {
    return;
  }

  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.loginWithGoogleProvider(req.user as Profile);
  }
}
