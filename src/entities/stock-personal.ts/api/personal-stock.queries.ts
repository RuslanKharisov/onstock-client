import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import { getPersonalStock } from "./get-personal-stock"
import { deletePersonalStockElement } from "./del-personal-stock-element"
import { queryClient } from "@/shared/api/query-client"
import { ColumnFiltersState } from "@tanstack/react-table"
import { AddOrUpdateStockItem } from "./add-or-update-stock-item"
import { addOrUpdateProductDto } from "../dto/add-stock-item.dto"

export const useGetPersonalStock = (
  userId: string,
  accessToken: string,
  page: number,
  limit: number,
  filters?: ColumnFiltersState,
) => {
  return useQuery({
    queryKey: ["personalStock", "list", page, limit, filters],
    queryFn: () => getPersonalStock(userId, accessToken, page, limit, filters),
    placeholderData: keepPreviousData,
  })
}

export const useRemovePersonalStockElement = (accessToken: string) => {
  return useMutation({
    mutationFn: (stockId: string) =>
      deletePersonalStockElement(stockId, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personalStock"] })
    },
  })
}

export const useAddOrUpdateProduct = () => {
  return useMutation({
    mutationFn: ({data, accessToken}:{data: addOrUpdateProductDto, accessToken: string}) =>
      AddOrUpdateStockItem(accessToken, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personalStock"] })
    },
  })
}
