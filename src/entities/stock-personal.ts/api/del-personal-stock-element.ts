import { apiClient } from "@/shared/api/base"

export const deletePersonalStockElement = async (stockId: string, accessToken: string): Promise<{success:boolean}> => {
  return await apiClient.delete<{success:boolean}>(`/stock/${stockId}`, accessToken)
}