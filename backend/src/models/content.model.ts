import { model, Schema, Types } from "mongoose";

const contentSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  tags: [],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const Content = model("Content", contentSchema);
