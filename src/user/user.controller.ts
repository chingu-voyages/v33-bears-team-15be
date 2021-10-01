import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from "@nestjs/common";
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

import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateReadingListDto } from "./dto/readingList-create.dto";
import { JwtAuthGuard, RolesGuard } from "@/auth/guards";
import { UseRoles } from "@/auth/decorators/role.decorator";
import { Role } from "@/auth/role.enum";

@ApiTags("users")
@Controller({ version: "1", path: "users" })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateReadingListDto })
  @ApiCreatedResponse({ description: "The record has been successfully created." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiConflictResponse({ description: "The record has an internal conflict." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Post(":id/list")
  createList(
    @Param("id") id: string,
    @Body() createReadingListDto: CreateReadingListDto
  ) {
    return this.userService.createList(id, createReadingListDto);
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @UseRoles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  index() {
    return this.userService.index();
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", type: "String", description: "User id" })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":id")
  find(@Param("id") id: string) {
    return this.userService.show(id);
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", type: "String", description: "User id" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @ApiParam({ name: "id", type: "String", description: "User id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
