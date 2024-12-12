import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { RegisterSchema } from "@/entities/user/_domain/schemas"
import { registerUserAPI } from "@/shared/api/auth"

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof RegisterSchema>) => registerUserAPI(data),
  })
}
