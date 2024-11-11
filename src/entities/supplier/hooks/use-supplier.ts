import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/base"; // Импортируйте apiClient

export const useSupplier = (userId: string, accessToken: string) => {
  const fetchSupplier = async () => {
    const query = { userId };
    return await apiClient.post(`/supplier/${userId}`, query, accessToken);
  };

  return useQuery({
    queryKey: ['supplier', userId, accessToken],
    queryFn: fetchSupplier,
    enabled: !!accessToken, // Запрос выполняется только при наличии accessToken
  });
};
