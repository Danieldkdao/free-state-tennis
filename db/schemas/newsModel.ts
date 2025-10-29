import mongoose, { Document, Schema, Model } from "mongoose";

type Comment = {
  user: string;
  comment: string;
  createdAt: Date;
};

export interface INews extends Document {
  _id: string;
  title: string;
  content: string;
  image: string | null;
  views: number;
  comments: Comment[];
  createdAt: Date;
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
    views: { type: Number, default: 0 },
    image: { type: String || null },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: true }
);

const newsModel: Model<INews> = mongoose.models.New || mongoose.model("New", NewsSchema);

export default newsModel;
