import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

import { ConfigService } from "./config/config.service";

export function createdocument(app: INestApplication): OpenAPIObject {
  const { swagger } = app.get(ConfigService).apiOptions;

  const options = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token"
    )
    .setVersion(swagger.version)
    .build();

  return SwaggerModule.createDocument(app, options);
}
