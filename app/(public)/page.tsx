
import { productsRepository } from "@/features/products-list/products.repository";
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table";

export default async function Home() {
  const stockProducts = await productsRepository.getStockList();
  return (
    <main className="container min-h-screen py-10">
      <h1 className=" text-center text-3xl mb-8">Онлайн склад</h1>
      <SmartDataTable stockList={stockProducts} variant="public" />
    </main>
  );
}
