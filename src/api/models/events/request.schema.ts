import z from "zod";
import { EventTypesSchema, type EventTypes } from "./eventTypes.schema.js";

const UserEventRequestSchema = z
  .object({
    user_id: z.string(),
    event_type: EventTypesSchema,
    timestamp: z.number().int().nonnegative(),
  })
  .transform(({ user_id, event_type, timestamp }) => ({
    userId: user_id,
    eventType: event_type,
    timestamp,
  }));

type UserEventRequest = z.infer<typeof UserEventRequestSchema>;

export type { UserEventRequest };
export { UserEventRequestSchema };
