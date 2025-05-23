// // types/News.ts
// export interface INews {
//   title: string;
//   content: string;
//   category: string;
//   author: string; // user ID
//   likes: string[];
//   comments: { user: string; text: string; createdAt: Date }[];
//   createdAt?: Date;
// }
     

import { Document, Types } from 'mongoose';
import { IUser } from './user.types';
import { IComment } from "../types/comment.types";

export interface INews extends Document {
  title?: string;
  content?: string;
  category?: string;
  author: Types.ObjectId | IUser;
  likes: Array<Types.ObjectId | IUser>;
  comments: Array<IComment>;
  createdAt: Date;
  updatedAt: Date;
}