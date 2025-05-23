import mongoose, { Schema } from 'mongoose';
import { IUser, RoleType } from '../types/user.types';
import crypto from 'crypto';

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  profilePicture: String,
  isVerified: { type: Boolean, default: false },
  // Define role directly instead of using RoleTypeField to fix type issues
  role: { 
    type: String, 
    enum: ['Guest', 'User', 'NewsAdmin'] as RoleType[], 
    default: 'User' as RoleType 
  },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// Add the createResetPasswordToken method to the schema
UserSchema.methods.createResetPasswordToken = function() {
  // Generate a random token
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash the token and set it to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  // Set the token expiry time (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
  return resetToken;
};

export default mongoose.model<IUser>('User', UserSchema);