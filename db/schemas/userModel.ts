import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: "user" | "admin";
  banned: boolean;
  formCompleted: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  emailVerified: { type: Boolean, required: true },
  image: { type: String },
  role: { type: String, required: true, enum: ["user", "admin"] },
  banned: { type: Boolean, required: true },
  formCompleted: { type: Boolean, required: true },
}, {timestamps: true});

const userModel: Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema, "user");

export default userModel;
