import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "./models/user.model";

export async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.headers;
  try {
    const userId = jwt.verify(
      token as string,
      process.env.JWT_SECRETE as string
    );
    //@ts-ignore
    const user = await User.findById(userId);
    if (user) {
      //@ts-ignore
      req.userId = userId;
      return next();
    }

    res.status(401).json({
      message: "Inavalid Credentials",
    });
  } catch (e) {
    res.status(401).json({ message: "Credentials!" });
  }
}
