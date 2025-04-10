import mongoose, { model, Schema } from "mongoose";

const linksSchema = new Schema({
  hash: { type: String, unique: true, require: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User", require: true },
});

export const Link = model("Link", linksSchema);
