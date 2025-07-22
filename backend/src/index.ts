// src/index.ts
import "dotenv/config";
import express from "express";
import { connectDB } from "./db";
import cors from "cors";
import authRouter from "./routes/auth.route";
import contentRouter from "./routes/content.route";
import shareBrainRouter from "./routes/BrainShare.route";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1", authRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain/share", shareBrainRouter);

// ❌ REMOVE app.listen() for Vercel
// ✅ INSTEAD: export the handler

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
