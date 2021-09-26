import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

import { AuthorService } from "./author.service";
import { CreateAuthorDto, UpdateAuthorDto } from "./dto/index";

const CONTROLLER_NAME = "authors";

@Controller(CONTROLLER_NAME)
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authorService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authorService.remove(id);
  }
}
