import type { UserEventRequest } from "@api/models/index.js";
import { logger } from "@utilities/index.js";
import { UserEventModel } from "@db/models/event.model.js";

export const saveUserEvent = async (
  payload: UserEventRequest
): Promise<{ id: string | undefined }> => {
  try {
    const { _id: id } = await UserEventModel.create(payload);
    logger.info("User event saved successfully");
    return { id: id.toString() };
  } catch (error: any) {
    if (
      error?.code === 11000 ||
      error?.name === "MongoServerError" ||
      (typeof error?.message === "string" &&
        /duplicate key/i.test(error.message))
    ) {
      return { id: undefined };
    }
    throw error;
  }
};
