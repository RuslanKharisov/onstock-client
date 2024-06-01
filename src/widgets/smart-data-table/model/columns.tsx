"use client"
 
import { Button } from "@/shared/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stock = {
  id: string
  sku: string
  name: string
  description: string
  quantity: number
  supplier: string
}
 
export const columns: ColumnDef<Stock>[] = [
  {
    accessorKey: "sku",
    header: "Артикул",
    cell: ({row}) => <i>{row.getValue("sku")}</i>,
  },
  {
    accessorKey: "name",
    cell: ({row}) => <i>{row.getValue("name")}</i>,
    header: "name",
  },
  {
    accessorKey: "description",
    cell: ({row}) => <i>{row.getValue("description")}</i>,
    header: () => "description",
  },
  {
    accessorKey: "quantity",
    cell: ({row}) => <i>{row.getValue("quantity")}</i>,
    header: () => "quantity",
  },
  {
    accessorKey: "supplier",
    cell: ({row}) => <i>{row.getValue("supplier")}</i>,
    header: () => "supplier",
  },
]