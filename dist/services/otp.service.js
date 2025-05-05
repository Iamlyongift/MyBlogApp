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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const generateOtp = (email, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = yield bcryptjs_1.default.hash(otp, 10);
    yield otp_model_1.default.deleteMany({ email });
    yield otp_model_1.default.create({
        userId,
        email,
        otp: hashedOtp,
        expirationTime: new Date(Date.now() + 10 * 60 * 1000),
    });
    return otp;
});
const verifyOtp = (_a) => __awaiter(void 0, [_a], void 0, function* ({ otp, email, }) {
    const otpRecord = yield otp_model_1.default.findOne({ email });
    if (!otpRecord)
        throw new Error("OTP not found for this email");
    const isOtpExpired = otpRecord.expirationTime < new Date();
    if (isOtpExpired) {
        yield otp_model_1.default.deleteOne({ email });
        throw new Error("OTP has expired");
    }
    const isOtpValid = yield bcryptjs_1.default.compare(otp, otpRecord.otp);
    if (!isOtpValid)
        throw new Error("Invalid OTP");
    yield otp_model_1.default.deleteOne({ email });
    return true;
});
exports.default = {
    generateOtp,
    verifyOtp,
};
