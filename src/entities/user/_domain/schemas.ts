import { z } from "zod";

export const profileSchema = z.object({
  email: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Укажите почту"
  }),
  password: z.string().min(1,{
    message: "Введите пароль"
  })
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Укажите почту"
  }),
  password: z.string().min(8,{
    message: "Длина пароля не менее 8 символов"
  }),
  name: z.string().min(1, {
    message: "Укажите имя"
  })
});