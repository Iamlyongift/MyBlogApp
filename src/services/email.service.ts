// src/services/email.service.ts
import transport from "../config/email.config";
import { generateOtpEmailTemplate } from "../utils/EmailTemplate/email.template";

const send = async (email: string, otp: string) => {
  try {
    const mailOptions = {
      from: '"MyblogApp" <MyBlogApp@yahoo.com>',
      to: email,
      subject: "Email Verification OTP",
      html: generateOtpEmailTemplate(otp),
    };

    const info = await transport.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return {
      success: false,
      error: "Failed to send verification email",
    };
  }
};

export default { send };
