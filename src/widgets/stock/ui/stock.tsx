"use client"

import { ProductsTableColumns } from "@/entities/producrts-list/_vm/_products-table-columns";
import { StockTableColumns } from "@/entities/stock/_vm/_stocks-table-columns";
import { getStock } from "@/entities/stock/api/stock.queries";
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array";
import { DataTable, usePagination } from "@/widgets/smart-data-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

function StockList({
  userId,
  accessToken
}: {
  userId:string
  accessToken: string
}) {
  const [stocks, setStocks] = useState<any[]>([])
  const [count, setCount] = useState(0)

  const { onPaginationChange, pagination } = usePagination()
  console.log("🚀 ~ pagination:", pagination)

  const { isPending, error, data } = useQuery({
    queryKey: ['stock', userId, accessToken, , pagination.pageIndex + 1, pagination.pageSize],
    queryFn: () => getStock(userId, accessToken , pagination.pageIndex + 1, pagination.pageSize),
    staleTime: 0,
  });

  useEffect(() => {
    if (data) {
      setStocks(data.data); 
      setCount(data.meta.total);
    }
  }, [data]);
  
  console.log("🚀 ~ data:", data)

  const stockArray = useMemo(() => convertToStockArray(stocks), [stocks]);

  return (
    <DataTable
        columns={StockTableColumns}
        data={stockArray}
        loading={isPending}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
        rowCount={count}
        manualPagination = {true}
      />
  );
}

export {StockList}