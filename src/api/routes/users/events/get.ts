import { queryEventsHandler } from "@api/controllers/index.js";
import type { FastifyInstance, FastifyPluginOptions } from "fastify";

const UsersEventsQueryEventsRoute = (
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  next: (err?: Error | undefined) => void
) => {
  instance.get("/events", queryEventsHandler);
  next();
};

export default UsersEventsQueryEventsRoute;
