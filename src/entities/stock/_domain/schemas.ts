import { z } from "zod"

export const createProductFormSchema = z.object({
  sku: z.string().min(1, 
    {
      message: "Поле артикул не может быть пустым",
    }
  ),
  name: z.string().min(1,
    {
      message: "Поле название не может быть пустым",
    }
  ),
  description: z.string().nullable().optional(),
  quantity: z.string().min(1,
    {
      message: "Поле количиство должно быть > 0",
    }
  ),
});