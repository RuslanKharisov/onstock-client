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
    header: () => "Ссылки",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const stock = row.original

      // Получаем текущий URL страницы
      const currentUrl = window.location.href

      // Создаем UTM-параметры
      const utmSource = "referral"
      const utmMedium = "partner_site"
      const utmCampaign = ""

      // Формируем новую ссылку с UTM-параметрами
      const utmLink = `${stock.siteUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&referrer=${encodeURIComponent(currentUrl)}`

      return (
        <span className="flex gap-1">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="link">
                  <a target="blank" href={utmLink}>
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
