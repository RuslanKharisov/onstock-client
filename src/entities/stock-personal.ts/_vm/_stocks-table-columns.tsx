"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Stock } from "../../stock/_domain/types"
import { ActionButtons } from "@/shared/ui/action-buttons"

const ActionColumn: Partial<ColumnDef<Stock>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue() as string

    const handleDelete = () => {
      table.options.meta?.deleteData(initialValue)
    }

    return (
      <div className={"flex flex-row gap-x-2 whitespace-nowrap"}>
        <ActionButtons onDelete={handleDelete} />
      </div>
    )
  },
}

export const StockTableColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "sku",
    header: "Артикул",
    cell: ({ row }) => <i>{row.getValue("sku")}</i>,
  },
  {
    accessorKey: "name",
    cell: ({ row }) => <i>{row.getValue("name")}</i>,
    header: "Наименование",
  },
  {
    accessorKey: "description",
    cell: ({ row }) => <i>{row.getValue("description")}</i>,
    header: () => "Описание",
  },
  {
    accessorKey: "quantity",
    cell: ({ row }) => <i>{row.getValue("quantity")}</i>,
    header: () => "Количество",
  },
  {
    accessorKey: "supplier",
    cell: ({ row }) => <i>{row.getValue("supplier")}</i>,
    header: () => "Поставщик",
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
