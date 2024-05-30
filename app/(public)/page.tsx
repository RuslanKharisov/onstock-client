
import { productsRepository } from "@/features/products-list/products.repository";
import { Stock } from "@/widgets/stock/stock";

export default async function Home() {
  const stockProducts = await productsRepository.getStockList();
  return (
    <main className="container flex min-h-screen flex-col  p-8">
      <Stock variant="public" stockList={stockProducts} />
    </main>
  );
}
