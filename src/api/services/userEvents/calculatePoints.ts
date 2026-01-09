import type { EventTypes } from "@api/models/events/eventTypes.schema.js";
import { environmentConfig } from "@config/index.js";

const calculatePoints = (
  events: { count: number; userId: string; eventType: EventTypes }[]
) => {
  const userPoints: Record<string, number> = events.reduce(
    (
      points: Record<string, number>,
      event: { count: number; userId: string; eventType: EventTypes }
    ) => {
      if (!points[event.userId]) {
        points[event.userId] = 0;
      }
      //FIXME: the structure should be an object then we can have it with O(1) lookup
      const point =
        environmentConfig.EVENTS_POINTS.events.find(
          (e) => e.name === event.eventType
        )?.point ?? 0;
      points[event.userId] = (points[event.userId] ?? 0) + event.count * point;
      return points;
    },
    {} as Record<string, number>
  );
  return Object.keys(userPoints).map((userId: string) => ({
    userId,
    points: userPoints[userId],
  }));
};

export { calculatePoints };
