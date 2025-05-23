// models/News.ts
import mongoose, { Schema, Document } from 'mongoose';
import { INews } from '../types/news.types';

const NewsSchema = new Schema<INews>({
  title: String,
  content: String,
  category: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model<INews & Document>('News', NewsSchema);
