import { CreateProductForm } from "@/features/products-list/pub/create-product-form";
import { ProductsList } from "@/features/products-list/pub/product-list";

export default function PersonalStock() {
    return (
        <div className="container py-10">
            PersonalStock
            <CreateProductForm
        revalidatePagePath="/"
        className="max-w-[500px] mb-10"
      />
      <ProductsList revalidatePagePath="/" />
        </div>
    );
}