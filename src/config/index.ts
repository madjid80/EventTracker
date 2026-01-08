import { load } from "dotenv-extended";
import dotenvParseVariables from "dotenv-parse-variables";
import type { Config } from "./config.interface.js";
import { promises as fsp } from "fs";
import { parse as yamlParse } from "yaml";
import { EventPointSchema, type EventPoint } from "@api/models/events/eventPoint.schema.js";
import { logger } from "@utilities/index.js";

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

const readEventPoints = async (filePath: string): Promise<EventPoint> => {
  try{
  const fileContent = await fsp.readFile(filePath, { encoding: "utf8" });
  const ymlContent = yamlParse(fileContent);
  const parsedContent = EventPointSchema.parse(ymlContent);
  return parsedContent;
  } catch (error) {
    throw new Error(`Failed to read or parse event points file, please fix it in ${filePath}: ${error}`);
  }
};

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
  EVENTS_POINTS: await readEventPoints(parsedEnv.EVENTS_POINTS_PATH as string),
};
