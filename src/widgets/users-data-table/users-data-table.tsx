import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array"
import { DataTable } from "./_ui/DataTable"
import { StockTableColumns } from "@/entities/stock/_vm/_stocks-table-columns"
import { ProductsTableColumns } from "@/entities/producrts-list/_vm/_products-table-columns"
import { ColumnDef } from "@tanstack/react-table"
import { UserEntity } from "@/entities/user/types/types"

export function UsersDataTable({
  tableData,
  columns,
  variant,
}: {
  tableData: UserEntity[]
  columns: ColumnDef<UserEntity>[]
  variant: "auth" | "private" | "public"
}) {
  const isProfile = variant === "private"

  return <DataTable columns={columns} data={tableData} />
}
