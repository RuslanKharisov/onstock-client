import { apiClient } from "@/shared/api/base"

export type ApiResponseDto = {
  id: number
  maxProducts: number
  name: string
  pricePerUnit: number
}

export const getTarif = async (id?: number): Promise<ApiResponseDto> => {
  return await apiClient.get(`tariff/${id}`)
}
