import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

const LightBill = ({ billDetails }: { billDetails: TTariff | undefined }) => {
  if (!billDetails) return null

  const { name } = billDetails

  // Проверяем, есть ли данные
  if (!billDetails || !billDetails.name) return null

  const total = billDetails.pricePerUnit
    ? billDetails.maxProducts * billDetails.pricePerUnit
    : 0

  return (
    <div className="py-5">
      <div className="mb-2 border-2 border-primary"></div>
      <Table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <TableHeader className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <TableRow>
            <TableHead className="px-6 py-3">№ п.п</TableHead>
            <TableHead className="px-6 py-3">Тариф</TableHead>
            <TableHead className="px-6 py-3">
              Лимит униклальных таваров
            </TableHead>
            <TableHead className="px-6 py-3">Цена за единицу, руб.</TableHead>
            <TableHead className="px-6 py-3">Сумма, руб.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b odd:bg-card-foreground/10 even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
            <TableCell data-title="№ п.п" className="bottom-1 px-6 py-4">
              1
            </TableCell>
            <TableCell data-title="Тариф" className="px-6 py-4 text-sm">
              {name}
            </TableCell>
            <TableCell data-title="Лимит" className="px-6 py-4">
              {" "}
              {billDetails.maxProducts} шт.
            </TableCell>
            <TableCell data-title="Цена за единицу, руб." className="px-6 py-4">
              {billDetails.pricePerUnit} руб.
            </TableCell>
            <TableCell data-title="Сумма, руб." className="px-6 py-4">
              {total} руб.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export { LightBill }
