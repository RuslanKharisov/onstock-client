
import { productsRepository } from "@/features/products-list/products.repository";
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table";

export default async function Home() {
  const stockProducts = await productsRepository.getStockList();
  return (
    <main className="container min-h-screen px-8">
        <h1 className=" text-center text-3xl my-10">Онлайн склад</h1>
      <SmartDataTable stockList={stockProducts}/>

    </main>
  );
}
