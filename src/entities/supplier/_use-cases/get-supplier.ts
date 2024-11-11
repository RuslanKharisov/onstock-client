"use server";

import { apiClient } from "@/shared/api/base";

export const getSupplier = async (userId: string, accessToken: string): Promise<Supplier> => {
  const query = { userId };
  return await apiClient.post<Supplier>(`/supplier/${userId}`, query, accessToken);
};
