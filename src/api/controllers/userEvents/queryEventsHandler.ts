import type { EventTypes } from "@api/models/events/eventTypes.schema.js";
import type { UserEventRequest } from "@api/models/index.js";
import { calculatePoints, queryUserEvent, saveUserEvent } from "@api/services/index.js";
import { logger } from "@utilities/index.js";
import { UserEventModel } from "db/models/event.model.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export const queryEventsHandler = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  try {
    logger.info("Query user events");
    const events:{ count: number; userId: string; eventType: EventTypes }[] = await queryUserEvent();
    const points = calculatePoints(events);
    response
      .status(200)
      .send({ message: "User events queried Successfully", data: points });
  } catch (error: any) {
    logger.error(
      `Error querying user events: ${error?.message ?? String(error)}`
    );
    response.status(500).send({ message: "Failed to query user events" });
  }
};
