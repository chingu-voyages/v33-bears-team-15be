import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ConfigService } from "../config/config.service";
import { DatabaseService } from "./db.service";
import { Environment } from "src/config/config.interface";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri:
          config.apiOptions.env === Environment.Test
            ? config.dbOptions.testConnectionUri
            : config.dbOptions.connectionUri,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
