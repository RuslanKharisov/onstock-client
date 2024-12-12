import { apiClient } from "@/shared/api/base";
import { PaginatedStockListDto } from "../dto/stock-with-pagination.dto";
import { stockQueryDto } from "../_domain/types";

export const getStocks = async (
  data: stockQueryDto
): Promise<PaginatedStockListDto> => {
  const query: Record<string, string | number> = {
    ...data,
    filters: JSON.stringify(data.filters || []),
  }
  return await apiClient.get<PaginatedStockListDto>('/stock', query)
}


