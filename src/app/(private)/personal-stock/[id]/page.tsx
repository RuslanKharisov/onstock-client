import { StockTable } from "@/widgets/stock-table/stock-table";
import { ApdateStock } from "@/widgets/update-stock/update-stock";

export default function PersonalStock() {
  return (
    <div className="container py-10">
      <h1>Управление складом</h1>
      <div className="my-5">
        <ApdateStock />
      </div>

      <h2>Позиции на складе</h2>
      <StockTable />
    </div>
  );
}
