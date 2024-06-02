"use server";

import { productsRepository } from "@/features/products-list/products.repository";
import { revalidatePath } from "next/cache";

export const deleteStockElementItemAction = async (
  stockId: string,
  revalidatePagePath: string,
) => {
    await productsRepository.deleteStockElement(stockId)
    revalidatePath(revalidatePagePath);
}