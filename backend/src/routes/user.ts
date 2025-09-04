import { Router, Request, Response } from "express";
import prisma from "../prisma.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const router = Router();

router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, createdAt: true },
  });
  return res.json(user);
});

export default router;
