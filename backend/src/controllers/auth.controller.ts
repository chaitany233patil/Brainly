import { Request, Response } from "express";
import { userSchema } from "../schemas/schema";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const isSchemaValid: any = userSchema.safeParse(req.body);
    if (!isSchemaValid.success) {
      res.status(411).json({
        success: true,
        message: isSchemaValid.error.flatten().fieldErrors.password[0],
      });
      return;
    }

    const { username, password, email } = req.body;
    const hashPassword: string = await bcrypt.hash(password, 5);
    await User.create({
      username,
      password: hashPassword,
      email,
    });

    res.status(200).json({
      success: true,
      message: "signup succefully",
    });
  } catch (err) {
    res.status(400).send({
      message: "User already exist!",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    //@ts-ignore
    const hashPassword = await bcrypt.compare(password, user.password);
    if (hashPassword) {
      const token = jwt.sign(user?.id, process.env.JWT_SECRETE as string);
      res.send({
        success: true,
        token,
      });
      return;
    }
    res.status(400).send({
      success: false,
      message: "username or password is incorrect!",
    });
    return;
  } catch (e) {
    res.send({
      success: false,
      message: "username or password is incorrect!",
    });
  }
};
