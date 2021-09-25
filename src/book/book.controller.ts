import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
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
import { BookService } from "./book.service";
import { CreateBookDto, UpdateBookDto, UploadBookDto } from "./dto/index";

@ApiTags("books")
@Controller({ version: "1", path: "books" })
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // API Docs
  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({ description: "The record has been successfully created." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiConflictResponse({ description: "The record has an internal conflict." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  // Interceptors
  @UseRoles(Role.PUBLISHER, Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "cover", maxCount: 1 },
      { name: "file", maxCount: 1 },
    ])
  )
  // Method
  @Post("create")
  create(@UploadedFiles() files: UploadBookDto, @Body() createBookDto: CreateBookDto) {
    return this.bookService.create(files, createBookDto);
  }

  // API Docs
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  // Method
  @Get()
  index() {
    return this.bookService.findAll();
  }

  // API Docs
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", type: "String", description: "Book id" })
  // Method
  @Get(":id")
  find(@Param("id") id: string) {
    return this.bookService.findOne(id);
  }

  // API Docs
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", type: "String", description: "Book id" })
  // Interceptors
  @UseRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // Method
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  // API Docs
  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", type: "String", description: "Book id" })
  // Interceptors
  @UseRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // Method
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookService.remove(id);
  }
}
