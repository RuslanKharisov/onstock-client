import { revalidatePath } from "next/cache";
import { productsRepository } from "../products.repository";
import { ProductItem } from "../ui/product-item";

export async function ProductList({
  revalidatePagePath,
}: {
  revalidatePagePath: string;
}) {
  const productsList = await productsRepository.getProductsList();

  const hanldeDeleteAction = async (productId: string) => {
    "use server";

    await productsRepository.deleteProductElement({ id: productId });
    revalidatePath(revalidatePagePath);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
      {productsList.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={hanldeDeleteAction.bind(null, product.id)}
        />
      ))}
    </div>
  );
}