
import mongoose, { Schema } from 'mongoose';
import { IChat } from '../types/chat.types';

const ChatSchema = new Schema<IChat>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: String,
  media: String
}, { timestamps: true });

// Since IChat already extends Document, we don't need to add it again
export default mongoose.model<IChat>('Chat', ChatSchema);