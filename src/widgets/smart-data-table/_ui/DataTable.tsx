"use client"

import { Input } from "@/shared/ui/input"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/shared/ui/table"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    OnChangeFn,
    RowData,
} from "@tanstack/react-table"
import React from "react"
import { DataTablePagination } from "./DataTablePagination"
import { PaginationState } from "../model/types"
import { Spinner } from "@/shared/ui/spinner"

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    deleteData: (id: string) => void;
  }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    loading: boolean
    onPaginationChange?: OnChangeFn<PaginationState> 
    pagination:PaginationState
    rowCount:number
    manualPagination?: boolean
    handleDelete?: (id: string) => void;
}


export function DataTable<TData, TValue>({
    columns,
    data,
    loading,
    onPaginationChange,
    pagination,
    rowCount,
    manualPagination: manualPagination,
    handleDelete
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const table = useReactTable({
        columns,
        data,
        pageCount: manualPagination ? Math.ceil(rowCount / pagination.pageSize) : undefined,
        manualPagination: manualPagination,
        // manualFiltering: true,
        onPaginationChange,
        state : { pagination }, 
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        meta: {
          deleteData: (id: string) => {
            handleDelete(id)
          }
        },
    })

    return (
        <div className="w-full mx-auto">
            <div className="flex gap-5 flex-col lg:flex-row items-center justify-center py-4 my-5">
                <Input
                  name="sku"
                    placeholder="Искать по артикулу ..."
                    value={(table.getColumn("sku")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("sku")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm border-2"
                />
                <Input
                  name="description"
                    placeholder="Искать в описании ..."
                    value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("description")?.setFilterValue(event.target.value)
                    }
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
                                                    header.getContext()
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
                                    {row?.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center h-24 text-2xl font-bold -">
                                   {loading? <div className="flex justify-center"><Spinner/></div>  : "Ничего не найдено!" }
                                </TableCell>
                            </TableRow>
                         )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
