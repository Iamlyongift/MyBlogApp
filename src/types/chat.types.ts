import { Document, Types } from 'mongoose';
import { IUser } from './user.types';

export interface IChat extends Document {
  sender: Types.ObjectId | IUser;
  receiver: Types.ObjectId | IUser;
  message?: string;
  media?: string;
  createdAt: Date;
  updatedAt: Date;
}