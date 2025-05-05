import nodemailer from "nodemailer";

// Configure Mailtrap SMTP transport
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
