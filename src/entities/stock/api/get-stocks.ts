import { apiClient } from "@/shared/api/base";
import { PaginatedStockListDto } from "../dto/stock-with-pagination.dto";
import { StockQuery } from "./query/stock.query";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { stockQueryDto } from "../_domain/types";

// export const getStocks = async (data:stockQueryDto): Promise<PaginatedStockListDto > => {
//   console.log("🚀 ~ getStocks ~ data:", data)
//   const query: stockQueryDto = { ...data }
//   return await apiClient.get<PaginatedStockListDto>('/stock', query)
// }

export const getStocks = async (
  data: stockQueryDto
): Promise<PaginatedStockListDto> => {
  const query: Record<string, string | number> = {
    ...data,
    filters: JSON.stringify(data.filters || []), // Преобразование массива в строку
  }
  return await apiClient.get<PaginatedStockListDto>('/stock', query)
}


