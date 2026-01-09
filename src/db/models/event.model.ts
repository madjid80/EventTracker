import type { EventTypes } from "@api/models/events/eventTypes.schema.js";
import { getModelForClass, index, ModelOptions, prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "UserEvents" } })
@index({ userId: 1, timestamp: 1 }, { unique: true })
export class UserEvent {
  @prop({ required: true, index: true })
  userId!: string;

  @prop({ required: true, index: true })
  eventType!: EventTypes;

  @prop({ required: true})
  public timestamp!: number;
}

export const UserEventModel = getModelForClass(UserEvent);
