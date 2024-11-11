"use client"

import { StockTableColumns } from "@/entities/stock/_vm/_stocks-table-columns";
import { getStock } from "@/entities/stock/api/stock.queries";
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array";
import { queryClient } from "@/shared/api/query-client";
import { deleteStockElement } from "@/shared/api/stock";
import { DataTable, usePagination } from "@/widgets/smart-data-table";
import { useMutation, useQuery } from "@tanstack/react-query";
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

  const { isPending, error, data, refetch  } = useQuery({
    queryKey: ['stock', userId, accessToken, pagination.pageIndex + 1, pagination.pageSize],
    queryFn: () => getStock(userId, accessToken , pagination.pageIndex + 1, pagination.pageSize),
    staleTime: 0,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStockElement(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['stock', userId, accessToken]});
    },
  });

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
    refetch();
  }

  useEffect(() => {
    if (data) {
      setStocks(data.data); 
      setCount(data.meta.total);
    }
  }, [data]);

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
        handleDelete = {handleDelete}
      />
  );
}

export {StockList}