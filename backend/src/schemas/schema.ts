import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(25),
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .max(20, "password must be at most 20 characters")
    .regex(/[A-Z]/, "password must contained at least one uppercase letter")
    .regex(/[a-z]/, "password must contained at least one lowercase letter")
    .regex(/[0-9]/, "password must contained at least one number")
    .regex(/[@$!%*?&]/, "password must contain at least one special character"),
});
