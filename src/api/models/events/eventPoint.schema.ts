import z from "zod";
import { EventTypesSchema } from "./eventTypes.schema.js";

const EventPointSchema = z.object({
  events: z.array(
    z.object({
      name: EventTypesSchema,
      description: z.string().max(500).optional(),
      point: z.number().positive().nonoptional(),
    })
  ),
});

type EventPoint = z.infer<typeof EventPointSchema>;

export type { EventPoint };
export { EventPointSchema };
