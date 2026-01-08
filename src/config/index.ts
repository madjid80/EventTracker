import { load } from "dotenv-extended";
import dotenvParseVariables from "dotenv-parse-variables";
import type { Config } from "./config.interface.js";

const nodeEnv = process.env.NODE_ENV ?? "local";
const path =
  process.env.ENV_FILE === undefined
    ? `./configs/.env.${nodeEnv.toLocaleLowerCase()}`
    : process.env.ENV_FILE;

const env = load({
  path,
  defaults: "./configs/.env.defaults",
  schema: "./configs/.env.schema",
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: false,
});

const parsedEnv = dotenvParseVariables(env);

export const environmentConfig: Config = {
  NODE_ENV: parsedEnv.NODE_ENV as
    | "development"
    | "production"
    | "test"
    | "local",
  API_SERVER_PORT: parsedEnv.API_SERVER_PORT as number,
  API_SERVER_HOST: parsedEnv.API_SERVER_HOST as string,
  LOG_LEVEL: parsedEnv.LOG_LEVEL as "error" | "warn" | "info" | "debug",
  MONGO_URL: parsedEnv.MONGO_URL as string,
};
