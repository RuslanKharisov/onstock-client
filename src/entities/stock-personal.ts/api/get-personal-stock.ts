import { apiClient } from "@/shared/api/base"
import { TPersonalPaginatedStockDto } from "../dto"
import { ColumnFiltersState } from "@tanstack/react-table"

export const getPersonalStock = async (
  userId: string,
  accessToken: string,
  page: number,
  perPage: number,
  filters?: ColumnFiltersState,
): Promise<TPersonalPaginatedStockDto> => {
  const body = {
    page,
    perPage,
    filters: JSON.stringify(filters || []),
  }
  return await apiClient.post<TPersonalPaginatedStockDto>(
    `/stock/${userId}`,
    body,
    accessToken,
    "Bearer",
  )
}
