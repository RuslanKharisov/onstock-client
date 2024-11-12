import { apiClient } from "@/shared/api/base"
import { TPersonalPaginatedStockDto } from "../dto"


export const getPersonalStock = async (userId: string, accessToken: string, page: number, perPage: number,): Promise<TPersonalPaginatedStockDto> => {
  const body = { page, perPage }
  return await apiClient.post<TPersonalPaginatedStockDto>(`/stock/${userId}`, body, accessToken)
}