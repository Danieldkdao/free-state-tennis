import mongoose, { Document, Schema, Model } from "mongoose";

type Comment = {
  user: string;
  comment: string;
  createdAt: Date;
};

export interface IBlog extends Document {
  title: string;
  lengthOfRead: number | string;
  content: string;
  image: string;
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

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    lengthOfRead: { type: Number || String },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: true }
);

const blogModel: Model<IBlog> = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default blogModel;
