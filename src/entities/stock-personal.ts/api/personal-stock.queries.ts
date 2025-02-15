import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import { getPersonalStock } from "./get-personal-stock"
import { deletePersonalStockElement } from "./del-personal-stock-element"
import { queryClient } from "@/shared/api/query-client"
import { ColumnFiltersState } from "@tanstack/react-table"
import { AddOrUpdateStockItem } from "./add-or-update-stock-item"
import { addOrUpdateProductDto } from "../dto/add-stock-item.dto"

export const useGetPersonalStock = ({
  userId,
  accessToken,
  page,
  perPage,
  filters,
}: {
  userId: string
  accessToken: string
  page: number
  perPage: number
  filters?: ColumnFiltersState
}) => {
  return useQuery({
    queryKey: ["personalStock", "list", page, perPage, filters],
    queryFn: () =>
      getPersonalStock({ userId, accessToken, page, perPage, filters }),
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
    mutationFn: async ({
      data,
      accessToken,
    }: {
      data: addOrUpdateProductDto[]
      accessToken: string
    }) => await AddOrUpdateStockItem(accessToken, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personalStock"] })
    },
  })
}
