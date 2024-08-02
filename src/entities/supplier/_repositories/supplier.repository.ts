import { UserId } from "@/entities/user/_domain/types"
import { dbClient } from "@/shared/lib/db"

class SupplierRepository {
  async createSupplier(values: CreateSupplierCmd, userId: string) {
    try {
      await dbClient.supplier.create({
        data: {
          name: values.name,
          email: values.email,
          siteUrl: values.siteUrl,
          userId: userId,
        },
      })
    } catch (error) {
      console.error("Error creating or updating supplier:", error)
    }
  }

  async deleteSupplierById(suplierId: number) {
    try {
      await dbClient.supplier.delete({
        where: {
          id: suplierId,
        },
      })
    } catch (error) {
      throw error
    }
  }

  async getSupplierByUserId(userId: UserId):Promise <Supplier> {
    try {
      return await dbClient.supplier.findUnique({
        where: {
          userId: userId,
        },
      })
    } catch (error) {
      throw error
    }
  }

  async updateSupplier(values: Partial<Supplier>, supplierId: number) {
    return await dbClient.supplier.update({
      where: { id: supplierId },
      data: {
        ...values,
      },
    })
  }
}

export const supplierRepository = new SupplierRepository()
