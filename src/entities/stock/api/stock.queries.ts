import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import { getStocks } from "./get-stocks"
import { stockQueryDto } from "../_domain/types"

export const stockQueries = {

  all: () => ["posts"],
  lists: () => [...stockQueries.all(), "list"],
  list: (data:stockQueryDto) =>
    queryOptions({
      queryKey: [...stockQueries.lists(), data],
      queryFn: () => getStocks(data),
      placeholderData: keepPreviousData,
    }),

  // Примечание: Закомментированные функция получения одного элемента.
  // details: () => [...stockQueries.all(), "detail"],
  // detail: (query?: PostDetailQuery) =>
  //   queryOptions({
  //     queryKey: [...stockQueries.details(), query?.id],
  //     queryFn: () => getDetailStock({ id: query?.id }),
  //     staleTime: 5000,
  //   }),
}
