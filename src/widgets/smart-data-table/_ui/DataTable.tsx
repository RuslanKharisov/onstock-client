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
import { DataTableSearchBar } from "./DataTableSearchBar"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <DataTableSearchBar
        table={table}
        applyFilter={applyFilter}
      />
      {/* <div className="my-5 flex flex-col items-center justify-center gap-5 py-4 sm:flex-row">
        <div className="relative w-full">
          <Input
            className="z-20 block w-full rounded-lg border border-s-2 border-gray-300 bg-gray-50  p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
            name="sku"
            placeholder="Искать по артикулу ..."
            value={(table.getColumn("sku")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("sku")?.setFilterValue(event.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilter()
              }
            }}
          />
          <Button
            className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => applyFilter()}
            variant="ghost"
            title="Применить фильтр"
          >
            <Search size={16} />
          </Button>
        </div>

        <div className="relative w-full">
          <Input
            className="z-20 block w-full rounded-lg border border-s-2 border-gray-300 bg-gray-50  p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
            name="description"
            placeholder="Искать в описании ..."
            value={
              (table.getColumn("description")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("description")?.setFilterValue(event.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilter()
              }
            }}
          />
          <Button
            className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => applyFilter()}
            variant="ghost"
            title="Применить фильтр"
          >
            <Search size={16} />
          </Button>
        </div>
      </div> */}
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
