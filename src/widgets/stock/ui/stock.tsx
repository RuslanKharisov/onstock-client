"use client"

import { useEffect, useMemo, useState } from "react"
import { StockTableColumns } from "@/entities/stock-personal.ts/_vm/_stocks-table-columns"
import {
  useGetPersonalStock,
  useRemovePersonalStockElement,
} from "@/entities/stock-personal.ts/api/personal-stock.queries"
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array"
import { DataTable, usePagination } from "@/widgets/smart-data-table"
import { ColumnFiltersState } from "@tanstack/react-table"

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

  const { data: personalStock, isLoading } = useGetPersonalStock({
    userId: userId,
    accessToken: accessToken,
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
    filters: filters,
  })

  // Мутация для удаления продукции со склада
  const { mutate: removeStockElement } =
    useRemovePersonalStockElement(accessToken)

  const handleDelete = async (id: string) => {
    removeStockElement(id)
  }

  // Эффект для обновления состояния продукции на складе при получении новых данных
  useEffect(() => {
    if (personalStock) {
      setStocks(personalStock.data)
      setCount(personalStock.meta.total)
    }
  }, [personalStock])

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
