import { z } from "zod"

export const profileSchema = z.object({
  email: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Укажите почту",
  }),
  password: z.string().min(1, {
    message: "Введите пароль",
  }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Укажите почту",
  }),
  password: z.string().min(8, {
    message: "Длина пароля не менее 8 символов",
  }),
  name: z.string().min(1, {
    message: "Укажите имя",
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Укажите почту",
  }),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Длина пароля не менее 8 символов",
  }),
})
