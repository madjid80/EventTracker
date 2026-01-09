import type { EventTypes } from "@api/models/events/eventTypes.schema.js";
import { logger } from "@utilities/index.js";
import { UserEventModel } from "@db/models/event.model.js";
import type { PipelineStage } from "mongoose";

const createMatchStage = (
  userId?: string,
  eventType?: string
): PipelineStage.Match => {
  const match: PipelineStage.Match = { $match: {} };
  if (userId) {
    match["$match"]["userId"] = userId;
  }
  if (eventType) {
    match["$match"]["eventType"] = eventType;
  }
  return match;
};

const createGroupStage = (): PipelineStage.Group => {
  return {
    $group: {
      _id: { userId: "$userId", eventType: "$eventType" },
      count: { $sum: 1 },
    },
  };
};

const createProjectStage = (): PipelineStage.Project => {
  return {
    $project: {
      _id: 0,
      userId: "$_id.userId",
      eventType: "$_id.eventType",
      count: 1,
    },
  };
};

export const queryUserEvent = async ({
  userId,
  eventType,
}: {
  userId?: string;
  eventType?: string;
}): Promise<{ count: number; userId: string; eventType: EventTypes }[]> => {
  try {
    const match: PipelineStage.Match = createMatchStage(userId, eventType);
    const group: PipelineStage.Group = createGroupStage();
    const project: PipelineStage.Project = createProjectStage();
    const pipeline: PipelineStage[] = [match, group, project];
    logger.info(
      `Query user events with following pipeline stage: ${JSON.stringify(
        pipeline
      )}`
    );
    const events = await UserEventModel.aggregate(pipeline);
    return events;
  } catch (error: any) {
    throw error;
  }
};
