import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

import "./config/passport.ts"
import authRoutes from "./routes/auth.ts";
import notesRoutes from "./routes/notes.ts";
import userRoutes from "./routes/user.ts";
import googleAuthRoutes from "./routes/googleAuth.ts";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: process.env['FRONTEND_URL']!,
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: process.env['JWT_SECRET']!,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/auth", googleAuthRoutes); // added Google OAuth routes
app.use("/notes", notesRoutes);
app.use("/users", userRoutes);

const PORT = process.env['PORT'] || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
