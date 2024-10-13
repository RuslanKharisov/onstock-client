// import { dbClient } from "@/shared/lib/db"
// import { cache } from "react"
// class ProductsRepository {



//   async getSupplierId(id: string) {
//     // const connection = await dbClient.$connect();
//     try {
//       const supplier = await dbClient.supplier.findUnique({
//         where: {
//           userId: id,
//         },
//       })

//       return supplier || null
//     } catch {
//       return null
//     } finally {
//       await dbClient.$disconnect()
//     }
//   }

//   async getProductsList() {
//     // const connection = await dbClient.$connect();
//     try {
//       const products = await dbClient.product.findMany()
//       return products
//     } catch {
//       return []
//     } finally {
//       await dbClient.$disconnect()
//     }
//   }

//   async getStockList() {
//     // const connection = await dbClient.$connect();
//     try {
//       const stocks = await dbClient.stock.findMany({
//         include: {
//           product: true,
//           supplier: true,
//         },
//       })
//       return stocks
//     } catch {
//       return []
//     } finally {
//       await dbClient.$disconnect()
//     }
//   }

//   async getStockListById(id: string) {
//     // поиск поставщика по id
//     const supplier = await dbClient.supplier.findUnique({
//       where: {
//         userId: id,
//       },
//     })
//     // если найден, выгружаем его склад
//     if (supplier) {
//       try {
//         const stocks = await dbClient.stock.findMany({
//           where: {
//             supplierId: supplier?.id,
//           },
//           include: {
//             product: true,
//             supplier: true,
//           },
//         })
//         return stocks
//       } finally {
//         await dbClient.$disconnect()
//       }
//     } else {
//       return []
//     }
//   }

 

//   addOrUpdateProduct = async (command: addOrUpdateProductCommand) => {
//     console.log("🚀 ~ ProductsRepository ~ addOrUpdateProduct= ~ command:", command)
//     try {
//       // Получаем поставщика и его тариф
//       const supplier = await dbClient.supplier.findUnique({
//         where: { id: Number(command.supplierId) },
//         include: { tariff: true, subscriptions: true },
//       })
//       console.log("🚀 ~ ProductsRepository ~ addOrUpdateProduct= ~ supplier:", supplier)

//       if (!supplier) {
//         return { error: "Поставщик не найден" }
//       }


//       const currentSubscription = supplier.subscriptions.find(
//         (subscription) => {
//           const now = new Date()
//           return subscription.startDate <= now && subscription.endDate >= now
//         },
//       )

//       if (!currentSubscription) {
//         return { error: "Нет активной подписки" } 
//       }

//       // Проверяем лимит уникальных SKU в зависимости от тарифа
//       const currentProductsCount = await dbClient.stock.count({
//         where: { supplierId: Number(command.supplierId) },
//       })

//       if (supplier.tariff && currentProductsCount >= supplier.tariff.maxProducts) {
//         return { error: `Достигнут лимит в ${supplier.tariff?.maxProducts} уникальных товаров для этого тарифа` }
//       }

//       // получение продукта по sku
//       const existingProduct = await dbClient.product.findUnique({
//         where: {
//           sku: command.sku,
//         },
//       })
//       // получение склада по id поставщика
//       const isProductExistInSupplierStock = await dbClient.stock.findFirst({
//         where: {
//           productId: existingProduct?.id,
//           supplierId: Number(command.supplierId),
//         },
//       })
//       // если товар в базе данных существует
//       if (existingProduct) {
//         if (isProductExistInSupplierStock?.id) {
//           await dbClient.stock.update({
//             where: {
//               id: isProductExistInSupplierStock.id,
//               // productId: existingProduct?.id,
//             },
//             data: {
//               quantity: Number(command.quantity),
//             },
//           })
//         } else {
//           await dbClient.stock.create({
//             data: {
//               productId: existingProduct.id,
//               supplierId: Number(command.supplierId),
//               quantity: Number(command.quantity),
//             },
//           })
//         }
//       } else {
//         // Если продукт не существует, создаем новый продукт
//         const newProduct = await dbClient.product.create({
//           data: {
//             sku: command.sku,
//             name: command.name,
//             description: command.description,
//             Stock: {
//               create: {
//                 quantity: Number(command.quantity),
//                 supplier: {
//                   connect: { id: Number(command.supplierId) },
//                 },
//               },
//             },
//           },
//           include: {
//             Stock: true,
//           },
//         })
//       }
//       return { success: "Продукты успешно добавлены или обновлены" };
//     } catch (error) {
//     return { error: 'Неизвестная ошибка'};
//     }
//   }

//   deleteStockElement = async (stockId: string): Promise<void> => {
//     try {
//       await dbClient.stock.delete({
//         where: { id: stockId },
//       })
//     } catch (error) {
//       throw new Error(`Failed to delete product: ${error}`)
//     } finally {
//       await dbClient.$disconnect()
//     }
//   }

//   deleteProductElement = async (
//     command: DeleteProductListElementCommand,
//   ): Promise<void> => {
//     try {
//       console.log('deleting')
//       await dbClient.product.delete({
//         where: { id: command.id },
//       })
//     } catch (error) {
//       throw new Error(`Failed to delete product: ${error}`)
//     } finally {
//       await dbClient.$disconnect()
//     }
//   }
// }

// export const productsRepository = new ProductsRepository()
