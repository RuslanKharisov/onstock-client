import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { LoginSchema } from "@/entities/user/_domain/schemas"
import { loginUserAPI } from "@/shared/api/auth"

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof LoginSchema>) => loginUserAPI(data),
  })
}
