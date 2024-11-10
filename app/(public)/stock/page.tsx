"use client"

import { useEffect, useMemo, useState } from "react"
import { ProductsTableColumns } from "@/entities/producrts-list/_vm/_products-table-columns"
import { getStocks } from "@/entities/stock/api/get-stocks"
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array"
import { Stock } from "@/entities/stock/_domain/types";
import { useQuery } from '@tanstack/react-query';
import {
  DataTable,
  SmartDataTable,
  usePagination,
  useSorting,
} from "@/widgets/smart-data-table"

export default function StockPage() {
  const [stocks, setStocks] = useState<any[]>([])
  const [count, setCount] = useState(0)

  // Хуки для пагинации и сортировки
  const { onPaginationChange, pagination } = usePagination()
  const { sortBy, onSortingChange } = useSorting()
  
  // Получение данных с сервера
  // const fetchStocks = (page: number, perPage: number, sortBy?: string) => {
  //   return getStocks(pagination.pageIndex, pagination.pageSize, sortBy);
  // };

  const { isPending, error, data } = useQuery({
    queryKey: ['stocks', pagination.pageIndex + 1, pagination.pageSize, sortBy],
    queryFn: () => getStocks(pagination.pageIndex + 1, pagination.pageSize, sortBy),
  });

  useEffect(() => {
    if (data) {
      setStocks(data.data); 
      setCount(data.meta.total);
    }
  }, [data]);

  const stockArray = useMemo(() => convertToStockArray(stocks), [stocks]);

  return (
    <main className="container py-8">
      <h1 className="text-center">Промышленный склад России онлайн</h1>

      <DataTable
        columns={ProductsTableColumns}
        data={stockArray}
        loading={isPending}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
        rowCount={count}
        manualPagination = {true}
      />
    </main>
  )
}
