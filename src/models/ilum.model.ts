import mongoose, { Schema } from 'mongoose';
import { ILum } from '../types/iLum.types'; // Fixed import path

// Define the comment schema inline since we're having import issues
const CommentSchema = {
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
};

const LumSchema = new Schema<ILum>({
  caption: String,
  mediaUrl: String,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [CommentSchema]
}, { timestamps: true });

export default mongoose.model<ILum>('Lum', LumSchema);