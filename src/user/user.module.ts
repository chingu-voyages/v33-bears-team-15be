import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserEntitySchema, UserEntity } from "./models/user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
