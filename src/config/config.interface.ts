import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

/**
 * @description
 * The ApiOptions define how the Setism REST APIs are exposed, as well as allowing the API layer
 * to be extended with middleware.
 */
export interface ApiOptions {
  /**
   * @description
   * Set the environment of the server. If not set, the environment will be `development`.
   *
   * @default 'development'
   */
  env?: `${Environment}`;
  /**
   * @description
   * Set the hostname of the server. If not set, the server will be available on localhost.
   *
   * @default ''
   */
  hostname?: string;
  /**
   * @description
   * Which port the Vendure server should listen on.
   *
   * @default 3000
   */
  port: number;
  /**
   * @description
   * Set the CORS handling for the server. See the [express CORS docs](https://github.com/expressjs/cors#configuration-options).
   *
   * @default {
   *   origin: "*",
   *   maxAge: 0,
   *   optionsSuccessStatus: 200,
   *   exposedHeaders: ["Authorization"]
   * }
   */
  cors?: CorsOptions;
  /**
   * @description
   * API base prefix, used for both swagger server path, and overall API path
   */
  prefix?: string;
  /**
   * @description
   * Swagger API Documentation page options
   */
  swagger?: Required<SwaggerOptions>;
}

/**
 * @description
 * The AuthOptions define how authentication and authorization is managed.
 */
export interface AuthOptions {
  /**
   * @description
   * Sets the length of time that a verification token is valid for, after which the verification token must be refreshed.
   *
   * Expressed as a string describing a time span per
   * [zeit/ms](https://github.com/zeit/ms.js).  Eg: `60`, `'2 days'`, `'10h'`, `'7d'`
   *
   * @default '7d'
   */
  verificationTokenDuration?: string | number;
  /**
   * @description
   * Configures the credentials to be used to create a superadmin
   */
  superadminCredentials?: SuperadminCredentials;
  /**
   * @description
   * Sets the secret key for decoding and validating a JWT access token
   */
  jwtSecretKey?: string;
  /**
   * @description
   * Extra security layer for hashing passwords
   */
  pepper?: string;
  /**
   * @description
   * Client `ID` for google web application
   */
  googleClientId?: string;
  /**
   * @description
   * Client `Secret` for google web application
   */
  googleClientSecret?: string;
}

export interface SuperadminCredentials {
  /**
   * @description
   * The password to be used to create a superadmin account
   * @default 'superadmin'
   */
  password: string;
}

export interface SwaggerOptions {
  /**
   * @description
   * Documentation page title
   */
  title?: string;
  /**
   * @description
   * Documentation page API description
   */
  description?: string;
  /**
   * @description
   * Documentation API current version
   */
  version?: string;
}

export interface ConnectionOptions {
  /**
   * @description
   * Database connection string
   */
  connectionUri?: string;
  /**
   * @description
   * Database connection string for testing env
   */
  testConnectionUri?: string;
}

/**
 * @description
 * All possible configuration options are defined by the
 * [`SetismConfig`]() interface.
 * */
export interface RuntimeSetismConfig {
  /**
   * @description
   * Configuration for the REST APIs, including hostname, port, CORS settings,
   * middleware etc.
   */
  apiOptions: Required<ApiOptions>;
  /**
   * @description
   * Configuration for authorization.
   */
  authOptions: Required<AuthOptions>;
  /**
   * @description
   * The connection options used to connect to the database.
   */
  dbOptions: Required<ConnectionOptions>;
}
