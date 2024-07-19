"use client"

import { Button } from "@/shared/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ProductsTableColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "sku",
    header: "Артикул",
    cell: ({ row }) => <i>{row.getValue("sku")}</i>,
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const stock = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(stock.email)}
            >
              Копировать Email поставщика
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><a target="blank" href={`https://${stock.siteUrl}`}>Перейти на сайт поставщика</a></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
