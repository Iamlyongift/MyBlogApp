import bcrypt from "bcryptjs";
import crypto from "crypto";
import OtpModel from "../models/otp.model";

const generateOtp = async (email: string, userId: string): Promise<string> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash the OTP using bcrypt
  const hashedOtp = await bcrypt.hash(otp, 10);

  // Remove any existing OTP for the email
  await OtpModel.deleteMany({ email });

  // Save the new OTP with expiration time
  await OtpModel.create({
    userId,
    email,
    otp: hashedOtp,
    expirationTime: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  });

  return otp; // Return plain OTP for sending via email
};

const verifyOtp = async ({
  otp,
  email,
}: {
  otp: string;
  email: string;
}): Promise<boolean> => {
  const otpRecord = await OtpModel.findOne({ email });
  if (!otpRecord) throw new Error("OTP not found for this email");

  const isOtpExpired = otpRecord.expirationTime < new Date();
  if (isOtpExpired) {
    await OtpModel.deleteOne({ email });
    throw new Error("OTP has expired");
  }

  const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
  if (!isOtpValid) throw new Error("Invalid OTP");

  await OtpModel.deleteOne({ email });

  return true;
};

export default {
  generateOtp,
  verifyOtp,
};
