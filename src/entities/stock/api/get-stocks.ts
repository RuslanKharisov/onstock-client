import { apiClient } from "@/shared/api/base"
import { PaginatedStockListDto } from "../dto/stock-with-pagination.dto"
import { stockQueryDto } from "../_domain/types"

export const getStocks = async (
  data: stockQueryDto,
): Promise<PaginatedStockListDto> => {
  const body = {
    page: data.page,
    perPage: data.perPage,
    filters: JSON.stringify(data.filters || []),
  }
  return await apiClient.post<PaginatedStockListDto>("stock", body)
}
