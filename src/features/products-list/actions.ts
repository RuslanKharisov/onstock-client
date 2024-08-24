"use server";

import { revalidatePath } from "next/cache";
import { productsRepository } from "./products.repository";

export const createProductAction = async (
  command: addOrUpdateProductCommand,
  revalidatePagePath: string,
) => {
  try {
    const data = await productsRepository.addOrUpdateProduct(command);
    
    if (data?.error) {
      return { error: data.error };
    }
    
    if (data.success) {
      return { success: data.success };
    }

    // Если нет ни ошибки, ни успешного результата
    return { error: "Unknown error occurred" };
  } catch (error) {
    // Обработка неожиданных ошибок
    return { error: "Internal server error: " + (error as Error).message };
  } finally {
    revalidatePath(revalidatePagePath);
  }
};


export const deleteStockElementItemAction = async (
  stockId: string,
  revalidatePagePath: string,
) => {
    await productsRepository.deleteStockElement(stockId)
    revalidatePath(revalidatePagePath);
}