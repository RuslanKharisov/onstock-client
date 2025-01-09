import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

import { NewPasswordDto } from "../dto/new-password.dto"
import { ResetPasswordDto } from "../dto/reset-password.dto"
import { newPassword } from "./new-password"
import { resetPassword } from "./reset-password"
import { EmailRegisterDto } from "../dto/email-register.dto"
import { registerUser } from "./register-user"
import { emailVerify } from "./email-verify"
import { updateUser } from "./update-user"
import { UpdateUserDto } from "../dto/update-user.dto"
import { getUserById } from "./get-user-by-id"

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: ({ data, token }: { data: NewPasswordDto; token: string }) =>
      newPassword(data, token),
  })

export const useUpdateUser = () =>
  useMutation({
    mutationFn: ({ data, accessToken }: { data: UpdateUserDto; accessToken: string }) =>
      updateUser(data, accessToken),
  })

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ data }: { data: ResetPasswordDto }) => resetPassword(data),
  })

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: ({ data }: { data: EmailRegisterDto }) => registerUser(data),
  })
}

export const useEmailUserVerify = () => {
  return useMutation({
    mutationFn: ({ token }: { token: string }) => emailVerify(token),
  })
}

export const useGetUser = (
  userId: string,
  accessToken: string,
) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(userId, accessToken),
    placeholderData: keepPreviousData,
  })
}

// Не используется, поскольку loginUser(data) вызывается из calback signIn NextAuth
// 
// export const useLoginUser = () => {
//   return useMutation({
//     mutationFn: (data: z.infer<typeof LoginSchema>) => loginUser(data),
//   })
// }