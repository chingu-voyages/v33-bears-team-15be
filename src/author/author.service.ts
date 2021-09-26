import { Injectable, Logger } from "@nestjs/common";

import { CreateAuthorDto, UpdateAuthorDto } from "./dto/index";

@Injectable()
export class AuthorService {
  create(createAuthorDto: CreateAuthorDto) {
    Logger.log(createAuthorDto, AuthorService.name);
    return "This action adds a new author";
  }

  findAll() {
    return `This action returns all author`;
  }

  findOne(id: string) {
    return `This action returns a #${id} author`;
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
    Logger.log(updateAuthorDto, AuthorService.name);
    return `This action updates a #${id} author`;
  }

  remove(id: string) {
    return `This action removes a #${id} author`;
  }
}
