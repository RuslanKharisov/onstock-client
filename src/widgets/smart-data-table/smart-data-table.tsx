"use client"
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array";
import { DataTable } from "./_ui/DataTable";
import { ColumnDef, OnChangeFn } from "@tanstack/react-table";
import { PaginationState } from "./model/types";
import { Stock, StockListElementWithRelations } from "@/entities/stock/_domain/types";
import { usePagination, useSorting } from ".";


export function SmartDataTable({
  stockList,
  columns,
  loading,
  rowCount
}: {
  stockList: StockListElementWithRelations[];
  columns: ColumnDef<Stock>[]
  loading: boolean
  onPaginationChange?: OnChangeFn<PaginationState>
  pagination:PaginationState
  rowCount:number
}) {


  /** Конвертаци многоуровнего объекта в однослойный для передачи в компонент DataTable */
  const stockArray: Stock[] = convertToStockArray(stockList);

  return (
    <DataTable
    columns={columns}
    data={stockArray}
    loading={loading}
    onPaginationChange={onPaginationChange}
    pagination={pagination}
    rowCount={rowCount}
    />
  )
}