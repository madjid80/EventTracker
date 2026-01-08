import Fastify, { type FastifyInstance } from "fastify";
import { registerRoutes } from "@api/routes/index.js";
import { logger } from "@utilities/index.js";
import { environmentConfig } from "@config/index.js";
import { errorHandler } from "./errorHandler.js";
import { notFoundHandler } from "./notFoundHandler.js";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

export const startServer = async (): Promise<FastifyInstance> => {
  const HOST = environmentConfig.API_SERVER_HOST ?? "0.0.0.0";
  const PORT: number = environmentConfig.API_SERVER_PORT ?? 8000;

  const app: FastifyInstance = Fastify({});

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler(errorHandler);
  await Promise.all([app.register(registerRoutes)]);

  app.setNotFoundHandler(notFoundHandler);
  try {
    await app.listen({ port: PORT, host: HOST });
    logger.info(`⚡️ Server is running at http://${HOST}:${PORT}`);
  } catch (error) {
    logger.error(`Server failed to start: ${error}`);

    (globalThis as any).process?.exit?.(1);
  }
  return app;
};
