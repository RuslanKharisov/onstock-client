// "use server"

// import { ResetSchema } from "@/entities/user/_domain/schemas"
// import { userRepository } from "@/entities/user/_repositories/user"
// import { generatePasswordResetToken } from "@/entities/user/lib/generate-token"
// import { sendPasswordResetEmail } from "@/shared/lib/mail"
// import { TypeOf, z } from "zod"

// export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
//   const validatedFields = ResetSchema.safeParse(values)

//   if (!validatedFields.success) {
//     return { error: "Не корректный Email!" }
//   }

//   const { email } = validatedFields.data
//   const existingUser = await userRepository.getUserByEmail(email)
//   if (!existingUser) {
//     return { error: "Указанный Email не найден!" }
//   }

//   const resetToken = await generatePasswordResetToken(email)
//   await sendPasswordResetEmail(resetToken.email, resetToken.token)

//   return { success: "На указанную почту отправлено письмо для сброса пароля!" }
// }
