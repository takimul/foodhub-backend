import { z } from "zod";

export const createMealSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5),
    price: z.number().positive("Price must be positive"),
    categoryId: z.string().min(1),
    image: z.string().optional(),
  }),
});

export const updateMealSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    isAvailable: z.boolean().optional(),
  }),
});
