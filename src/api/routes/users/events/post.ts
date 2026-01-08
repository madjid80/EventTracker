import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { UserEventRequestSchema } from "@api/models/events/request.schema.js";
import { recordEventsHandler } from "@api/controllers/index.js";

const UsersEventsRecordEventsRoute = (
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  next: (err?: Error | undefined) => void
) => {
  instance.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/events",
    schema: { body: UserEventRequestSchema },
    handler: recordEventsHandler,
  });
  next();
};

export default UsersEventsRecordEventsRoute;
