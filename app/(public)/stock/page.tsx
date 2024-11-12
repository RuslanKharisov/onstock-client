"use client"

import { useEffect, useMemo, useState } from "react"
import { ProductsTableColumns } from "@/entities/stock/_vm/_products-table-columns"
import { stockQueries } from "@/entities/stock/api/stock.queries"
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array"
import { useQuery } from "@tanstack/react-query"
import {
  DataTable,
  usePagination,
  useSorting,
} from "@/widgets/smart-data-table"

export default function StockPage() {
  const [stocks, setStocks] = useState<any[]>([])
  const [count, setCount] = useState(0)

  // Хуки для пагинации и сортировки
  const { onPaginationChange, pagination } = usePagination()
  const { sortBy, onSortingChange } = useSorting()

  const { data, error, isLoading, isError } = useQuery(
    stockQueries.list(pagination.pageIndex + 1, pagination.pageSize),
  )

  useEffect(() => {
    if (data) {
      setStocks(data.data)
      setCount(data.meta.total)
    }
  }, [data])

  const stockArray = useMemo(() => convertToStockArray(stocks), [stocks])

  return (
    <main className="container py-8">
      <h1 className="text-center">Промышленный склад России онлайн</h1>

      <DataTable
        columns={ProductsTableColumns}
        data={stockArray}
        loading={isLoading}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
        rowCount={count}
        manualPagination={true}
      />
    </main>
  )
}
