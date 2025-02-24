import { apiClient } from "@/shared/api/base"

export type ApiCityResponseDto = {
    "id": number,
    "name": string,
}

export const getCityByName = async (name?: string): Promise<ApiCityResponseDto[]> => {
    return await apiClient.get(`city/search?name=${name}`)
}