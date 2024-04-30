import { dbClient } from "@/shared/lib/db";
import { cache } from "react";
class ProductsRepository {
  getProductsList = cache(
    (): Promise<ProductListElement[]> => dbClient.product.findMany(),
  );

  createProductElement = (
    command: CreateProductListElementCommand,
  ): Promise<ProductListElement> => {
    return dbClient.product.create({
      data: command,
    });
  };
  deleteProductElement = (command: DeleteProductListElementCommand) => {
    return dbClient.product.delete({
      where: { id: command.id },
    });
  };
}

export const productsRepository = new ProductsRepository();