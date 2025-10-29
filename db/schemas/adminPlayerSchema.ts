import mongoose, { Document, Schema, Model } from "mongoose";

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
  image: string | null;
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
  image: { type: String },
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

const adminPlayerModel: Model<IAdminPlayer> = mongoose.models.Player || mongoose.model("Player", AdminPlayerSchema);

export default adminPlayerModel;
