import * as winston from "winston";
import { environmentConfig } from "@config/index.js";

const logger: winston.Logger = winston.createLogger({
  level: environmentConfig.LOG_LEVEL || "info",
  format: winston.format.json(),
  transports: [
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export { logger };
