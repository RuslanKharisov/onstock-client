import { revalidatePath} from "next/cache";
import { productsRepository } from "../products.repository";
import StockItem from "../ui/stock-item";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

export async function StockList({
    revalidatePagePath ,
}: {
    revalidatePagePath : string;
}) {
    const stockList = await productsRepository.getStockList();

  return (
    <Table className="">
          <TableHeader className="">
            <TableRow>
              <TableHead >Sku</TableHead >
              <TableHead >Наименование</TableHead >
              <TableHead >Описание</TableHead >
              <TableHead >Поставщик</TableHead >
              <TableHead >Количество</TableHead >
              <TableHead > </TableHead >
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockList.map((product, index) => (
              <StockItem
                key={product.id}
                product={product}
              />
            ))}
          </TableBody>
          <tfoot></tfoot>
        </Table>
  )
}
