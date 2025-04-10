import "dotenv/config";
import express from "express";
import { connectDB } from "./db";
import { User } from "./models/user.model";
import bcrypt from "bcrypt";
import { userSchema } from "./schemas/schema";
import jwt from "jsonwebtoken";
import { userAuth } from "./middlewares";
import { Content } from "./models/content.model";
import { Link } from "./models/links.model";
import { random } from "./utils";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

connectDB();

//Signup
app.post("/api/v1/signup", async (req, res) => {
  try {
    const isSchemaValid: any = userSchema.safeParse(req.body);
    if (!isSchemaValid.success) {
      res.status(411).send({
        message: isSchemaValid.error.flatten().fieldErrors.password[0],
      });
      return;
    }

    const { username, password } = req.body;
    const hashPassword: string = await bcrypt.hash(password, 5);
    await User.create({
      username,
      password: hashPassword,
    });

    res.status(200).json({
      message: "signup succefully",
    });
  } catch (err) {
    res.status(400).send({
      message: "User already exist!",
    });
  }
});

//Signin
app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    //@ts-ignore
    const hashPassword = await bcrypt.compare(password, user.password);
    if (hashPassword) {
      const token = jwt.sign(user?.id, process.env.JWT_SECRETE as string);
      res.send({
        token,
      });
      return;
    }
    res.status(400).send({
      message: "Invalid credentials!",
    });
    return;
  } catch (e) {
    res.send({
      message: "invalid credentials!",
    });
  }
});

//Add new Content
app.post("/api/v1/content", userAuth, async (req, res) => {
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
});

//view content
app.get("/api/v1/content", userAuth, async (req, res) => {
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
});

//delete content
app.post("/api/v1/content/:contentId", userAuth, async (req, res) => {
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
});

//share your brain
app.post("/api/v1/brain/share", userAuth, async (req, res) => {
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
      await Link.create({
        hash: hash,
        userId: user?._id,
      });

      res.json({
        hash: hash,
      });
      return;
    } else {
      const link = await Link.deleteOne({ userId: user?._id });

      res.json({
        message: "link deleted!",
      });
    }
  } catch (e) {
    res.json({
      message: "Invalid input!",
    });
  }
});

app.get("/api/v1/brain/share/:sharelink", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server listing on ${PORT}`);
});
