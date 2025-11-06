import mongoose, { Document, Schema, Model } from "mongoose";

type Team =
  | "Boys Varsity"
  | "Boys Junior Varsity"
  | "Girls Varsity"
  | "Girls Junior Varsity";

export type Image = {
  url: string;
  publicId: string;
};

export interface IAdminEvent extends Document {
  _id: string;
  datetime: Date;
  team: Team;
  away: boolean;
  opponent: string;
  image: Image | null;
  location: string;
}

export const ImageSchema = new Schema<Image>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const AdminEventSchema = new Schema<IAdminEvent>({
  datetime: { type: Date },
  team: { type: String },
  away: { type: Boolean },
  opponent: { type: String },
  image: { type: ImageSchema || null },
  location: { type: String },
});

const adminEventModel: Model<IAdminEvent> =
  mongoose.models.AdminEvent || mongoose.model("AdminEvent", AdminEventSchema);

export default adminEventModel;
