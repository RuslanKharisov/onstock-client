"use client"

import { useEffect, useMemo, useState } from "react"
import { StockTableColumns } from "@/entities/stock-personal.ts/_vm/_stocks-table-columns"
import { personalStockQueries } from "@/entities/stock-personal.ts/api/personal-stock.queries"
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array"
import { useQuery } from "@tanstack/react-query"
import { DataTable, usePagination } from "@/widgets/smart-data-table"
import { ColumnFiltersState } from "@tanstack/react-table"

/**
 * Компонент для отображения списка продукции на складе пользователя.
 *
 * Этот компонент загружает данные о продукции на складе пользователя и отображает их в виде таблицы.
 * Он также предоставляет возможность удаления продукции со склада.
 *
 * @param {Object} props - Свойства компонента.
 * @param {string} props.userId - Идентификатор пользователя, чья продукция будет отображена.
 * @param {string} props.accessToken - Токен доступа для аутентификации запросов к API.
 *
 * @returns {JSX.Element} Компонент списка продукции на складе.
 */
function StockList({
  userId,
  accessToken,
}: {
  userId: string
  accessToken: string
}): JSX.Element {
  // Состояние для хранения списка продукции на складе
  const [stocks, setStocks] = useState<any[]>([])

  // Состояние для хранения общего количества продукции на складе
  const [count, setCount] = useState(0)

  // Хук для управления пагинацией
  const { onPaginationChange, pagination } = usePagination()
  const [filters, setFilters] = useState<ColumnFiltersState>([])

  // Запрос для получения списка продукции на складе пользователя
  const { data, error, isLoading, isError } = useQuery(
    personalStockQueries.list(
      userId,
      accessToken,
      pagination.pageIndex + 1,
      pagination.pageSize,
      filters
    ),
  )

  // Мутация для удаления продукции со склада
  const deleteMutation = personalStockQueries.remove(accessToken)

  /**
   * Обработчик удаления продукции по идентификатору.
   *
   * @param {string} id - Идентификатор продукции, которую нужно удалить со склада.
   */
  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id)
  }

  // Эффект для обновления состояния продукции на складе при получении новых данных
  useEffect(() => {
    if (data) {
      setStocks(data.data)
      setCount(data.meta.total)
    }
  }, [data])

  const handleFilterChange = (newFilters: ColumnFiltersState) => {
    setFilters(newFilters)
    onPaginationChange({ pageIndex: 0, pageSize: pagination.pageSize }) // сброс пагинации при фильтрации
  }

  // Преобразование продукции на складе в нужный формат для отображения в таблице
  const stockArray = useMemo(() => convertToStockArray(stocks), [stocks])

  return (
    <DataTable
      columns={StockTableColumns}
      data={stockArray}
      loading={isLoading}
      onPaginationChange={onPaginationChange}
      pagination={pagination}
      rowCount={count}
      manualPagination={true}
      handleDelete={handleDelete}
      onFilteringChange={handleFilterChange}
    />
  )
}

export { StockList }
