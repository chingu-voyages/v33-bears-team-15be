import * as helmet from "helmet";
import * as express from "express";
import { join } from "path";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { SwaggerModule, SwaggerCustomOptions } from "@nestjs/swagger";

import { ConfigService } from "./config/config.service";
import { Environment } from "./config/config.interface";
import { AppModule } from "./app.module";
import { createdocument } from "./swagger";

const LOG_LABEL = "BOOTSTRAP";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  // Env config
  const { prefix, env, port, hostname, cors, swagger } =
    app.get(ConfigService).apiOptions;

  // API versioning
  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());
  app.use("/static", express.static(join(process.cwd(), "bucket")));

  app.enableCors(cors);
  if (env === Environment.Production) {
    app.use(helmet());
    // @TODO: Enable csurf back when it's
    // been configured and properly used
    // app.use(csurf());
  }

  // Swagger
  const options: SwaggerCustomOptions = {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: swagger.title,
    customfavIcon: join(process.cwd(), "assets", "favicon.png"),
  };

  SwaggerModule.setup("/", app, createdocument(app), options);

  await app.listen(port, () => {
    Logger.log(`Running at ${hostname}:${port}`, LOG_LABEL);
    Logger.log(`Running in ${env} mode`, LOG_LABEL);
  });
}
bootstrap();
