import { apiClient } from "@/shared/api/base"
import { Session } from "next-auth"
import { CreateUserDto } from "../dto/create-register.dto"

export interface ICreateUser {
  success?: string
  error?: string
}

export const createUser = async (
  data: CreateUserDto,
): Promise<Session> => {
  const body = { ...data }
  return await apiClient.post(`auth/oauth`, body)
}
