"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseSchemaConfig_1 = __importDefault(require("../utils/mongooseSchemaConfig"));
const otpSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    expirationTime: {
        type: Date,
        required: true,
    },
}, mongooseSchemaConfig_1.default);
const OtpModel = mongoose_1.default.model("Otp", otpSchema);
exports.default = OtpModel;
