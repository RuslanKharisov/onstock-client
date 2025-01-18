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
      <div
        className={"flex-row justify-center gap-x-2 whitespace-nowrap lg:flex"}
      >
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
    header: "Кол.",
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
    accessorKey: "manufacturer",
    header: "Вендор",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
        <i>{row.getValue("manufacturer")}</i>
      </div>
    ),
  },
  {
    header: "Скоро",
    id: "delivery",
    enableHiding: false,
    cell: ({ row, column }) => {
      const newDeliveryQty1 = row.original.newDeliveryQty1
      const newDeliveryDate1 = row.original.newDeliveryDate1!
        ? new Date(row.original.newDeliveryDate1).toLocaleDateString("ru-RU")
        : ""
      const newDeliveryQty2 = row.original.newDeliveryQty2
      const newDeliveryDate2 = row.original.newDeliveryDate2!
        ? new Date(row.original.newDeliveryDate2).toLocaleDateString("ru-RU")
        : ""
      return (
        <div
          data-title={column.columnDef.header as string}
          className="flex flex-col md:gap-2 md:text-xs"
        >
          {newDeliveryQty1 > 0 ? (
            <i>
              {newDeliveryQty1} шт. <span>{newDeliveryDate1}</span>
            </i>
          ) : (
            ""
          )}

          {newDeliveryQty2 > 0 ? (
            <i>
              {newDeliveryQty2} шт. <span>{newDeliveryDate2}</span>
            </i>
          ) : (
            ""
          )}
        </div>
      )
    },
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
