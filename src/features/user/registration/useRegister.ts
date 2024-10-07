import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerUserAPI } from "@/shared/api/endpoints/register";
import { RegisterSchema } from "@/entities/user/_domain/schemas";


export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof RegisterSchema>) => registerUserAPI(data),
  });
};