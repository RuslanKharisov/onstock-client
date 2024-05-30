import StockItem from "./stock-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export async function StockList({
  stockList,
}: {
  stockList : StockListElementWithRelations [];
}) {

    


  return (
    <Table className="">
      <TableHeader className="">
        <TableRow>
          <TableHead className="w-[160px]">Sku</TableHead>
          <TableHead>Наименование</TableHead>
          <TableHead>Описание</TableHead>
          <TableHead>Поставщик</TableHead>
          <TableHead>Количество</TableHead>
          <TableHead> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stockList?.map((product, index) => (
          <StockItem key={product.id} product={product} />
        ))}
      </TableBody>
      <tfoot></tfoot>
    </Table>
  );
}
