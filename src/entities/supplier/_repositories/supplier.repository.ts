// import { UserId } from "@/entities/user/types/types"
// import { dbClient } from "@/shared/lib/db"

// class SupplierRepository {
//   async createSupplier(values: CreateSupplierCmd, userId: string) {
//     try {
//       const defaultTariff = await dbClient.tariff.findUnique({
//         where: { name: "TARIFF_10" },
//       })

//       if (!defaultTariff) {
//         throw new Error("Default tariff non found")
//       }

//       await dbClient.supplier.create({
//         data: {
//           name: values.name,
//           email: values.email,
//           siteUrl: values.siteUrl,
//           userId: userId,
//           tariffId: defaultTariff.id,
//           subscriptions: {
//             create: {
//               tariffId: defaultTariff.id,
//               startDate: new Date(),
//               endDate: new Date(
//                 new Date().setFullYear(new Date().getFullYear() + 1),
//               ), // через год
//             },
//           },
//         },
//       })
//     } catch (error) {
//       console.error("Error creating or updating supplier:", error)
//     }
//   }

//   async deleteSupplierById(suplierId: number) {
//     try {
//       await dbClient.supplier.delete({
//         where: {
//           id: suplierId,
//         },
//       })
//     } catch (error) {
//       throw error
//     }
//   }

//   async getSupplierByUserId(userId: UserId): Promise<Supplier> {
//     try {
//       return await dbClient.supplier.findUnique({
//         where: {
//           userId: userId,
//         },
//       })
//     } catch (error) {
//       throw error
//     }
//   }

//   async updateSupplier(values: Partial<Supplier>, supplierId: number) {
//     return await dbClient.supplier.update({
//       where: { id: supplierId },
//       data: {
//         ...values,
//       },
//     })
//   }

//   async updateSupplierTariff(supplierId: number, newTariffName: string) {
//     // Найти новый тариф
//     const newTariff = await dbClient.tariff.findUnique({
//       where: { name: newTariffName },
//     })

//     if (!newTariff) {
//       throw new Error("New tariff not found")
//     }

//     // Обновление тарифа поставщика и создание новой подписки
//     await dbClient.supplier.update({
//       where: { id: supplierId },
//       data: {
//         tariffId: newTariff.id,
//         subscriptions: {
//           create: {
//             tariffId: newTariff.id,
//             startDate: new Date(),
//             endDate: new Date(
//               new Date().setFullYear(new Date().getFullYear() + 1),
//             ), // 1 год
//           },
//         },
//       },
//     })
//   }
// }

// export const supplierRepository = new SupplierRepository()
