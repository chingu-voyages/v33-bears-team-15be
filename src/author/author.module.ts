import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthorService } from "./author.service";
import { AuthorController } from "./author.controller";
import { AuthorEntity, AuthorEntitySchema } from "./models/author.entity";
import { AuthorRepository } from "./models/author.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthorEntity.name, schema: AuthorEntitySchema }]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
})
export class AuthorModule {}
