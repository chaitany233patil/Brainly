import { Request, Response } from "express";
import { Link } from "../models/links.model";
import { random } from "../utils";
import { User } from "../models/user.model";
import { Content } from "../models/content.model";

export const BrainShare = async (req: Request, res: Response) => {
  const { isShare } = req.body;
  try {
    //@ts-ignore
    const user = await User.findOne({ _id: req.userId });

    if (isShare) {
      const existingLink = await Link.findOne({ userId: user?._id });
      if (existingLink) {
        res.json({
          hash: existingLink.hash,
        });
        return;
      }
      const hash = random(10);
      console.log(hash);
      await Link.create({
        hash: hash,
        userId: user?._id,
      });

      res.json({
        hash: hash,
      });
      return;
    } else {
      await Link.deleteOne({ userId: user?._id });

      res.json({
        message: "link deleted!",
      });
    }
  } catch (e) {
    res.json({
      message: "Invalid input!",
    });
  }
};

export const getShareBrain = async (req: Request, res: Response) => {
  const { sharelink } = req.params;
  try {
    const link = await Link.findOne({ hash: sharelink });

    if (link) {
      const user = await User.findOne({ _id: link.userId });
      if (!user) {
        res.status(411).json({
          message: "user not exist!",
        });
        return;
      }
      const content = await Content.find({ userId: user._id });
      res.json({
        username: user.username,
        content: content,
      });
    } else {
      res.status(404).json({
        message: "Page Not Found!",
      });
    }
  } catch (e) {
    res.status(404).json({
      message: "Page Not Found!",
    });
  }
};
