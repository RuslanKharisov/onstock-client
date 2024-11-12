import { keepPreviousData, queryOptions, useMutation } from "@tanstack/react-query";
import { getPersonalStock } from "./get-personal-stock";
import { deletePersonalStockElement } from "./del-personal-stock-element";
import { queryClient } from "@/shared/api/query-client";

/** 
 * Фабрика запросов для работы с персональными запасами.
 * 
 * Этот объект содержит методы для получения списка персональных запасов,
 * а также для удаления отдельных элементов из списка.
 */
export const personalStockQueries = {
  /**
   * Получение ключа для всех запросов персональных запасов.
   *
   * @returns {Array<string>} Массив с ключом "personalStock".
   */
  all: () => ["personalStock"],

  /**
   * Получение ключа для запроса списка персональных запасов.
   *
   * @returns {Array<string>} Массив с ключами для запроса списка.
   */
  lists: () => [...personalStockQueries.all(), "list"],

  /**
   * Создание запроса для получения списка персональных запасов.
   *
   * @param {string} userId - Идентификатор пользователя, чьи запасы нужно получить.
   * @param {string} accessToken - Токен доступа для аутентификации запросов к API.
   * @param {number} page - Номер страницы для пагинации.
   * @param {number} limit - Количество элементов на странице.
   * @returns {Object} Объект с настройками запроса.
   */
  list: (userId: string, accessToken: string, page: number, limit: number) =>
    queryOptions({
      queryKey: [...personalStockQueries.lists(), page, limit],
      queryFn: () => getPersonalStock(userId, accessToken, page, limit),
      placeholderData: keepPreviousData,
    }),

  /**
   * Создание мутации для удаления элемента из персональных запасов.
   *
   * @param {string} accessToken - Токен доступа для аутентификации запроса на удаление.
   * @returns {Object} Объект с настройками мутации.
   */
  remove: (accessToken: string) =>
    useMutation({
      mutationFn: (stockId: string) => deletePersonalStockElement(stockId, accessToken),
      onSuccess: () => {
        // Инвалидация кэша запросов для обновления данных после удаления элемента.
        queryClient.invalidateQueries({ queryKey: ['personalStock'] });
      },
    }),
};



