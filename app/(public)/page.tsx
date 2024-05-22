import { StockList } from "@/features/products-list/pub/stock-list";
import { dbClient } from "@/shared/lib/db";

export default async function Home() {
  const products = await dbClient.product.findMany();
  const opasity = 0.1;
  return (
    <main className="container flex min-h-screen flex-col  p-8">
      <StockList revalidatePagePath="/" />
    </main>
  );
}
