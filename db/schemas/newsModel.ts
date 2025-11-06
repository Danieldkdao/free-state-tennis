import mongoose, { Document, Schema, Model } from "mongoose";
import { Image, ImageSchema } from "./adminEventModel";

type Comment = {
  user: string;
  comment: string;
  createdAt: Date;
};

export interface INews extends Document {
  _id: string;
  title: string;
  content: string;
  image: Image | null;
  views: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<Comment>(
  {
    user: { type: String, default: "Anonymous User" },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    views: { type: [String], default: [] },
    image: { type: ImageSchema || null },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: true }
);

const newsModel: Model<INews> = mongoose.models.New || mongoose.model("New", NewsSchema);

export default newsModel;
