import { CreateProductForm } from "@/features/products-list/pub/create-product-form";
import { ProductList } from "@/features/products-list/pub/product-list";
import { dbClient } from "@/shared/lib/db";
import { CursorTracker } from "@/shared/ui/coursor-tracker";
import { ScrollTracker } from "@/shared/ui/scroll-tracker";
import { TailwindAnimation } from "@/shared/ui/tailwind-animation";
import { StockTable } from "@/widgets/stock-table/stock-table";

export default async function Home() {
    console.log(ProductList)
  const products = await dbClient.product.findMany();
  const opasity = 0.1;
  return (
    <main className="container flex min-h-screen flex-col  p-8">
      {/* <CursorTracker /> */}
      <StockTable />
      {/* <ScrollTracker /> */}
      
    </main>
  );
}
