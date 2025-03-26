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
}): Promise<TPersonalPaginatedStockDto | null> => {
  try {
    const { page, perPage, ...filters } = data;

    // Преобразуем filters в массив объектов { id, value }
    const filtersArray = Object.entries(filters)
      .filter(([_, value]) => value) // Убираем пустые значения
      .map(([key, value]) => ({ id: key, value }));

    const body = { page, perPage, filters: JSON.stringify(filtersArray) };

    const result = await apiClient.post<TPersonalPaginatedStockDto>(
      `stock/${userId}`,
      body,
      accessToken,
      "Bearer"
    );

    return result;
  } catch (error) {
    console.error("Error in getPersonalStock:", error);

    // Можно добавить дополнительную обработку ошибок здесь
    // Например, отправку ошибки в систему мониторинга

    // Возвращаем null или можно вернуть объект с default значениями
    return null;

    // Альтернативный вариант - вернуть объект с default значениями:
    // return {
    //   data: [],
    //   page: 1,
    //   perPage: 10,
    //   total: 0
    // };
  }
};