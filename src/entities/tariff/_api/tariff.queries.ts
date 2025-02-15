import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getTarif } from "./get-tariff"

export const useGetTariff = (id?: number) => {
  return useQuery({
    queryKey: ["tariff"],
    queryFn: () => getTarif(id),
    placeholderData: keepPreviousData,
  })
}
