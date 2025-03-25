import { apiClient } from "@/shared/api/base"
import { addOrUpdateProductDto } from "../dto/add-stock-item.dto"

export type messagesType = {
  message: string
  property: string
}

export type ApiResponseDto<T = any> = {
  statusCode: number
  messages?: messagesType[] // Теперь поле необязательно
  data?: T // Данные также могут отсутствовать
}

export const AddOrUpdateStockItem = async (
  accessToken: string,
  data: addOrUpdateProductDto[],
): Promise<ApiResponseDto> => {
  const body = data
  return await apiClient.post(`product-management`, body, accessToken, "Bearer")
}