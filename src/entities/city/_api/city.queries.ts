import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getCityByName } from "./get-city-by-name"

export const useGetCities = (name?: string) => {
    return useQuery({
        queryKey: ["city"],
        queryFn: () => getCityByName(name),
        placeholderData: keepPreviousData,
    })
}