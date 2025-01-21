import { z } from "zod"

export const SupplierSchema = z
  .object({
    name: z.string().min(1, {
      message: "Укажите имя",
    }),
    email: z.string().email({
      message: "Укажите почту",
    }),
    siteUrl: z.string().optional(),
    phoneWork: z.string().optional(),
    phoneMobile: z.string().optional(),
    telegramAccount: z.string().optional(),
    whatsappNumber: z.string().optional(),
    vkProfile: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    houseNumber: z.string().optional(),
    logoUrl: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.siteUrl && data.siteUrl.trim() !== "") {
      const urlRegex = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([/?#].*)?$/
      if (!urlRegex.test(data.siteUrl)) {
        ctx.addIssue({
          path: ["siteUrl"],
          code: z.ZodIssueCode.custom,
          message:
            "Укажите корректный URL с указанием зоны (например, https://example.com)",
        })
      }
    }
    if (data.logoUrl && data.logoUrl.trim() !== "") {
      const logoUrlRegex =
        /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([/?#].*)?$/
      if (!logoUrlRegex.test(data.logoUrl)) {
        ctx.addIssue({
          path: ["logoUrl"],
          code: z.ZodIssueCode.custom,
          message: "Укажите корректный URL для логотипа",
        })
      }
    }
  })
