import { dbClient } from "@/shared/lib/db";
import { cache } from "react";
class ProductsRepository {

    async getSupplierId(params: { id: string }): Promise<getSupplier | null> {
        // const connection = await dbClient.$connect();
        try {
            const supplier = await dbClient.supplier.findUnique({
                where: {
                    userId: params.id,
                },
            });

            return supplier || null;
        } catch{
          return null;
        }finally {
            await dbClient.$disconnect();
        }
    }

    async getProductsList(): Promise<ProductListElement[]> {
        // const connection = await dbClient.$connect();
        try {
            const products = await dbClient.product.findMany();
            return products;
        } catch{
          return [];
        }finally {
            await dbClient.$disconnect();
        }
    }

    async getStockList(): Promise<StockListElementWithRelations[]> {
        // const connection = await dbClient.$connect();
        try {
            const stocks = await dbClient.stock.findMany({
                include: {
                    product: true,
                    supplier: true,
                }
            });
            return stocks;
        } catch{
          return [];
        } finally {
            await dbClient.$disconnect();
        }
    }

    async getStockListById(params: { id: string }): Promise<StockListElementWithRelations[]> {
        const supplier = await dbClient.supplier.findUnique({
            where: {
                userId: params.id,
            },
        });
        // const connection = await dbClient.$connect();
        try {
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
            await dbClient.$disconnect();
        }
    }

    addOrUpdateProduct = async (command: addOrUpdateProductCommand) => {
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
                    supplierId: Number(command.supplierId),
                },
            });
            // если товар в базе данных существует
            if (existingProduct) {
                if (isProductExistInSupplierStock?.id) {
                    console.log("Товар найден у поствщика, обновляем количество");
                    await dbClient.stock.update({
                        where: {
                            id: isProductExistInSupplierStock.id,
                            productId: existingProduct?.id,
                        },
                        data: {
                            quantity: Number(command.quantity),
                        },
                    });
                } else {
                    await dbClient.stock.create({
                        data: {
                            productId: existingProduct.id,
                            supplierId: Number(command.supplierId),
                            quantity: Number(command.quantity),
                        },
                    });
                }
            } else {
                // Если продукт не существует, создаем новый продукт
                console.log("🚀 ~ ProductsRepository ~Продукт не существует, создаем новый продукт:");
                const newProduct = await dbClient.product.create({
                    data: {
                        sku: command.sku,
                        name: command.name,
                        description: command.description,
                        Stock: {
                            create: {
                                quantity: Number(command.quantity),
                                supplier: {
                                    connect: { id: Number(command.supplierId) },
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

    deleteStockElement = async (
      stockId: string,
    ):Promise<void> => {
        try {
            await dbClient.stock.delete({
                where: { id: stockId },
            })
        } catch (error) {
          throw new Error(`Failed to delete product: ${error}`);
        } finally {
          await dbClient.$disconnect();
      }
    }

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
