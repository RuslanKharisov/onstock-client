"use client"

import { Input } from "@/shared/ui/input"
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/shared/ui/table"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  OnChangeFn,
  RowData,
  Updater,
} from "@tanstack/react-table"
import React, { useEffect } from "react"
import { DataTablePagination } from "./DataTablePagination"
import { PaginationState } from "../model/pagination-state"
import { Spinner } from "@/shared/ui/spinner"
import { Search } from "lucide-react"
import { Button } from "@/shared/ui/button"

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteData: (id: string) => void
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading: boolean
  rowCount: number
  pagination: PaginationState
  manualPagination?: boolean
  onPaginationChange?: OnChangeFn<PaginationState>
  onFilteringChange?: (newFilters: ColumnFiltersState) => void
  handleDelete: (id: string) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  rowCount,
  pagination,
  manualPagination: manualPagination,
  onPaginationChange,
  onFilteringChange,
  handleDelete,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const applyFilter = () => {
    if (onFilteringChange) {
      onFilteringChange(columnFilters)
    }
  }

  const table = useReactTable({
    columns,
    data,
    manualPagination: manualPagination,
    manualFiltering: true,
    pageCount: manualPagination
      ? Math.ceil(rowCount / pagination.pageSize)
      : undefined,
    state: { pagination, columnFilters },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      deleteData: (id: string) => {
        handleDelete(id)
      },
    },
    onPaginationChange,
    onColumnFiltersChange: setColumnFilters,
  })

  return (
    <div className="mx-auto w-full">
      <div className="my-5 flex flex-col items-center justify-center gap-5 py-4 lg:flex-row">
        <Button
          onClick={() => applyFilter()}
          className="rounded"
          title="Применить фильтр"
        >
          <Search size={16} />
        </Button>
        <Input
          name="sku"
          placeholder="Искать по артикулу ..."
          value={(table.getColumn("sku")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("sku")?.setFilterValue(event.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter"){applyFilter()}}}
          className="max-w-sm border-2"
        />
        <Input
          name="description"
          placeholder="Искать в описании ..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter"){applyFilter()}}}
          className="max-w-sm border-2"
        />
      </div>
      <DataTablePagination table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row
                    ?.getVisibleCells()
                    .map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="- h-24 text-center text-2xl font-bold"
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <Spinner />
                    </div>
                  ) : (
                    "Ничего не найдено!"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
