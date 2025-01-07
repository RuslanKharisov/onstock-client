import { apiClient } from "@/shared/api/base";
import { GetCategoryDto } from "../_dto/get-query.dto";
import { Category } from "../_domain/types";

export const getCategories = async (
  data?: GetCategoryDto
):Promise<Category[]> => {
  return await apiClient.get(`categories?parentId=${data?.parentId}`)
}
