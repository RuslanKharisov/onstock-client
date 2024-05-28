import { productsRepository } from "@/features/products-list/products.repository";
import { CreateProductForm } from "@/features/products-list/pub/create-product-form";
import { ProductList } from "@/features/products-list/pub/product-list";
import { MyStock } from "@/widgets/my-stock/my-stock";
import { string } from "zod";

export default async function PersonalStock({ params }: { params: { id: string } }) {

    const stockProducts = await productsRepository.getStockListById(params);

    console.log("🚀 ~ PersonalStock ~ id:", params)
    
  return (
    <div className="container py-10">
      <CreateProductForm revalidatePagePath="/personal-stock/" className="w-1/2 my-10" />
      <MyStock variant={"auth"} stockList={stockProducts}/>
    </div>
  );
}
