"use client"
 
import { Actions } from "@/features/stock/ui/Actions"
import { Button } from "@/shared/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const StockTableColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "sku",
    header: "Артикул",
    cell: ({row}) => <i>{row.getValue("sku")}</i>,
  },
  {
    accessorKey: "name",
    cell: ({row}) => <i>{row.getValue("name")}</i>,
    header: "Наименование",
  },
  {
    accessorKey: "description",
    cell: ({row}) => <i>{row.getValue("description")}</i>,
    header: () => "Описание",
  },
  {
    accessorKey: "quantity",
    cell: ({row}) => <i>{row.getValue("quantity")}</i>,
    header: () => "Количество",
  },
  {
    accessorKey: "supplier",
    cell: ({row}) => <i>{row.getValue("supplier")}</i>,
    header: () => "Поставщик",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const stock = row.original
 
      return ( 
        <Actions id={stock.id} />
      )
    },
  },
]