import mongoose, { Document, Schema, Model } from "mongoose";
import { Image, ImageSchema } from "./adminEventModel";

type Team =
  | "Boys Varsity"
  | "Boys Junior Varsity"
  | "Girls Varsity"
  | "Girls Junior Varsity";

export interface IEvent extends Document {
  _id: string;
  datetime: Date;
  team: Team;
  away: boolean;
  opponent: string;
  image: Image | null;
  location: string;
}

const EventSchema = new Schema<IEvent>({
  datetime: { type: Date, required: true },
  team: { type: String, required: true },
  away: { type: Boolean, required: true },
  opponent: { type: String, required: true },
  image: { type: ImageSchema || null },
  location: { type: String, required: true },
});

const eventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model("Event", EventSchema);

export default eventModel;
