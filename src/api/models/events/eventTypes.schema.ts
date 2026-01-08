import z from "zod";

const EventTypesSchema = z
  .enum(["LOGIN", "PURCHASE", "REFERRAL"])
  .refine((value) => ["LOGIN", "PURCHASE", "REFERRAL"].includes(value), {
    message: "Invalid event type, must be LOGIN, PURCHASE, or REFERRAL",
  });

type EventTypes = z.infer<typeof EventTypesSchema>;

export type { EventTypes };
export { EventTypesSchema };
