import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  password: string;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const adminModel: Model<IAdmin> = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default adminModel;