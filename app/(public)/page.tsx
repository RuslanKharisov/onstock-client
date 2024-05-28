
import { productsRepository } from "@/features/products-list/products.repository";
import { MyStock } from "@/widgets/my-stock/my-stock";

export default async function Home() {
  const stockProducts = await productsRepository.getStockList();
  return (
    <main className="container flex min-h-screen flex-col  p-8">
      <MyStock variant="public" stockList={stockProducts} />
    </main>
  );
}
