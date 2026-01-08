import type { EventTypes } from "@api/models/events/eventTypes.schema.js";
import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "UserEvents" } })
export class UserEvent {
  @prop({ required: true, index: true })
  userId!: string;

  @prop({ required: true, index: true })
  eventType!: EventTypes;

  @prop({ required: true, unique: true })
  public timestamp!: number;
}

export const UserEventModel = getModelForClass(UserEvent);
