import { CreateProductForm } from "@/features/products-list/pub/create-product-form";
import { ProductList } from "@/features/products-list/pub/product-list";

import { StockTable } from "@/widgets/stock-table/stock-table";
import { ApdateStock } from "@/widgets/update-stock/update-stock";

export default function PersonalStock() {
    return (
        <div className="container py-10">
            PersonalStock
            <CreateProductForm
        revalidatePagePath="/"
        className="max-w-[500px] mb-10"
      />
      <ProductList revalidatePagePath="/" />
        </div>
    );
}
