import { apiClient } from "@/shared/api/base"
import { addOrUpdateProductDto } from "../dto/add-stock-item.dto"

export interface AddOrUpdateStockItemResponse {
  success: string
  error: string
}

export const AddOrUpdateStockItem = async (
  accessToken: string,
  data: addOrUpdateProductDto,
): Promise<AddOrUpdateStockItemResponse> => {
  const body = { ...data }
  return await apiClient.post(`/product-management`, body, accessToken, 'Bearer')
}
