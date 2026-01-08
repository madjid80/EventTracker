import z from "zod";

const UserEventRequestSchema = z
  .object({
    user_id: z.string(),
    event_type: z.string(),
    timestamp: z.number(),
  })
  .transform(({ user_id, event_type, timestamp }) => ({
    userId: user_id,
    eventType: event_type,
    timestamp,
  }));

type UserEventRequest = z.infer<typeof UserEventRequestSchema>;

export type { UserEventRequest };
export { UserEventRequestSchema };
