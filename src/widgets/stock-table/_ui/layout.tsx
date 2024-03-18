"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export const data: ProductInStock[] = [
  {
    id: "1",
    sku: "6ES7214-1AG40-0XB0",
    name: "SIMATIC S7 CPU 1212C DC/DC/DC",
    description:
      "SIMATIC S7-1200, КОМПАКТНОЕ ЦПУ CPU 1214C DC/DC/DC, ВСТРОЕННЫЕ ВХОДЫ/ВЫХОДЫ: 14 DI =24 В, 10 DO =24 В, 2 AI =0 - 10 В, БЛОК ПИТАНИЯ: =20.4 - 28.8 В, ПАМЯТЬ ПРОГРАММЫ/ДАННЫХ: 75 КБ",
    qty: 4,
    status: "В наличии",
    supplier: "Сиккрафт",
  },
  {
    id: "2",
    sku: "6ES7214-1AG40-0XB1",
    name: "SIMATIC S7 CPU 1214C DC/DC/DC",
    description:
      "SIMATIC S7-1200, КОМПАКТНОЕ ЦПУ CPU 1212C DC/DC/DC, ВСТРОЕННЫЕ ВХОДЫ/ВЫХОДЫ: 14 DI =24 В, 10 DO =24 В, 2 AI =0 - 10 В, БЛОК ПИТАНИЯ: =20.4 - 28.8 В, ПАМЯТЬ ПРОГРАММЫ/ДАННЫХ: 75 КБ",
    qty: 28,
    status: "В наличии",
    supplier: "Сиккрафт",
  },
  {
    id: "3",
    sku: "6ES7214-1AG40-0XB3",
    name: "SIMATIC S7 CPU 1216C DC/DC/DC",
    description:
      "SIMATIC S7-1200, КОМПАКТНОЕ ЦПУ CPU 1216C DC/DC/DC, ВСТРОЕННЫЕ ВХОДЫ/ВЫХОДЫ: 14 DI =24 В, 10 DO =24 В, 2 AI =0 - 10 В, БЛОК ПИТАНИЯ: =20.4 - 28.8 В, ПАМЯТЬ ПРОГРАММЫ/ДАННЫХ: 75 КБ",
    qty: 0,
    status: "Ожидается",
    supplier: "Сиккрафт",
  },
  {
    id: "4",
    sku: "6ES7714-1AX40-0XB0",
    name: "SIMATIC S7 CPU 1212C DC/DC/DC",
    description:
      "SIMATIC S7-1200, КОМПАКТНОЕ ЦПУ CPU 1214C DC/DC/DC, ВСТРОЕННЫЕ ВХОДЫ/ВЫХОДЫ: 14 DI =24 В, 10 DO =24 В, 2 AI =0 - 10 В, БЛОК ПИТАНИЯ: =20.4 - 28.8 В, ПАМЯТЬ ПРОГРАММЫ/ДАННЫХ: 75 КБ",
    qty: 16,
    status: "В наличии",
    supplier: "Сиккрафт",
  },
  {
    id: "5",
    sku: "6GK89214-1AB70-0YB1",
    name: "SIMATIC S7 CPU 1214C DC/DC/DC",
    description:
      "SIMATIC S7-1200, КОМПАКТНОЕ ЦПУ CPU 1212C DC/DC/DC, ВСТРОЕННЫЕ ВХОДЫ/ВЫХОДЫ: 14 DI =24 В, 10 DO =24 В, 2 AI =0 - 10 В, БЛОК ПИТАНИЯ: =20.4 - 28.8 В, ПАМЯТЬ ПРОГРАММЫ/ДАННЫХ: 75 КБ",
    qty: 45,
    status: "В наличии",
    supplier: "Сиккрафт",
  },
  {
    id: "6",
    sku: "6ES7414-9HF40-0XB3",
    name: "SIMATIC S7 CPU 1216C DC/DC/DC",
    description:
      "SIMATIC S7-1200, КОМПАКТНОЕ ЦПУ CPU 1216C DC/DC/DC, ВСТРОЕННЫЕ ВХОДЫ/ВЫХОДЫ: 14 DI =24 В, 10 DO =24 В, 2 AI =0 - 10 В, БЛОК ПИТАНИЯ: =20.4 - 28.8 В, ПАМЯТЬ ПРОГРАММЫ/ДАННЫХ: 75 КБ",
    qty: 0,
    status: "Ожидается",
    supplier: "Сиккрафт",
  },
];

export type ProductInStock = {
  id: string;
  sku: string;
  name: string;
  description: string;
  qty: number;
  status: "В наличии" | "Ожидается" | "Под заказ";
  supplier: string;
};

export const columns: ColumnDef<ProductInStock>[] = [
  {
    accessorKey: "sku",
    header: "Sku",
    cell: ({ row }) => <div className="capitalize">{row.getValue("sku")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Название
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          "Описание"
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "qty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Количество
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("qty")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Статус
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Поставщик {product.supplier}</DropdownMenuLabel>            
            <DropdownMenuSeparator />
            <DropdownMenuItem>Запросить ТКП</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Искать по номеру sku..."
          value={(table.getColumn("sku")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("sku")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
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
                  className="h-24 text-center"
                >
                  Закончился.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Назад
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Вперед
          </Button>
        </div>
      </div>
    </div>
  );
}
