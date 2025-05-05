export const generateOtpEmailTemplate = (otp: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4; border-radius: 5px;">
      <h2 style="color: #333;">Email Verification</h2>
      <p>Thank you for registering with our service. Please use the following OTP to verify your email address:</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
        <h3 style="font-size: 24px; margin: 0; color: #333;">${otp}</h3>
      </div>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this verification, please ignore this email.</p>
    </div>
  `;
};

export const emailVerification = (otp: string): string => `
  <!DOCTYPE html>
  <html lang="en">
  <body>
    <p>Dear User,</p>
    <p>Your verification code is <strong>${otp}</strong>.</p>
    <p>Do not share this code with anyone.</p>
    <p>Thanks,<br />The RIKRUTA Team</p>
  </body>
  </html>
`;

export const passwordResetEmail = (resetUrl: string): string => `
  <!DOCTYPE html>
  <html lang="en">
  <body>
    <p>Dear User,</p>
    <p>You requested to reset your password. Please click the link below to reset it:</p>
    <p><a href="${resetUrl}" target="_blank" style="color: blue; text-decoration: underline;">Reset Your Password</a></p>
    <p>If the link doesn't work, copy and paste this URL into your browser:</p>
    <p>${resetUrl}</p>
    <p>This link is valid for 10 minutes. If you did not request this, please ignore the email.</p>
    <p>Thanks,<br />The RIKRUTA Team</p>
  </body>
  </html>
`;
