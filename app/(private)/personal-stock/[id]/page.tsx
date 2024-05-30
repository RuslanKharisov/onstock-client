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
    <div className="container mx-auto ">
        <section className="py-8">
          { supplier && <ApdateStock supplier={supplier} revalidatePagePath="/personal-stock/"/> }
        </section>
      {/* { supplier && <CreateProductForm revalidatePagePath="/personal-stock/" className="w-1/2 my-10" supplier={supplier} /> } */}
      <section className="py-8">
        <MyStock variant={"auth"} stockList={stockProducts}/>
      </section>
    </div>
  );
}
