import type { EventPoint } from "@api/models/events/eventPoint.schema.js";

export interface Config {
  API_SERVER_PORT?: number;
  API_SERVER_HOST?: string;
  NODE_ENV?: "development" | "production" | "test" | "local";
  MONGO_URL?: string;
  EVENTS_POINTS?: EventPoint;
}
