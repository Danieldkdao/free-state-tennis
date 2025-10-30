import mongoose, { Document, Schema, Model } from "mongoose";
import { Image, ImageSchema } from "./adminEventModel";

export type classes = "Freshman" | "Sophomore" | "Junior" | "Senior";

export type playingStyles =
  | "Unknown"
  | "Aggressive Baseliner"
  | "Counter-Puncher"
  | "Serve and Volley"
  | "All-Court Player";

export type yearsOnVarsity = 0 | 1 | 2 | 3 | 4;

export type isVarsity = "TBD" | "Varsity" | "Junior Varsity";

export type teams = "Boy" | "Girl";

export interface IAdminPlayer extends Document {
  _id: string;
  image: Image | null;
  name: string;
  bio: string;
  class: classes;
  wins: number | null;
  losses: number | null;
  heightFt: number | null;
  heightIn: number | null;
  playingStyle: playingStyles;
  yearsOnVarsity: yearsOnVarsity;
  isVarsity: isVarsity;
  seasonsPlayed: string[];
  team: teams;
}

const AdminPlayerSchema = new Schema<IAdminPlayer>({
  image: { type: ImageSchema || null },
  name: { type: String },
  bio: { type: String },
  class: { type: String, required: true },
  wins: { type: Number || null },
  losses: { type: Number || null },
  heightFt: { type: Number || null },
  heightIn: { type: Number || null },
  playingStyle: { type: String, required: true },
  yearsOnVarsity: { type: Number, required: true },
  isVarsity: { type: String, required: true },
  seasonsPlayed: { type: [String] },
  team: { type: String, required: true },
});

const adminPlayerModel: Model<IAdminPlayer> = mongoose.models.AdminPlayer || mongoose.model("AdminPlayer", AdminPlayerSchema);

export default adminPlayerModel;
