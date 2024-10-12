import { emailVerifyApi } from "@/shared/api/auth"
import { useMutation } from "@tanstack/react-query"

export const useEmaulUserVerify = () => {
  return useMutation({
    mutationFn: (token: string) => emailVerifyApi(token)
  })
}