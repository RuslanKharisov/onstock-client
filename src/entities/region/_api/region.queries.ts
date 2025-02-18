import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getRegionByName } from "./get-region-by-name"

export const useGetRegions = (name?: string) => {
    return useQuery({
        queryKey: ["region"],
        queryFn: () => getRegionByName(name),
        placeholderData: keepPreviousData,
    })
}