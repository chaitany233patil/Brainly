import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3).max(25),
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .max(20, "password must be at most 20 characters")
    .regex(/[A-Z]/, "must contained at least one uppercase letter")
    .regex(/[a-z]/, "must contained at least one lowercase letter")
    .regex(/[0-9]/, "must contained at least one number")
    .regex(/[@$!%*?&]/, "Must contain at least one special character"),
});
