import { Table } from "@/shared/ui/table";
import { StockTable } from "@/widgets/stock-table/stock-table";


export default async function Home() {
  return (
    <main className="container flex min-h-screen flex-col  p-8">
      <h1 className="text-3xl mb-2">Продукция в ниличии на складах РФ</h1>
      <StockTable/>
    </main>
  );
}