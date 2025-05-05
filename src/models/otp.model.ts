import mongoose from "mongoose";
import mongooseSchemaConfig from "../utils/mongooseSchemaConfig";
import { OtpType } from "../types/otp.service";

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expirationTime: {
      type: Date,
      required: true,
    },
  },
  mongooseSchemaConfig
);

const OtpModel = mongoose.model<OtpType>("Otp", otpSchema);
export default OtpModel;
