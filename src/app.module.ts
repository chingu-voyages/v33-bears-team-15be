import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./db/db.module";

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
