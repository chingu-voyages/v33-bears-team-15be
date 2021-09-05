import { cleanEnv, ValidatorSpec, str, port } from "envalid";

import {
  ApiOptions,
  AuthOptions,
  Environment,
  RuntimeSetismConfig,
  ConnectionOptions,
} from "./config.interface";

export class ConfigService {
  private readonly config: RuntimeSetismConfig;

  constructor() {
    this.config = this.setDefaultConfig();
  }

  get isDevelopment(): boolean {
    return this.config.apiOptions.env === Environment.Development;
  }

  get isProduction(): boolean {
    return this.config.apiOptions.env === Environment.Production;
  }

  get isTest(): boolean {
    return this.config.apiOptions.env === Environment.Test;
  }

  get apiOptions(): Required<ApiOptions> {
    return this.config.apiOptions;
  }

  get authOptions(): Required<AuthOptions> {
    return this.config.authOptions;
  }

  get dbOptions(): Required<ConnectionOptions> {
    return this.config.dbOptions;
  }

  private validate() {
    const rule = {
      NODE_ENV: str({
        choices: ["production", "test", "development"],
        default: "development",
      }) as ValidatorSpec<RuntimeSetismConfig["apiOptions"]["env"]>,
      //
      NAME: str({ default: "setism" }),
      PROTOCOL: str({ choices: ["http", "https"], default: "http" }),
      PORT: port({ default: 3000 }),
      HOSTNAME: str(),
      PREFIX: str(),
      //
      JWT_SECRET_KEY: str(),
      TOKEN_DURATION: str({ default: "7d" }),
      SUPERADMIN_PASSWORD: str({ devDefault: "superpassword" }),
      //
      SWAGGER_TITLE: str({ default: "Setism API Docs" }),
      SWAGGER_DESCRIPTION: str({ default: "API documentation for Setism" }),
      SWAGGER_VERSION: str({ default: "1.0" }),
      //
      DB_URI: str(),
    };

    return cleanEnv(process.env, rule);
  }

  private setDefaultConfig(): RuntimeSetismConfig {
    const envConfig = this.validate();

    return {
      apiOptions: {
        env: envConfig.NODE_ENV,
        hostname: envConfig.HOSTNAME,
        port: envConfig.PORT,
        prefix: envConfig.PREFIX,
        cors: {
          origin: "*",
          maxAge: 0,
          optionsSuccessStatus: 200,
          exposedHeaders: ["Authorization"],
        },
        swagger: {
          title: envConfig.SWAGGER_TITLE,
          description: envConfig.SWAGGER_DESCRIPTION,
          version: envConfig.SWAGGER_VERSION,
        },
      },
      authOptions: {
        verificationTokenDuration: envConfig.TOKEN_DURATION,
        superadminCredentials: { password: envConfig.SUPERADMIN_PASSWORD },
        jwtSecretKey: envConfig.JWT_SECRET_KEY,
      },
      dbOptions: {
        connectionUri: envConfig.DB_URI,
      },
    };
  }
}
