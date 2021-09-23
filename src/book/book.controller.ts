import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
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

import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@ApiTags("books")
@Controller({ version: "1", path: "books" })
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({ description: "The record has been successfully created." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiConflictResponse({ description: "The record has an internal conflict." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Get()
  index() {
    return this.bookService.findAll();
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", type: "String", description: "Book id" })
  @Get(":id")
  find(@Param("id") id: string) {
    return this.bookService.findOne(+id);
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", type: "String", description: "Book id" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", type: "String", description: "Book id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookService.remove(+id);
  }
}
