"use client"

import { Stock } from "@/entities/stock/_domain/types"
import { Button } from "@/shared/ui/button"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip"
import { ColumnDef } from "@tanstack/react-table"
import { MailPlus } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ProductsTableColumns: ColumnDef<Stock>[] = [
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
    cell: ({ row, column }) => {
      const stock = row.original
      return (
        <div data-title={column.columnDef.header as string} className="">
          <Link
            className="font-semibold text-primary hover:text-destructive"
            href={`/supplier/${stock.supplierId}`}
          >
            {stock.supplier}
          </Link>
        </div>
      )
    },
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
    header: () => "Ссылки",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const stock = row.original
      return (
        <span className="flex gap-1">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  size="icon"
                  onClick={() => navigator.clipboard.writeText(stock.email)}
                >
                  <MailPlus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Скопировать почту</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      )
    },
  },
]
