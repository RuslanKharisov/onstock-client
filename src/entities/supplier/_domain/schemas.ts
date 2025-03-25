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
    logoUrl: z.string().optional(),

    address: z.object({
      street: z.string().optional(),
      house: z.string().optional(),
      city: z.object({
        id: z.number().optional(),
        name: z.string().optional(),
        region: z.object({
          name: z.string().optional(),
          country: z.object({
            name: z.string().optional(),
          }).optional(),
        }).optional(),
      }).optional(),
    }).optional(),
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
    if (data.vkProfile && data.vkProfile.trim() !== "") {
      const urlRegex = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([/?#].*)?$/
      if (!urlRegex.test(data.vkProfile)) {
        ctx.addIssue({
          path: ["vkProfile"],
          code: z.ZodIssueCode.custom,
          message:
            "Укажите корректный URL с указанием зоны (например, https://example.com/account)",
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
          message: "Укажите корректный URL (например, https://example.com)",
        })
      }
    }
    if (data.phoneWork && data.phoneWork.trim() !== "") {
      const logoUrlRegex =
        /^(?:\+7|8)?\s?\(?[1-9]\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/
      if (!logoUrlRegex.test(data.phoneWork)) {
        ctx.addIssue({
          path: ["phoneWork"],
          code: z.ZodIssueCode.custom,
          message: "Укажите корректный формат номера",
        })
      }
    }
    if (data.phoneMobile && data.phoneMobile.trim() !== "") {
      const logoUrlRegex =
        /^(?:\+7|8)?\s?\(?[1-9]\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/
      if (!logoUrlRegex.test(data.phoneMobile)) {
        ctx.addIssue({
          path: ["phoneMobile"],
          code: z.ZodIssueCode.custom,
          message: "Укажите корректный формат номера",
        })
      }
    }
    if (data.whatsappNumber && data.whatsappNumber.trim() !== "") {
      const logoUrlRegex =
        /^(?:\+7|8)?\s?\(?[1-9]\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/
      if (!logoUrlRegex.test(data.whatsappNumber)) {
        ctx.addIssue({
          path: ["whatsappNumber"],
          code: z.ZodIssueCode.custom,
          message: "Корректный формат: 7 (000) 000-00-00",
        })
      }
    }
  })
