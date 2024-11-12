import { apiClient } from "@/shared/api/base";
import { PaginatedStockListDto } from "../dto/stock-with-pagination.dto";
import { StockQuery } from "./query/stock.query";

export const getStocks = async (page: number, perPage: number, sortBy?: string): Promise<PaginatedStockListDto > => {
  const query: StockQuery = { page, perPage }
  if (sortBy) query.sortBy = sortBy;
  return await apiClient.get<PaginatedStockListDto>('/stock', query)
}