import mongoose, { Document, Schema, Model } from "mongoose";

export type classes = "Freshman" | "Sophomore" | "Junior" | "Senior";

export type playingStyles =
  | "Unknown"
  | "Aggressive Baseliner"
  | "Counter-Puncher"
  | "Serve and Volley"
  | "All-Court Player";

export type yearsOnVarsity = 1 | 2 | 3 | 4;

export type isVarsity = "TBD" | "Varsity" | "Junior Varsity";

export type teams = "Boy" | "Girl";

export interface IPlayer extends Document {
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

const PlayerSchema = new Schema<IPlayer>({
  image: { type: String || null },
  name: { type: String, required: true },
  bio: { type: String, required: true },
  class: { type: String, required: true },
  wins: { type: Number || null },
  losses: { type: Number || null },
  heightFt: { type: Number || null },
  heightIn: { type: Number || null },
  playingStyle: { type: String, required: true },
  yearsOnVarsity: { type: Number, required: true },
  isVarsity: { type: String, required: true },
  seasonsPlayed: { type: [String], required: true },
  team: { type: String, required: true },
});

const playerModel: Model<IPlayer> = mongoose.models?.Player || mongoose.model("Player", PlayerSchema);

export default playerModel;
