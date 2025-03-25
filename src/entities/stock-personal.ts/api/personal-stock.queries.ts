import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import { getPersonalStock } from "./get-personal-stock"
import { deletePersonalStockElement } from "./del-personal-stock-element"
import { queryClient } from "@/shared/api/query-client"
import { AddOrUpdateStockItem } from "./add-or-update-stock-item"
import { addOrUpdateProductDto } from "../dto/add-stock-item.dto"


// export const useGetPersonalStock = ({
//   userId,
//   accessToken,
//   data
// }: {
//   userId: string
//   accessToken: string
//   data: queryDTO
// }) => {
//   return useQuery({
//     queryKey: ["personalStock"],
//     queryFn: () => {
//       const data = getPersonalStock({ userId, accessToken, data });
//       return data;
//     },
//     placeholderData: keepPreviousData,
//   })
// }

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
    mutationFn: ({
      data,
      accessToken,
    }: {
      data: addOrUpdateProductDto[],
      accessToken: string
    }) => {
      return AddOrUpdateStockItem(accessToken, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personalStock"] });
    },
  });
}