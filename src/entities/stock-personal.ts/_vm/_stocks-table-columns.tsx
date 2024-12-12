"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Stock } from "../../stock/_domain/types"
import { ActionButtons } from "@/shared/ui/action-buttons"

const ActionColumn: Partial<ColumnDef<Stock>> = {
  cell: ({ getValue, table }) => {
    const initialValue = getValue() as string

    const handleDelete = () => {
      table.options.meta?.deleteData(initialValue)
    }

    return (
      <div className={"lg:flex flex-row gap-x-2 whitespace-nowrap hidden  "}>
        <ActionButtons onDelete={handleDelete} />
      </div>
    )
  },
}

export const StockTableColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "sku",
    header: "Артикул",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
      <i>{row.getValue("sku")}</i>
    </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Описание",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
        <i>{row.getValue("description")}</i>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Количество",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
        <i>{row.getValue("quantity")}</i>
      </div>
    ),
  },
  {
    accessorKey: "supplier",
    header: "Поставщик",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
        <i>{row.getValue("supplier")}</i>
      </div>
    ),
  },
  {
    id: "action",
    accessorKey: "id",
    enableHiding: false,
    header: () => (
      <div
        className={"text-blackRock block w-full whitespace-nowrap text-center"}
      >
        Action
      </div>
    ),
    ...ActionColumn,
  },
]
