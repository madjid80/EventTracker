import { type FastifyInstance } from "fastify";
import { startServer } from "./serverBootStrap.js";
import { logger } from "@utilities/index.js";

let server: FastifyInstance | undefined = undefined;

const main = async () => {
  server = await startServer();
};

main().catch((reason) => {
  logger.error(`Server failed to start: ${reason}`);
});
