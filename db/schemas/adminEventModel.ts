import mongoose, { Document, Schema, Model } from "mongoose";

type Team =
  | "Boys Varsity"
  | "Boys Junior Varsity"
  | "Girls Varsity"
  | "Girls Junior Varsity";

export interface IAdminEvent extends Document {
  _id: string;
  datetime: string;
  team: Team;
  away: boolean;
  opponent: string;
  image: string | null;
  location: string;
}

const AdminEventSchema = new Schema<IAdminEvent>({
  datetime: { type: String },
  team: { type: String },
  away: { type: Boolean },
  opponent: { type: String },
  image: { type: String || null },
  location: { type: String },
});

const adminEventModel: Model<IAdminEvent> =
  mongoose.models.AdminEvent || mongoose.model("AdminEvent", AdminEventSchema);

export default adminEventModel;
