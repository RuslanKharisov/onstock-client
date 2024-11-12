import { apiClient } from "@/shared/api/base"
import { StockQuery } from "./query/stock.query"
import { PaginatedStockListDto } from "../dto/stock-with-pagination.dto"
import { keepPreviousData, queryOptions } from "@tanstack/react-query"


export const getStocks = async (page: number, perPage: number, sortBy?: string): Promise<PaginatedStockListDto > => {
  const query: StockQuery = { page, perPage }
  if (sortBy) query.sortBy = sortBy;
  return await apiClient.get<PaginatedStockListDto>('/stock', query)
}

export const getPersonalStock = async (userId: string, accessToken: string, page: number, perPage: number,): Promise<PaginatedStockListDto> => {
  const body = { page, perPage }
  return await apiClient.post<PaginatedStockListDto>(`/stock/${userId}`, body, accessToken)
}
// 

/** Фабрики запросов */

export const stockQueries = {
  all: () => ["posts"],

  lists: () => [...stockQueries.all(), "list"],
  list: (page: number, limit: number) =>
    queryOptions({
      queryKey: [...stockQueries.lists(), page, limit],
      queryFn: () => getStocks(page, limit),
      placeholderData: keepPreviousData,
    }),

  details: () => [...stockQueries.all(), "detail"],
  detail: (query?: PostDetailQuery) =>
    queryOptions({
      queryKey: [...stockQueries.details(), query?.id],
      queryFn: () => getDetailStock({ id: query?.id }),
      staleTime: 5000,
    }),
};


