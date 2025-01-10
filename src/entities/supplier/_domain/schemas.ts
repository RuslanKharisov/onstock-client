import { z } from "zod"

// export const SupplierSchema = z.object({
//   name: z.string().min(1, {
//     message: "Укажите имя",
//   }),
//   email: z.string().email({
//     message: "Укажите почту",
//   }),
//   siteUrl: z
//     .string()
//     .regex(/^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?#].*)?$/, {
//       message:
//         "Укажите корректный URL с указанием зоны (например, https://example.com)",
//     })
//     .optional(),
// })

export const SupplierSchema = z
  .object({
    name: z.string().min(1, {
      message: "Укажите имя",
    }),
    email: z.string().email({
      message: "Укажите почту",
    }),
    siteUrl: z.string().optional(),
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
  })
