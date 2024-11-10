import { apiClient } from "@/shared/api/base"
import { StockQuery } from "../query/stock.query"
import { PaginatedStockListDto } from "../dto/stock-with-pagination.dto"


export const getStocks = async (page: number, perPage: number, sortBy?: string): Promise<PaginatedStockListDto > => {
  const query: StockQuery = { page, perPage }
  if (sortBy) query.sortBy = sortBy;
  return await apiClient.get<PaginatedStockListDto>('/stock', query)
  
}