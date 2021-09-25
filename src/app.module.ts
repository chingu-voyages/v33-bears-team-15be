import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./db/db.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { BookModule } from "./book/book.module";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    BookModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
