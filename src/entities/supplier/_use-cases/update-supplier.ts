"use server"

import { z } from "zod"
import { SupplierSchema } from "../_domain/schemas"
import { getAppSessionServer } from "@/entities/user/session.server"
import { userRepository } from "@/entities/user/_repositories/user"
import { supplierRepository } from "../_repositories/supplier.repository"
import { revalidatePath } from "next/cache"

export const updateSupplierData = async (
  values: z.infer<typeof SupplierSchema>,
  revalidatePagePath: string,
) => {
  const session = await getAppSessionServer()
  const user = session?.user

  if (!user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await userRepository.getUserById(user.id)

  if (!dbUser) {
    return { error: "Unauthorised" }
  }

  const existingSupplier = await supplierRepository.getSupplierByUserId(
    dbUser.id,
  )

  if (existingSupplier) {
    console.log("обновление поставщика поставщика", values, dbUser.id)
    await supplierRepository.updateSupplier(values, existingSupplier.id)
    return { success: "Данные обновлены" }
  } else {
    console.log("создание нового поставщика", values, dbUser.id)
    await supplierRepository.createSupplier(values, dbUser.id)
    revalidatePath(revalidatePagePath);
    return { success: "Данные внесены" }
  }
}
