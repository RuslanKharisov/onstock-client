"use client"

import { useEffect, useMemo, useState } from "react"
import { ProductsTableColumns } from "@/entities/stock/_vm/_products-table-columns"
import { stockQueries } from "@/entities/stock/api/stock.queries"
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array"
import { useQuery } from "@tanstack/react-query"
import {
  DataTable,
  usePagination,
} from "@/widgets/smart-data-table"
import { ColumnFiltersState } from "@tanstack/react-table"

export default function StockPage() {
  const [stocks, setStocks] = useState<any[]>([])
  const [count, setCount] = useState(0)

  // Хуки для пагинации и сортировки
  const { onPaginationChange, pagination } = usePagination()
  const [filters, setFilters] = useState<ColumnFiltersState>([])
  const { data, isLoading } = useQuery(
    stockQueries.list({
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      filters,
    }),
  )
  
  useEffect(() => {
    if (data) {
      setStocks(data.data)
      setCount(data.meta.total)
    }
  }, [data])
    
  const handleFilterChange = (newFilters: ColumnFiltersState) => {
    setFilters(newFilters)
    onPaginationChange({ pageIndex: 0, pageSize: pagination.pageSize })
  }
  
  const stockArray = useMemo(() => convertToStockArray(stocks), [stocks])
  const handleDelete = () => null

  return (
    <main className="container py-1 px-3">

      <DataTable
        columns={ProductsTableColumns}
        data={stockArray}
        loading={isLoading}
        rowCount={count}
        handleDelete={handleDelete}
        manualPagination={true}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        onFilteringChange={handleFilterChange}
      />
    </main>
  )
}
