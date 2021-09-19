import * as helmet from "helmet";
import * as csurf from "csurf";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";

import { ConfigService } from "./config/config.service";
import { Environment } from "./config/config.interface";
import { AppModule } from "./app.module";
import { createdocument } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Env config
  const { env, port, hostname, cors } = app.get(ConfigService).apiOptions;

  // API versioning
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors(cors);
  if (env === Environment.Production) {
    app.use(helmet());
    app.use(csurf());
  }

  // Swagger
  SwaggerModule.setup("/", app, createdocument(app));

  await app.listen(port, () => {
    Logger.log(`Running at ${hostname}:${port}`, "NestApplication");
    Logger.log(`Running in ${env} mode`, "NestApplication");
  });
}
bootstrap();
