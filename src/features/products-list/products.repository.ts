import { dbClient } from "@/shared/lib/db";
import { cache } from "react";
class ProductsRepository {
  async getProductsList(): Promise<ProductListElement[]> {
    // Получаем соединение из пула
    const connection = await dbClient.$connect();
    try {
      // Выполняем запрос к базе данных
      const products = await dbClient.product.findMany();
      return products;
    } finally {
      // Закрываем соединение после использования
      await dbClient.$disconnect();
    }
  }

  async getStockList(): Promise<StockListElementWithRelations[]> {
    // Получаем соединение из пула
    const connection = await dbClient.$connect();
    try {
      // Выполняем запрос к базе данных
      const stocks = await dbClient.stock.findMany({
        include: {
            product: true,
            supplier: true,
            }
        });
      return stocks;
    } finally {
      // Закрываем соединение после использования
      await dbClient.$disconnect();
    }
  }

  async getStockListById(params): Promise<StockListElementWithRelations[]> {
    console.log("🚀 ~ ProductsRepository ~ getStockListById ~ id:", params.id)

    const supplier = await dbClient.supplier.findUnique({
        where: {
            userId: params.id,
        },
      });

    // Получаем соединение из пула
    const connection = await dbClient.$connect();
    try {
      // Выполняем запрос к базе данных
      const stocks = await dbClient.stock.findMany({
        where: {
            supplierId: supplier?.id,
        },
        include: {
            product: true,
            supplier: true,
            }
        });
      return stocks;
    } finally {
      // Закрываем соединение после использования
      await dbClient.$disconnect();
    }
  }

  addOrUpdateProduct = async (command: addOrUpdateProductCommand) => {
    const { sku, name, description, quantity, supplierId, email } = command;

    try {
      // получение продукта по sku
      const existingProduct = await dbClient.product.findUnique({
        where: {
          sku: command.sku,
        },
      });
      // получение склада по id поставщика
      const isProductExistInSupplierStock = await dbClient.stock.findFirst({
        where: {
          productId: existingProduct?.id,
          supplierId: command.supplierId,
        },
      });
      // если товар в базе данных существует
      if (existingProduct) {
        console.log("🚀 existingProduct:", existingProduct);
        console.log(
          "🚀 isProductExistInSupplierStock:",
          isProductExistInSupplierStock,
        );
        console.log("🚀 command.supplierId:", command.supplierId);
        if (isProductExistInSupplierStock?.id) {
          console.log("товар найден у поствщика, обновляем количество");
          await dbClient.stock.update({
            where: {
              id: isProductExistInSupplierStock.id,
              productId: existingProduct?.id,
            },
            data: {
              quantity: command.quantity,
            },
          });
        } else {
          await dbClient.stock.create({
            data: {
                productId: existingProduct.id,
                supplierId: command.supplierId,
                quantity: command.quantity,
              },
          });
        }
      } else {
        // Если продукт не существует, создаем новый продукт
        console.log("🚀 ~ ProductsRepository ~ Если продукт не существует:");
        const newProduct = await dbClient.product.create({
          data: {
            sku: command.sku,
            name: command.name,
            description: command.description,
            Stock: {
              create: {
                quantity: command.quantity,
                supplier: {
                  connect: { id: command.supplierId },
                },
              },
            },
          },
          include: {
            Stock: true,
          },
        });
      }
    } catch (error) {
      console.error("Error creating or updating product:", error);
    } finally {
      await dbClient.$disconnect();
    }
  };

  deleteProductElement = async (
    command: DeleteProductListElementCommand,
  ): Promise<void> => {
    try {
      await dbClient.product.delete({
        where: { id: command.id },
      });
    } catch (error) {
      throw new Error(`Failed to delete product: ${error}`);
    } finally {
      await dbClient.$disconnect();
    }
  };
}

export const productsRepository = new ProductsRepository();
