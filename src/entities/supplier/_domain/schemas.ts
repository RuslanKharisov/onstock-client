import { z } from "zod"

export const SupplierSchema = z.object({
  name: z.string().min(1, {
    message: "Укажите имя",
  }),
  email: z.string().email({
    message: "Укажите почту",
  }),
  siteUrl: z.string().url( {
    message: "https://...",
  }),
})
