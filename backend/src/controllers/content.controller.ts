import { Request, Response } from "express";
import { Content } from "../models/content.model";

export const addContent = async (req: Request, res: Response) => {
  const { userId }: any = req;
  const { type, title, link } = req.body;

  try {
    const content = new Content({
      type: type,
      title: title,
      link: link,
      tags: [],
      userId: userId,
    });

    await content.save();

    res.send({ message: "Content Added!" });
  } catch (e) {
    res.status(403).json({
      message: "Unexpected error occured!",
    });
  }
};

export const getContent = async (req: Request, res: Response) => {
  const { userId }: any = req;
  try {
    const content = await Content.find({ userId: userId }).populate(
      "userId",
      "username"
    );
    res.send({
      content: content,
    });
    return;
  } catch (e) {
    res.status(404).json({
      message: "Content Not Found!",
    });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  const { contentId } = req.params;
  //@ts-ignore
  try {
    const deletedContent = await Content.deleteMany({
      _id: contentId,
      //@ts-ignore
      userId: req.userId,
    });
    if (!deletedContent) {
      res.json({
        message: "Content Not Found!",
      });
    }
    res.json({
      status: "Content Deleted!",
      content: deletedContent,
    });
  } catch (e) {
    res.status(404).json({
      message: "Content you looking for not found!",
    });
  }
};
