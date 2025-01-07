import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getCategories } from "./get-categories"
import { GetCategoryDto } from "../_dto/get-query.dto"


export const useGetCategories = (
  data?:GetCategoryDto
) => {
  return useQuery({
    queryKey: ["allStocks", data],
    queryFn: () => getCategories(data),
    placeholderData: keepPreviousData,
  })
}