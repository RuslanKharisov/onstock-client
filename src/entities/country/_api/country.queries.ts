import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getCountryByName } from "./get-countries-by-name"

export const useGetCountries = (name?: string) => {
    return useQuery({
        queryKey: ["country"],
        queryFn: () => getCountryByName(name),
        placeholderData: keepPreviousData,
    })
}