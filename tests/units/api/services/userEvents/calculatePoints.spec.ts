import { assert, beforeEach, describe, expect, it, vi } from "vitest";
import {
  EventTypesSchema,
  type EventTypes,
} from "@api/models/events/eventTypes.schema.js";
import { calculatePoints } from "@api/services/index.js";

describe("calculatePoints module", () => {
  
  beforeEach(() => {
    vi.resetModules();
    vi.mock("@config/index.js", () => {
    return {
      environmentConfig: {
        EVENTS_POINTS: {
          events: [
            {
              name: EventTypesSchema.enum.LOGIN as EventTypes,
              description: "User logged in",
              point: 1,
            },
            {
              name: EventTypesSchema.enum.PURCHASE as EventTypes,
              description: "User made a purchase",
              point: 10,
            },
          ],
        },
      },
    };
  });
  });
  it("calculates points correctly", async () => {
    const events: { count: number; userId: string; eventType: string }[] = [
      { count: 2, userId: "user1", eventType: EventTypesSchema.enum.LOGIN },
      { count: 1, userId: "user1", eventType: EventTypesSchema.enum.PURCHASE },
    ];
    const points: { userId: string; points: number }[] = await calculatePoints(
      events as any
    );
    expect(points).toEqual([{ userId: "user1", points: 12 }]);
  });
  it("returns zero points for unknown event types", async () => {
    const events: { count: number; userId: string; eventType: string }[] = [
      { count: 3, userId: "user2", eventType: "UNKNOWN_EVENT" },
    ];
    const points: { userId: string; points: number }[] = await calculatePoints(
      events as any
    );
    expect(points).toEqual([{ userId: "user2", points: 0 }]);
  });
  it("handles empty event list", async () => {
    const events: { count: number; userId: string; eventType: string }[] = [];
    const points: { userId: string; points: number }[] = await calculatePoints(
      events as any
    );
    expect(points).toEqual([]);
  });
  it("handles multiple users correctly", async () => {
    const events: { count: number; userId: string; eventType: string }[] = [
      { count: 1, userId: "user1", eventType: EventTypesSchema.enum.LOGIN },
      { count: 2, userId: "user2", eventType: EventTypesSchema.enum.PURCHASE },
      { count: 1, userId: "user1", eventType: EventTypesSchema.enum.PURCHASE },
    ];
    const points: { userId: string; points: number }[] = await calculatePoints(
      events as any
    );
    expect(points).toEqual([
      { userId: "user1", points: 11 },
      { userId: "user2", points: 20 },
    ]);
  });
  it("handles negative and zero counts gracefully", async () => {
    const events: { count: number; userId: string; eventType: string }[] = [
      { count: 0, userId: "user1", eventType: EventTypesSchema.enum.LOGIN },
      { count: -1, userId: "user2", eventType: EventTypesSchema.enum.PURCHASE },
    ];
    const points: { userId: string; points: number }[] = await calculatePoints(
      events as any
    );
    expect(points).toEqual([
      { userId: "user1", points: 0 },
      { userId: "user2", points: 0 },
    ]);
  });
});
