import { productsRepository } from "@/features/products-list/products.repository";
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table";
import { ApdateStock } from "@/widgets/update-stock/update-stock";
import { string } from "zod";

export default async function PersonalStock({ params }: { params: { id: string } }) {
    const stockProducts = await productsRepository.getStockListById(params);
    const supplier = await productsRepository.getSupplierId(params);
  return (
    <main className="container mx-auto ">
        <section className="py-8">
          { supplier && <ApdateStock supplier={supplier} revalidatePagePath="/personal-stock/"/> }
        </section>
      <h1 className=" text-center text-3xl my-8">Склад: {supplier?.name} </h1>
      <section className="py-8">
        <SmartDataTable stockList={stockProducts} variant="private"/>
      </section>
    </main>
  );
}
