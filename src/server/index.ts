import { type FastifyInstance } from "fastify";
import { startServer } from "./serverBootStrap.js";
import { logger } from "@utilities/index.js";
import { connect } from "db/bootstrap.js";

let server: FastifyInstance | undefined = undefined;

const main = async () => {
  const db = await connect();
  server = await startServer();
};

main().catch((reason) => {
  logger.error(`Server failed to start: ${reason}`);
});
