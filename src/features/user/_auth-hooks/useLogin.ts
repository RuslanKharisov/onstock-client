import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "@/entities/user/_domain/schemas";
import { loginUserAPI } from "@/shared/api/auth";
import { useRouter } from "next/navigation";

export const useLoginUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: z.infer<typeof LoginSchema>) => {
      const response = await loginUserAPI(data);
      // router.push('/')
      console.log("🚀 ~ mutationFn: ~ response:", response)
      return response;
    }
  });
};
