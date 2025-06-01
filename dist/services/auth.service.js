"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.requestOtp = exports.verifyOtp = exports.loginUserService = exports.registerUserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_validation_1 = require("../validations/user.validation");
const otp_service_1 = __importDefault(require("../services/otp.service"));
const email_service_1 = __importDefault(require("../services/email.service"));
const jwtsecret = process.env.JWT_SECRET;
const registerUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirm_password, phone_number, country, role, } = userData;
        const { error, value } = user_validation_1.RegisterSchema.validate(userData, {
            abortEarly: false,
        });
        if (error) {
            return {
                status: 400,
                error: error.details.map((err) => err.message),
            };
        }
        if (password !== confirm_password) {
            return {
                status: 400,
                error: "Passwords do not match",
            };
        }
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return {
                status: 400,
                error: "User already exists",
            };
        }
        const passwordHash = yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt(12));
        const newUser = yield user_model_1.default.create({
            username,
            email,
            password: passwordHash,
            phone_number,
            country,
            role,
            isVerified: false,
        });
        try {
            const otp = yield otp_service_1.default.generateOtp(email, newUser._id.toString());
            yield email_service_1.default.send(email, otp);
            return {
                status: 201,
                message: "Registration successful. Please check your email for verification code.",
                user: {
                    username: newUser.username,
                    email: newUser.email,
                    _id: newUser._id,
                },
            };
        }
        catch (emailError) {
            console.error("Error sending verification email:", emailError);
            return {
                status: 201,
                message: "Registration successful but failed to send verification email. Please contact support.",
                user: {
                    username: newUser.username,
                    email: newUser.email,
                    _id: newUser._id,
                },
            };
        }
    }
    catch (error) {
        console.error(error);
        return {
            status: 500,
            error: "Internal server error",
        };
    }
});
exports.registerUserService = registerUserService;
const loginUserService = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = credentials;
        const { error } = user_validation_1.LoginSchema.validate(credentials, {
            abortEarly: false,
        });
        if (error) {
            return {
                status: 400,
                error: error.details[0].message,
            };
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return {
                status: 400,
                error: "User not found",
            };
        }
        if (!user.isVerified) {
            return {
                status: 403,
                error: "Email not verified. Please verify your email before logging in.",
            };
        }
        const validUser = yield bcryptjs_1.default.compare(password, user.password);
        if (!validUser) {
            return {
                status: 400,
                error: "Invalid password",
            };
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, jwtsecret, { expiresIn: "30d" });
        return {
            status: 200,
            message: "Login Successful",
            user,
            token,
        };
    }
    catch (error) {
        return {
            status: 500,
            error: "Internal server error",
        };
    }
});
exports.loginUserService = loginUserService;
const verifyOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ email, otp });
        const isOtpValid = yield otp_service_1.default.verifyOtp({ email, otp });
        if (!isOtpValid) {
            return {
                status: 400,
                error: "Invalid or expired OTP",
            };
        }
        const updateResult = yield user_model_1.default.updateOne({ email }, { isVerified: true });
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
    }
    catch (error) {
        console.error(error);
        return {
            status: 500,
            error: "Internal server error",
        };
    }
});
exports.verifyOtp = verifyOtp;
const requestOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return {
                status: 404,
                error: "User not found",
            };
        }
        const otp = yield otp_service_1.default.generateOtp(email, user._id.toString());
        console.log({ otp });
        const emailResult = yield email_service_1.default.send(email, otp);
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
    }
    catch (error) {
        console.error("Error requesting OTP:", error);
        return {
            status: 500,
            error: "Internal server error",
        };
    }
});
exports.requestOtp = requestOtp;
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const resetToken = user.createResetPasswordToken();
    yield user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.RESET_PASSWORD_URL}?token=${resetToken}`;
    yield email_service_1.default.send(email, resetToken);
    return { message: "Password reset email sent" };
});
exports.forgotPassword = forgotPassword;
