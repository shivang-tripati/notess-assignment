import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.cookies && req.cookies["token"];
  // const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env['JWT_SECRET']!) as { userId: string };
    console.log("decoded", decoded);
    (req as any).user = decoded; // Use type assertion
    return next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
