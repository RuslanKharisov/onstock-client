import { useMutation } from "@tanstack/react-query";
import { newPassword } from "./new-password";
import { NewPasswordDto } from "../dto/new-password.dto";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { resetPassword } from "./reset-password";

export const useUpdatePassword = () => 
  useMutation({
    mutationFn: ({data, token}:{data: NewPasswordDto, token:string}) => 
      newPassword(data, token),
  })

export const useResetPassword = () => 
  useMutation({
    mutationFn: ({data}:{data: ResetPasswordDto}) => 
      resetPassword(data)
  })