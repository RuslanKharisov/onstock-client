import { productsRepository } from "@/features/products-list/products.repository";
import { CreateProductForm } from "@/features/products-list/pub/create-product-form";
import { ProductList } from "@/features/products-list/pub/product-list";
import { MyStock } from "@/widgets/my-stock/my-stock";
import { ApdateStock } from "@/widgets/update-stock/update-stock";
import { string } from "zod";

export default async function PersonalStock({ params }: { params: { id: string } }) {
    const stockProducts = await productsRepository.getStockListById(params);
    const supplier = await productsRepository.getSupplierId(params);    
  return (
    <div className="container py-10">
      { supplier && <ApdateStock supplier={supplier}/> }
      { supplier && <CreateProductForm revalidatePagePath="/personal-stock/" className="w-1/2 my-10" supplier={supplier} /> }
      <MyStock variant={"auth"} stockList={stockProducts}/>
    </div>
  );
}
