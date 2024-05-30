"use client";

import { Button } from "@/shared/ui/button";
import { TableCell, TableRow } from "@/shared/ui/table";

export default function StockItem({
  product,
}: {
  product: StockListElementWithRelations;
}) {
  return (
    <TableRow className="border-b">
      <TableCell className="px-1" data-title="Sku:">
        {product.product.sku}
      </TableCell>
      <TableCell data-title="Наименование:">{product.product.name}</TableCell>
      <TableCell data-title="Описание:">
        {product.product.description}
      </TableCell>
      <TableCell data-title="Поставщик:">{product.supplier.name}</TableCell>
      <TableCell data-title="Количество:">{product.quantity}</TableCell>
      <TableCell className="px-2">
        <Button
          variant="default"
          className="text-xs"
          onClick={() => console.log("запросить ТКП на:", product.product.sku)}
        >
          Отправить запрос
        </Button>
      </TableCell>
    </TableRow>
  );
}
