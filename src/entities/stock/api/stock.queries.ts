import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getStocks } from "./get-stocks"
import { stockQueryDto } from "../_domain/types"

export const useGetStocks = (
  data:stockQueryDto
) => {
  return useQuery({
    queryKey: ["allStocks", data],
    queryFn: () => getStocks(data),
    placeholderData: keepPreviousData,
  })
}
