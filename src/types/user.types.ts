import { Document, Types } from 'mongoose';

export type RoleType = 'Guest' | 'User' | 'NewsAdmin';

export interface IUser extends Document {
  _id: Types.ObjectId; // Explicitly type _id to avoid 'unknown' type errors
  email: string;
  password: string;
  username: string;
  profilePicture?: string;
  isVerified: boolean;
  role: RoleType;
  friends: Array<Types.ObjectId | IUser>;
  friendRequests: Array<Types.ObjectId | IUser>;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Method for creating reset password token
  createResetPasswordToken: () => string;
}