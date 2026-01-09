import type { UserEventRequest } from "@api/models/index.js";
import { saveUserEvent } from "@api/services/index.js";
import { logger } from "@utilities/index.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export const recordEventsHandler = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  try {
    logger.info("Recording user events");
    const { id } = await saveUserEvent(request.body as UserEventRequest);
    if (!id) {
      response.status(409).send({ message: "User event already exists" });
    }
    response
      .status(201)
      .send({ message: "User events recorded Successfully", id });
  } catch (error: any) {
    logger.error(
      `Error recording user events: ${error?.message ?? String(error)}`
    );
    response.status(500).send({ message: "Failed to record user events" });
  }
};
