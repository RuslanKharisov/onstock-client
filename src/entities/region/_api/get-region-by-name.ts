import { apiClient } from "@/shared/api/base"

export type ApiResponseDto = {
    "id": number,
    "name": string,
    "label": string,
}[]

export const getRegionByName = async (name?: string): Promise<ApiResponseDto> => {
    return await apiClient.get(`region/search?name=${name}`)
}