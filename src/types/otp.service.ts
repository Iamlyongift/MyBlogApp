import { Document, Types } from "mongoose";

export interface OtpType extends Document {
  otp: string;
  email: string;
  userId: Types.ObjectId;
  expirationTime: Date;
}
