import { keepPreviousData, queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/shared/api/query-client";
import { updateSupplier } from "./update-supplier";
import { getSupplier } from "./get-supplier";
import { createSupplier } from "./create-supplier";
import { ChangeSupplierDto } from "../dto";

export const supplierQueries = {
  // Общий ключ для всех запросов, связанных с поставщиками
  all: () => ["suppliers"],

  // Ключ для списка запросов
  lists: () => [...supplierQueries.all(), "supplier"],

  // Конфигурация для запроса списка складов поставщика
  // list: (userId: string, accessToken: string, page: number, limit: number) =>
  //   queryOptions({
  //     queryKey: [...supplierQueries.lists(), page, limit],
  //     queryFn: () => getSupplierStock(userId, accessToken, page, limit),
  //     placeholderData: keepPreviousData,
  //   }),

    // Примечание: Закомментированные функция получения одного элемента.
  details: () => [...supplierQueries.all(), "supplier"],

  detail: (userId: string, accessToken: string,) =>
    queryOptions({
      queryKey: [...supplierQueries.details(), userId, accessToken],
      queryFn: () => getSupplier(userId, accessToken),
      staleTime: 5000,
    }),

  // remove: (accessToken: string) =>
  //   useMutation({
  //     mutationFn: (stockId: string) => deleteSupplierStockElement(stockId, accessToken),
  //     onSuccess: () => {
  //       // Инвалидация кэша запросов для обновления данных после удаления элемента
  //       queryClient.invalidateQueries({ queryKey: supplierQueries.lists() });
  //     },
  //   }),

  // Конфигурация мутации для создания
  create: (userId:string, accessToken:string) =>
    useMutation({
      mutationFn: ({ userId, accessToken, values }: { userId: string; accessToken:string; values: ChangeSupplierDto }) =>
        createSupplier(userId, accessToken, values),
      onSuccess: () => {
        // Инвалидация кэша запросов для обновления данных после изменения элемента
        queryClient.invalidateQueries({ queryKey: [supplierQueries.lists(), , "supplier"] });
      },
    }),
    
    // Конфигурация мутации для обновления элемента
    update: (userId:string, accessToken:string) =>
      useMutation({
        mutationFn: ({ userId, accessToken, values }: { userId: string; accessToken:string; values: ChangeSupplierDto }) =>
          updateSupplier(userId, accessToken, values),
        onSuccess: () => {
          // Инвалидация кэша запросов для обновления данных после изменения элемента
          queryClient.invalidateQueries({ queryKey: [supplierQueries.lists(), , "supplier"] });
        },
      }),

};
