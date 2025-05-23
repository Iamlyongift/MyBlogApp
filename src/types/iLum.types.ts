import { Document, Types } from 'mongoose';
import { IUser } from './user.types';

// Comment interface
export interface IComment {
  user: Types.ObjectId | IUser;
  text: string;
  createdAt: Date;
}

// Export the ILum interface as both default and named export
export interface ILum extends Document {
  caption?: string;
  mediaUrl?: string;
  user: Types.ObjectId | IUser;
  likes: Array<Types.ObjectId | IUser>;
  comments: Array<IComment>;
  createdAt: Date;
  updatedAt: Date;
}

// Add default export for backward compatibility
export default ILum;