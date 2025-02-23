"use client"

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
} from "@tanstack/react-table"
import React from "react"
import { DataTablePagination } from "./DataTablePagination"
import { PaginationState } from "../model/pagination-state"
import { Spinner } from "@/shared/ui/spinner"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    deleteData: (id: string) => void
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean // рассмотреть возможность удаления
  rowCount: number
  pagination: PaginationState
  manualPagination?: boolean
  onPaginationChange?: OnChangeFn<PaginationState>
  onFilteringChange?: (newFilters: ColumnFiltersState) => void
  handleDelete: (id: string) => void
  initialFilters?: ColumnFiltersState // Добавляем initialFilters
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  rowCount,
  pagination,
  manualPagination: manualPagination,
  onPaginationChange,
  handleDelete,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    columns,
    data,
    manualPagination: manualPagination,
    manualFiltering: true,
    pageCount: manualPagination
      ? Math.ceil(rowCount / pagination.pageSize)
      : undefined,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      deleteData: (id: string) => {
        handleDelete(id)
      },
    },
    onPaginationChange,
  })

  return (
    <div className="mx-auto w-full">
      <DataTablePagination table={table} totalCount={rowCount} />
      {loading ? (
        <div className="mt-20">
          <Spinner />
        </div>
      ) : (
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
                    className="h-24 text-center text-2xl font-bold"
                  ></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
