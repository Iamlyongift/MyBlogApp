import express from "express";
import {
  RegisterUser,
  loginUser,
  sendOtp,
  verifyOtpController,
} from "../controllers/auth.controller";

const router = express.Router();

/* GET user pages. */
router.post("/register", RegisterUser);
router.post("/login", loginUser);
router.post("/request-otp", sendOtp);
router.post('/verify-otp', verifyOtpController);
export default router;
