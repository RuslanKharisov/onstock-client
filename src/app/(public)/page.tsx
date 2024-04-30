import { CreateProductForm } from "@/features/products-list/pub/create-product-form";
import { ProductsList } from "@/features/products-list/pub/products-list";
import { dbClient } from "@/shared/lib/db";
import { StockTable } from "@/widgets/stock-table/stock-table";


export default async function Home() {
    const products = await dbClient.product.findMany();

    console.log("🚀 ~ Home ~ products:", products)
    
  return (
    <main className="container flex min-h-screen flex-col  p-8">
      <CreateProductForm revalidatePagePath="/" className={"w-1/3"} />
      <ProductsList revalidatePagePath="/" />
      <h2 className="text-3xl my-4">Продукция в наличии на складах РФ</h2>
      <StockTable />
    </main>
  );
}
