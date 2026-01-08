import { logger } from "@utilities/index.js";
import { UserEventModel } from "db/models/event.model.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export const recordEventsHandler = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  try {
    logger.info("Recording user events");
    const { _id: id } = await UserEventModel.create({
      ...(request.body as object),
    });
    response.send({ message: "User events recorded Successfully", id });
  } catch (error) {
    logger.error(`Error recording user events: ${error}`);
    response.status(500).send({ message: "Failed to record user events" });
  }
};
