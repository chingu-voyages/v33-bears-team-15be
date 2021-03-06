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
      NAME: str({ default: "dekoo" }),
      PROTOCOL: str({ choices: ["http", "https"], default: "http" }),
      PORT: port({ default: 3000 }),
      HOSTNAME: str(),
      PREFIX: str(),
      //
      JWT_SECRET_KEY: str(),
      TOKEN_DURATION: str({ default: "7d" }),
      SUPERADMIN_PASSWORD: str({ devDefault: "superpassword" }),
      AUTH_PEPPER: str(),
      GOOGLE_CLIENT_ID: str(),
      GOOGLE_CLIENT_SECRET: str(),
      //
      SWAGGER_TITLE: str({ default: "Dekoo API Documentation" }),
      SWAGGER_DESCRIPTION: str({
        default:
          "Welcome to Dekoo API Docs. Below you will find a current list of the available methods on our user, book, review and category API. If you need help or support, please contact the development team.",
      }),
      SWAGGER_VERSION: str({ default: "1.0" }),
      //
      DB_URI: str(),
      TEST_DB_URI: str(),
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
        pepper: envConfig.AUTH_PEPPER,
        googleClientId: envConfig.GOOGLE_CLIENT_ID,
        googleClientSecret: envConfig.GOOGLE_CLIENT_SECRET,
      },
      dbOptions: {
        connectionUri: envConfig.DB_URI,
        testConnectionUri: envConfig.TEST_DB_URI,
      },
    };
  }
}
