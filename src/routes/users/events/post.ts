import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { UserEventRequestSchema } from "models/events/request.schema.js";

const UsersEventsRecordEventsRoute = (
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  next: (err?: Error | undefined) => void
) => {
  instance.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/events",
    schema: { body: UserEventRequestSchema },
    handler: (_req, res) => res.send("User event recorded"),
  });
  next();
};

export default UsersEventsRecordEventsRoute;
