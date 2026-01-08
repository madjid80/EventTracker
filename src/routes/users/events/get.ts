import type { FastifyInstance, FastifyPluginOptions } from "fastify";

const UsersEventsQueryEventsRoute = (
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  next: (err?: Error | undefined) => void
) => {
  instance.get("/events", (_req, res) => res.send("User events queried"));
  next();
};

export default UsersEventsQueryEventsRoute;
