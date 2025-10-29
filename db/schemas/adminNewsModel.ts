import mongoose, { Document, Schema, Model } from "mongoose";

type Comment = {
  user: string;
  comment: string;
  createdAt: Date;
};

export interface IAdminNews extends Document {
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

const AdminNewsSchema = new Schema<IAdminNews>(
  {
    title: { type: String },
    content: { type: String },
    views: { type: Number, default: 0 },
    image: { type: String },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: true }
);

const adminNewsModel: Model<IAdminNews> = mongoose.models.AdminNew || mongoose.model("AdminNew", AdminNewsSchema);

export default adminNewsModel;
