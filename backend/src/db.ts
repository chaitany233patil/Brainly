import "dotenv/config";
import mongoose from "mongoose";

export function connectDB() {
  main()
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => console.log(err));
}

async function main() {
  if (process.env.DB_URL) {
    await mongoose.connect(process.env.DB_URL);
  }
}
