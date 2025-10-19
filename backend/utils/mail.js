import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Reset Your Password",
    html: `
  <div style="font-family: Arial, sans-serif; font-size: 16px;">
    <p>Hello,</p>
    <p>You requested a password reset. Use the OTP below to reset your password:</p>
    <h2 style="color: #ff4d2d;">${otp}</h2>
    <p>This OTP will expire in <strong>5 minutes</strong>.</p>
    <p>If you did not request this, please ignore this email.</p>
    <br />
    <p>Thanks,<br />Your App Team</p>
  </div>
`,
  });
};
