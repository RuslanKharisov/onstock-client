import { keepPreviousData, queryOptions, useMutation } from "@tanstack/react-query"
import { getPersonalStock } from "./get-personal-stock";
import { deletePersonalStockElement } from "./del-personal-stock-element";
import { queryClient } from "@/shared/api/query-client";

/** Фабрики запросов */

export const personalStockQueries = {
  all: () => ["personalStock"],

  lists: () => [...personalStockQueries.all(), "list"],
  list: (userId: string, accessToken:string, page: number, limit: number) =>
    queryOptions({
      queryKey: [...personalStockQueries.lists(), page, limit],
      queryFn: () => getPersonalStock(userId, accessToken, page, limit),
      placeholderData: keepPreviousData,
    }),



  // details: () => [...personalStockQueries.all(), "detail"],
  // detail: (query?: StockDetailQuery) =>
  //   queryOptions({
  //     queryKey: [...personalStockQueries.details(), query?.id],
  //     queryFn: () => getDetailPersonalStock({ id: query?.id }),
  //     staleTime: 5000,
  //   }),

    // Метод для создания поста
  // create: () =>
  //   queryOptions({
  //     queryKey: [...stockQueries.all(), "create"],
  //     mutationFn: (newPersonalStock) => createPersonalStock(newStock),
  //     onSuccess: () => {
  //       // Здесь можно добавить логику для обновления кэша после создания поста
  //     },
  //   }),

  // Метод для обновления
  // update: () =>
  //   queryOptions({
  //     queryKey: [...stockQueries.all(), "update"],
  //     mutationFn: (updatedPersonalStock) => updatePersonalStock(updatedStock),
  //     onSuccess: () => {
  //       // Здесь можно добавить логику для обновления кэша после обновления поста
  //     },
  //   }),

  // Метод для удаления
  remove: (accessToken: string) =>
    useMutation({
      // queryKey: [...personalStockQueries.all(), "remove"],
      mutationFn: (stockId: string) => deletePersonalStockElement(stockId, accessToken),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['personalStock']});
      },
    }),
};


