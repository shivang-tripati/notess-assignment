import { Router } from "express";
import prisma from "../prisma.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../utils/mailer.ts";

const router = Router();

router.post("/request-otp", async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  await prisma.otpRequest.create({
    data: {
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  // 🔹 Send email
  await sendOtpEmail(email, otp);

  return res.status(200).json( { message: "OTP sent to email" });
});


// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp, remember } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const otpRecord = await prisma.otpRequest.findFirst({
    where: { email },
    orderBy: { expiresAt: "desc" },
  });

  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    return res.status(400).json({ error: "OTP expired" });
  }

  const validOtp = await bcrypt.compare(otp, otpRecord.otp);
  if (!validOtp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }

  const token = jwt.sign({ userId: user.id }, process.env["JWT_SECRET"]!, {expiresIn : remember ? "7d" : "1h"  });
  res.cookie("token", token, {
  httpOnly: true,
  secure: process.env['NODE_ENV'] === "production",
  sameSite: "strict",
  maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
});

  return res.status(200).json({ message: "Login successful", token });
});

export default router;
