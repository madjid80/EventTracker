import { type FastifyInstance } from "fastify";
import { startServer } from "./serverBootStrap.js";
import { logger } from "@utilities/index.js";
import { connect } from "db/bootstrap.js";
import { loadEventPoints } from "@config/index.js";

let server: FastifyInstance | undefined = undefined;

const main = async () => {
  await loadEventPoints();
  await connect();
  await startServer();
};

main().catch((reason) => {
  logger.error(`Server failed to start: ${reason}`);
});
