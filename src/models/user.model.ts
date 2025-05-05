import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/user.types";
import { RoleTypeField } from "../utils/enum";
import crypto from "crypto";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String },
    country: { type: String },
    role: { enum: RoleTypeField },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },

    // Add password reset fields
    passwordResetToken: { type: String },
    passwordResetTokenExpires: { type: Date },
  },
  { timestamps: true }
);

// Instance method to toggle account status
userSchema.methods.toggleAccountStatus = async function () {
  this.isActive = !this.isActive;
  await this.save();
};

// Static method to toggle by ID
userSchema.statics.toggleAccountStatusById = async function (userId: string) {
  const user = await this.findById(userId);
  if (user) {
    user.isActive = !user.isActive;
    await user.save();
  }
};

// Instance method to create reset token
userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

const UserModel = mongoose.model<UserType>("User", userSchema);
export default UserModel;
