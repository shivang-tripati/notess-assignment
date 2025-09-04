import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

// Step 1: Redirect user to Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Callback after Google auth
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env['FRONTEND_URL']}/signin` }),
  (req: any, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env["JWT_SECRET"]!, {
      expiresIn: "1h",
    });

    // For demo: return token in JSON (frontend can store it), later we can store it in cookies
  res.cookie("token", token, {
  httpOnly: true, // not accessible via JS
  secure: process.env['NODE_ENV'] === "production", // HTTPS in prod
  sameSite: "lax", // prevents CSRF
  maxAge: 60 * 60 * 1000, // 1 hour
});

res.redirect(process.env['FRONTEND_URL']!); // Redirect to frontend after login
  }
);

export default router;
