// src/services/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import { RegisterSchema, LoginSchema } from "../validations/user.validation";
import { Login, Register } from "../dto/auth.dto";
import otpService from "../services/otp.service";
import emailService from "../services/email.service";
// import { emailVerification } from "../utils/EmailTemplate/email.template";

const jwtsecret = process.env.JWT_SECRET as string;
// src/services/auth.service.ts
export const registerUserService = async (userData: Register) => {
  try {
    const {
      username,
      email,
      password,
      confirm_password,
      phone_number,
      country,
      role,
    } = userData;

    // Validate user input
    const { error, value } = RegisterSchema.validate(userData, {
      abortEarly: false,
    });

    if (error) {
      return {
        status: 400,
        error: error.details.map((err: any) => err.message),
      };
    }

    // Ensure passwords match
    if (password !== confirm_password) {
      return {
        status: 400,
        error: "Passwords do not match",
      };
    }

    const existingUser = await UserModel.findOne({ email });

    // Check if user already exists
    if (existingUser) {
      return {
        status: 400,
        error: "User already exists",
      };
    }

    // Hashing password
    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(12));

    // Create a new user
    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHash,
      phone_number,
      country,
      role,
      isVerified: false, // Initialize as unverified
    });

    try {
      // Generate OTP and send verification email
      const otp = await otpService.generateOtp(email, newUser._id.toString());

      // Send email with OTP
      await emailService.send(email, otp);

      return {
        status: 201,
        message:
          "Registration successful. Please check your email for verification code.",
        user: {
          username: newUser.username,
          email: newUser.email,
          _id: newUser._id,
        },
      };
    } catch (emailError) {
      console.error("Error sending verification email:", emailError);
      return {
        status: 201,
        message:
          "Registration successful but failed to send verification email. Please contact support.",
        user: {
          username: newUser.username,
          email: newUser.email,
          _id: newUser._id,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};

export const loginUserService = async (credentials: Login) => {
  try {
    const { email, password } = credentials;

    // Validate user input
    const { error } = LoginSchema.validate(credentials, {
      abortEarly: false,
    });

    if (error) {
      return {
        status: 400,
        error: error.details[0].message,
      };
    }

    // Verify if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return {
        status: 400,
        error: "User not found",
      };
    }

    // Check if user is verified
    if (!user.isVerified) {
      return {
        status: 403,
        error:
          "Email not verified. Please verify your email before logging in.",
      };
    }

    // Compare password
    const validUser = await bcrypt.compare(password, user.password);

    if (!validUser) {
      return {
        status: 400,
        error: "Invalid password",
      };
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, jwtsecret, { expiresIn: "30d" });

    return {
      status: 200,
      message: "Login Successful",
      user,
      token,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};

// Verify OTP
export const verifyOtp = async (email: string, otp: string) => {
  try {
    console.log({ email, otp });

    const isOtpValid = await otpService.verifyOtp({ email, otp });
    if (!isOtpValid) {
      return {
        status: 400,
        error: "Invalid or expired OTP",
      };
    }

    // Update the user's verification status
    const updateResult = await UserModel.updateOne(
      { email },
      { isVerified: true }
    );
    if (updateResult.modifiedCount === 0) {
      return {
        status: 400,
        error: "User verification failed",
      };
    }

    return {
      status: 200,
      message: "OTP verified successfully, your account is now verified.",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};

// Request OTP
export const requestOtp = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        status: 404,
        error: "User not found",
      };
    }

    // Temporarily disable verification check
    // if (user.isVerified) {
    //   return {
    //     status: 400,
    //     error: "User already verified"
    //   };
    // }

    // Generate OTP and send it via email
    const otp = await otpService.generateOtp(email, user._id.toString());
    console.log({ otp });

    // Update the call to match your email service function signature
    const emailResult = await emailService.send(email, otp);

    if (!emailResult.success) {
      return {
        status: 500,
        error: "Failed to send email",
      };
    }

    return {
      status: 200,
      message: "OTP sent successfully",
    };
  } catch (error) {
    console.error("Error requesting OTP:", error);
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};


export const forgotPassword = async (email: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = user.createResetPasswordToken(); // Corrected method name
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.RESET_PASSWORD_URL}?token=${resetToken}`;

  await emailService.send(email, resetToken);


  return { message: "Password reset email sent" };
};


