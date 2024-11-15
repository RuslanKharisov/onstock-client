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
import { ArrowUpDown, Earth, MailPlus, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ProductsTableColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "sku",
    header: "Артикул",
    // cell: ({ row }) => <i>{row.getValue("sku")}</i>,
    cell: info => info.getValue(),
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
                <Button size="icon" variant="link">
                  <a target="blank" href={`${stock.siteUrl}`}>
                    <Earth />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Перейти на сайт поставщика</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
