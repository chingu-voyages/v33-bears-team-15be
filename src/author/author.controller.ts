import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { UseRoles } from "@/auth/decorators/role.decorator";
import { JwtAuthGuard, RolesGuard } from "@/auth/guards";
import { Role } from "@/auth/role.enum";
import { AuthorService } from "./author.service";
import { CreateAuthorDto, UpdateAuthorDto } from "./dto/index";

const CONTROLLER_NAME = "authors";

@ApiTags(CONTROLLER_NAME)
@Controller({ version: "1", path: CONTROLLER_NAME })
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // API Docs
  @ApiBody({ type: CreateAuthorDto })
  @ApiCreatedResponse({ description: "The record has been successfully created." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiConflictResponse({ description: "The record has an internal conflict." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  // Interceptors
  @UseRoles(Role.PUBLISHER, Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor("avatar"))
  // Method
  @Post()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAuthorDto: CreateAuthorDto
  ) {
    return this.authorService.create(file, createAuthorDto);
  }

  // API Docs
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  // Method
  @Get()
  index() {
    return this.authorService.findAll();
  }

  // API Docs
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", description: "Author unique id" })
  // Method
  @Get(":id")
  find(@Param("id") id: string) {
    return this.authorService.findOne(id);
  }

  // API Docs
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", description: "Author unique id" })
  // Interceptors
  @UseRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // Method
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  // API Docs
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", description: "Author unique id" })
  // Interceptors
  @UseRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // Method
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authorService.remove(id);
  }
}
