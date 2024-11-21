import { keepPreviousData, queryOptions, useMutation } from "@tanstack/react-query";
import { getPersonalStock } from "./get-personal-stock";
import { deletePersonalStockElement } from "./del-personal-stock-element";
import { queryClient } from "@/shared/api/query-client";
import { ColumnFiltersState } from "@tanstack/react-table";

export const personalStockQueries = {
  all: () => ["personalStock"],

  lists: () => [...personalStockQueries.all(), "list"],

  list: (userId: string, accessToken: string, page: number, limit: number, filters?: ColumnFiltersState) =>
    queryOptions({
      queryKey: [...personalStockQueries.lists(), page, limit, filters],
      queryFn: () => getPersonalStock(userId, accessToken, page, limit, filters),
      placeholderData: keepPreviousData,
    }),

  remove: (accessToken: string) =>
    useMutation({
      mutationFn: (stockId: string) => deletePersonalStockElement(stockId, accessToken),
      onSuccess: () => {
        // Инвалидация кэша запросов для обновления данных после удаления элемента.
        queryClient.invalidateQueries({ queryKey: ['personalStock'] });
      },
    }),
};



