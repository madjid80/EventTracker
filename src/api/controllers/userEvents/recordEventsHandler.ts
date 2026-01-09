import type { UserEventRequest } from "@api/models/index.js";
import { environmentConfig } from "@config/index.js";
import { logger } from "@utilities/index.js";
import { UserEventModel } from "db/models/event.model.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export const recordEventsHandler = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  try {
    logger.info("Recording user events");
    const payload: UserEventRequest = request.body as UserEventRequest;
    const { _id: id } = await UserEventModel.create(payload);
    logger.info(JSON.stringify(environmentConfig.EVENTS_POINTS));
    response.send({ message: "User events recorded Successfully", id });
  } catch (error: any) {
    logger.error(
      `Error recording user events: ${error?.message ?? String(error)}`
    );
    // Handle duplicate key errors from Mongo/Typegoose and return meaningful message
    if (
      error?.code === 11000 ||
      error?.name === "MongoServerError" ||
      (typeof error?.message === "string" &&
        /duplicate key/i.test(error.message))
    ) {
      const details = error?.keyValue
        ? `Duplicate fields: ${JSON.stringify(error.keyValue)}`
        : error?.message;
      response.status(409).send({ message: "Duplicate user event", details });
      return;
    }

    response.status(500).send({ message: "Failed to record user events" });
  }
};
