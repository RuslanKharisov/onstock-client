import { useMutation } from "@tanstack/react-query"

import { NewPasswordDto } from "../dto/new-password.dto"
import { ResetPasswordDto } from "../dto/reset-password.dto"
import { newPassword } from "./new-password"
import { resetPassword } from "./reset-password"
import { EmailRegisterDto } from "../dto/email-register.dto"
import { registerUser } from "./register-user"

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: ({ data, token }: { data: NewPasswordDto; token: string }) =>
      newPassword(data, token),
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