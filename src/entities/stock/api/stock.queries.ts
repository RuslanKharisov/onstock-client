import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import { getStocks } from "./get-stocks"

/**
 * Фабрика запросов для работы с запасами.
 *
 * Этот объект содержит методы для получения списка запасов.
 */
export const stockQueries = {
  /**
   * Получение ключа для всех запросов запасов.
   *
   * @returns {Array<string>} Массив с ключом "posts".
   */
  all: () => ["posts"],

  /**
   * Получение ключа для запроса списка запасов.
   *
   * @returns {Array<string>} Массив с ключами для запроса списка.
   */
  lists: () => [...stockQueries.all(), "list"],

  /**
   * Создание запроса для получения списка запасов.
   *
   * @param {number} page - Номер страницы для пагинации.
   * @param {number} limit - Количество элементов на странице.
   * @returns {Object} Объект с настройками запроса, включая ключ и функцию получения данных.
   */
  list: (page: number, limit: number) =>
    queryOptions({
      queryKey: [...stockQueries.lists(), page, limit],
      queryFn: () => getStocks(page, limit),
      placeholderData: keepPreviousData,
    }),

  // Примечание: Закомментированные функция получения одного элемента.
  // details: () => [...stockQueries.all(), "detail"],
  // detail: (query?: PostDetailQuery) =>
  //   queryOptions({
  //     queryKey: [...stockQueries.details(), query?.id],
  //     queryFn: () => getDetailStock({ id: query?.id }),
  //     staleTime: 5000,
  //   }),
}
