import { beforeEach, describe, expect, it } from "vitest";
import { buildFastifyApp } from "../../src/server/serverBootStrap.js";
import { vi } from "vitest";
import { loadEventPoints } from "@config/index.js";

vi.mock("mongoose", () => ({
  connect: vi.fn().mockResolvedValue(undefined),
  connection: {
    close: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock("@typegoose/typegoose", async (importOriginal) => {
  const actual = await importOriginal();
return {
    ...actual,
    getModelForClass: vi.fn().mockReturnValue({
        aggregate: vi.fn()
            .mockResolvedValueOnce([
                { count: 2, userId: "testUser", eventType: "LOGIN", points: 12 },
                { count: 1, userId: "testUser", eventType: "PURCHASE", points: 30 },
                { count: 3, userId: "testUser2", eventType: "PURCHASE", points: 45 },
            ])
            .mockResolvedValueOnce([
                { count: 2, userId: "testUser", eventType: "LOGIN", points: 12 },
            ])
            .mockResolvedValueOnce([])
            .mockRejectedValueOnce('This is some random error'),
    }),
};
});
describe("queryUserEvents integration test", () => {
  it("should query user events correctly ", async () => {
    await loadEventPoints();
    const app = await buildFastifyApp();
    const response = await app.inject({
      method: "GET",
      url: "/v1/users/events",
    });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body).toHaveProperty("data");
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data[1].points).toBe(30);
  });
  it("should query user events correctly with userId filter", async () => {
    await loadEventPoints();
    const app = await buildFastifyApp();
    const response = await app.inject({
      method: "GET",
      url: "/v1/users/events?user_id=testUser",
    });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body).toHaveProperty("data");
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBe(1);
    expect(body.data[0].points).toBe(2);
  });
  it("should return empty data when no events found", async () => {
    await loadEventPoints();
    const app = await buildFastifyApp();
    const response = await app.inject({
      method: "GET",
      url: "/v1/users/events?user_id=testUser33",
    });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body).toHaveProperty("data");
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBe(0);
  });
  it('should handle error if Mongo reject query', async()=>{
    await loadEventPoints();
    const app = await buildFastifyApp();
    const response = await app.inject({
      method: "GET",
      url: "/v1/users/events?user_id=testUser33",
    });
    expect(response.statusCode).toBe(500);
    const body = response.json();
    expect(body.message).toBe('Failed to query user events');
  })
});
