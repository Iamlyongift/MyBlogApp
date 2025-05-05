// src/controllers/authController.ts
import { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
  verifyOtp,
  requestOtp,
  forgotPassword,
} from "../services/auth.service";

export const RegisterUser = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    confirm_password,
    phone_number,
    country,
    role,
  } = req.body;

  const result = await registerUserService({
    username,
    email,
    password,
    confirm_password,
    phone_number,
    country,
    role,
  });

  if (result.status === 201) {
    return res.status(result.status).json({
      msg: result.message,
      newUser: result.user,
    });
  } else {
    return res.status(result.status).json({
      Error: result.error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUserService({ email, password });

  if (result.status === 200) {
    return res.status(result.status).json({
      msg: result.message,
      user: result.user,
      token: result.token,
    });
  } else {
    return res.status(result.status).json({
      error: result.error,
    });
  }
};

// Forgot password
export const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await forgotPassword(email);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error during forgot password:", error);
    res.status(400).json({ message: error.message });
  }
};


// Add these new controller functions for OTP verification
export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        error: "Email and OTP are required",
      });
    }

    const result = await verifyOtp(email, otp);

    return res.status(result.status).json({
      status: result.status,
      message: result.message,
      error: result.error,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await requestOtp(email);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error sending OTP:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
