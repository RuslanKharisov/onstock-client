import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";
import { updateSupplier } from "./update-supplier";
import { getSupplier } from "./get-supplier";
import { createSupplier } from "./create-supplier";
import { ChangeSupplierDto } from "../dto";
import { getSupplierInfo } from "./get-supplier-info";
import { CreateSupplierDto } from "../dto/create-supplier.dto";
import { ConnectSupplierApiDto } from "../dto/connect-supplier-api.dto";
import { ConnectSupplierApi } from "./update-connect-supplier-api";

export const supplierQueries = {
  all: () => ["suppliers"],
  lists: () => [...supplierQueries.all()],
  details: () => [...supplierQueries.all(), "supplier"]
};

// Хук для получение поставщика по ID пользователя в ЛК
export const useGetSupplier = (userId: string, accessToken: string) => {
  return useQuery({
    queryKey: [...supplierQueries.details(), userId, accessToken],
    queryFn: () => getSupplier(userId, accessToken),
    // staleTime: 3000,
  })
};

// Хук для получение информации о поставщике по ID поставщика из params
export const useGetSupplierInfo = (supplierId: number) => {
  return useQuery({
    queryKey: ["supplier", supplierId,],
    queryFn: () => getSupplierInfo(supplierId),
    enabled: !!supplierId, // Запрос выполняется только если есть id
  })
};

// Хуки для мутаций
export const useCreateSupplier = () =>
  useMutation({
    mutationFn: ({ userId, accessToken, values }: { userId: string; accessToken: string; values: CreateSupplierDto }) =>
      createSupplier(userId, accessToken, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supplierQueries.details() });
    },
  });

export const useUpdateSupplier = () =>
  useMutation({
    mutationFn: ({ userId, accessToken, values }: { userId: string; accessToken: string; values: ChangeSupplierDto }) =>
      updateSupplier(userId, accessToken, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supplierQueries.details() });
    },
  });


export const useConnectSupplierApi = () => {
  return useMutation({
    mutationFn: async ({
      url,
      token,
      accessToken,
    }: ConnectSupplierApiDto) => {
      ConnectSupplierApi({ url, token, accessToken })
    },
  })
}

