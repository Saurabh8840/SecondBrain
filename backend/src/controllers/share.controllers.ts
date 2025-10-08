import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const shareAll = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user.id;
    const hash = uuidv4();

    const link = await prisma.link.create({
      data: { hash, userId },
    });

    const url = `https://yourapp.com/share/${hash}`;
    res.json({ message: "Share link created!", url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating share link" });
  }
     



};

export const shareOne = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;
    //@ts-ignore
    const userId = req.user.id;
    const hash = uuidv4();

    const link = await prisma.link.create({
      data: { hash, userId, contentId: Number(contentId) },
    });

    const url = `https://yourapp.com/share/${hash}`;
    res.json({ message: "Share link created!", url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating share link" });
  }


};

export const openShareLink = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;

    const link = await prisma.link.findUnique({
      where: { hash },
    });

    if (!link) return res.status(404).json({ message: "Link not found" });

    if (link.contentId) {
      // One content
      const content = await prisma.content.findUnique({
        where: { id: link.contentId },
        include: { tags: true },
      });
      return res.json({ content });
    } else {
      // All contents of user
      const contents = await prisma.content.findMany({
        where: { authorId: link.userId },
        include: { tags: true },
      });
      return res.json({ contents });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching shared content" });
  }

       
};


