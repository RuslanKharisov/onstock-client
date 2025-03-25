import { apiClient } from "@/shared/api/base"
import { TPersonalPaginatedStockDto } from "../dto"

interface queryDTO {
  page?: string;
  perPage?: string;
  sku?: string;
  description?: string;

};

export const getPersonalStock = async ({
  userId,
  accessToken,
  data
}: {
  userId: string
  accessToken: string
  data: queryDTO
}): Promise<TPersonalPaginatedStockDto> => {
  const { page, perPage, ...filters } = data;

  // Преобразуем filters в массив объектов { id, value }
  const filtersArray = Object.entries(filters)
    .filter(([_, value]) => value) // Убираем пустые значения
    .map(([key, value]) => ({ id: key, value }));

  const body = { page, perPage, filters: JSON.stringify(filtersArray) };

  return await apiClient.post<TPersonalPaginatedStockDto>(
    `stock/${userId}`,
    body,
    accessToken,
    "Bearer"
  );
};
