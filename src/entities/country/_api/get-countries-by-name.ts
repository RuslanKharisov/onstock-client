import { apiClient } from "@/shared/api/base"

export type ApiResponseDto = {
    "id": number,
    "name": string,
    "label": string,
}[]

export const getCountryByName = async (name?: string): Promise<ApiResponseDto> => {
    return await apiClient.get(`country/search?name=${name}`)
}