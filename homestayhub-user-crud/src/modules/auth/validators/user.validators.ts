import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  name: z.string().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  avatar: z.string().url().optional(),
});