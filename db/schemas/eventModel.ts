import mongoose, { Document, Schema, Model } from "mongoose";

type Team =
  | "Boys Varsity"
  | "Boys Junior Varsity"
  | "Girls Varsity"
  | "Girls Junior Varsity";

export interface IEvent extends Document {
  date: string;
  time: string;
  team: Team;
  away: boolean;
  opponent: string;
  image: string;
  location: string;
}

const EventSchema = new Schema<IEvent>({
  date: { type: String, required: true },
  time: { type: String, required: true },
  team: { type: String, required: true },
  away: { type: Boolean, required: true },
  opponent: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
});

const eventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model("Event", EventSchema);

export default eventModel;
