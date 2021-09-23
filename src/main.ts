import * as helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { SwaggerModule, SwaggerCustomOptions } from "@nestjs/swagger";

import { ConfigService } from "./config/config.service";
import { Environment } from "./config/config.interface";
import { AppModule } from "./app.module";
import { createdocument } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Env config
  const { prefix, env, port, hostname, cors, swagger } =
    app.get(ConfigService).apiOptions;

  // API versioning
  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());

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
    customfavIcon: "",
  };

  SwaggerModule.setup("/", app, createdocument(app), options);

  await app.listen(port, () => {
    Logger.log(`Running at ${hostname}:${port}`, "NestApplication");
    Logger.log(`Running in ${env} mode`, "NestApplication");
  });
}
bootstrap();
