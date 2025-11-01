import mongoose, { Document, Schema, Model } from "mongoose";
import { Image, ImageSchema } from "./adminEventModel";
import {
  classes,
  Height,
  HeightSchema,
  levels,
  playingStyles,
  Results,
  ResultsSchema,
  teams,
} from "./adminPlayerSchema";

export interface IPlayer extends Document {
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

const PlayerSchema = new Schema<IPlayer>({
  image: { type: ImageSchema || null },
  name: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  class: { type: String, required: true },
  singles: { type: ResultsSchema, required: true },
  doubles: { type: ResultsSchema, required: true },
  height: { type: HeightSchema, required: true },
  playingStyle: { type: String, required: true },
  isVarsity: { type: String, required: true },
  team: { type: String, required: true },
});

const playerModel: Model<IPlayer> =
  mongoose.models.Player || mongoose.model("Player", PlayerSchema);

export default playerModel;
