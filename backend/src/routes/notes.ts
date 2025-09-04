import { Router, Request, Response } from "express";
import prisma from "../prisma.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const router = Router();

// Get notes
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const notes = await prisma.note.findMany({ where: { userId } });
  return res.json(notes);
});

// Create note
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content required" });

  const userId = (req as any).user?.userId;
  const note = await prisma.note.create({
    data: { content, userId },
  });

  return res.json(note);
});

// Delete note
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Note ID is required" });
  }
  await prisma.note.delete({ where: { id } });
  return res.json({ message: "Note deleted" });
});

export default router;
