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
const email_config_1 = __importDefault(require("../config/email.config"));
const email_template_1 = require("../utils/EmailTemplate/email.template");
const send = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: '"MyblogApp" <MyBlogApp@yahoo.com>',
            to: email,
            subject: "Email Verification OTP",
            html: (0, email_template_1.generateOtpEmailTemplate)(otp),
        };
        const info = yield email_config_1.default.sendMail(mailOptions);
        return {
            success: true,
            messageId: info.messageId,
        };
    }
    catch (error) {
        console.error("Error sending OTP email:", error);
        return {
            success: false,
            error: "Failed to send verification email",
        };
    }
});
exports.default = { send };
