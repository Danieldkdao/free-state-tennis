import mongoose, { Document, Schema, Model } from "mongoose";
import { Image, ImageSchema } from "./adminEventModel";

export type classes = "Freshman" | "Sophomore" | "Junior" | "Senior";

export type playingStyles =
  | "Unknown"
  | "Aggressive Baseliner"
  | "Counter-Puncher"
  | "Serve and Volley"
  | "All-Court Player";

export type levels = "TBD" | "Varsity" | "Junior Varsity";

export type teams = "Boy" | "Girl";

export type Results = {
  wins: number;
  losses: number;
};

export type Height = {
  ft: number | null;
  in: number | null;
};

export interface IAdminPlayer extends Document {
  _id: string;
  image: Image | null;
  name: string;
  bio: string;
  class: classes;
  singles: Results;
  doubles: Results;
  height: Height;
  playingStyle: playingStyles;
  isVarsity: levels;
  team: teams;
}

export const ResultsSchema = new Schema<Results>(
  {
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
  },
  { _id: false }
);

export const HeightSchema = new Schema<Height>(
  {
    ft: { type: Number || null },
    in: { type: Number || null },
  },
  { _id: false }
);

const AdminPlayerSchema = new Schema<IAdminPlayer>({
  image: { type: ImageSchema || null },
  name: { type: String, unique: true },
  bio: { type: String },
  class: { type: String, required: true },
  singles: { type: ResultsSchema, required: true },
  doubles: { type: ResultsSchema, required: true },
  height: { type: HeightSchema, required: true },
  playingStyle: { type: String, required: true },
  isVarsity: { type: String, required: true },
  team: { type: String, required: true },
});

const adminPlayerModel: Model<IAdminPlayer> =
  mongoose.models.AdminPlayer ||
  mongoose.model("AdminPlayer", AdminPlayerSchema);

export default adminPlayerModel;
