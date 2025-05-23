import { Types } from 'mongoose';
import { IUser } from './user.types';

export interface IComment {
  user: Types.ObjectId | IUser;
  text: string;
  createdAt: Date;
}