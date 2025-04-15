import "dotenv/config";
import express from "express";
import { connectDB } from "./db";
import cors from "cors";
import authRouter from "./routes/auth.route";
import contentRouter from "./routes/content.route";
import shareBrainRouter from "./routes/BrainShare.route";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1", authRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain/share", shareBrainRouter);

app.listen(PORT, () => {
  console.log(`Server listing on ${PORT}`);
});
