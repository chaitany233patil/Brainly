import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<User>("User", userSchema);
