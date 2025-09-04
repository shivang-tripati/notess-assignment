import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASSWORD'],
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  try {
    await transporter.sendMail({
      from: `"Notes App Assignment" <${process.env['SMTP_USER']}>`,
      to,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `<h2>Your OTP is: <b>${otp}</b></h2><p>This OTP expires in 5 minutes.</p>`,
    });

    console.log(`✅ OTP sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}
