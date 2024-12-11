import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";
import { updateSupplier } from "./update-supplier";
import { getSupplier } from "./get-supplier";
import { createSupplier } from "./create-supplier";
import { ChangeSupplierDto } from "../dto";

export const supplierQueries = {
  all: () => ["suppliers"],
  lists: () => [...supplierQueries.all()],
  details: () => [...supplierQueries.all(), "supplier"],

  detail: (userId: string, accessToken: string,) =>
    queryOptions({
      queryKey: [...supplierQueries.details(), userId, accessToken],
      queryFn: () => getSupplier(userId, accessToken),
      staleTime: 3000,
    }),

  create: (userId:string, accessToken:string) =>
    useMutation({
      mutationFn: ({ userId, accessToken, values }: { userId: string; accessToken:string; values: ChangeSupplierDto }) =>
        createSupplier(userId, accessToken, values),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [supplierQueries.details()] });
      },
    }),

    update: (userId:string, accessToken:string) =>
      useMutation({
        mutationFn: ({ userId, accessToken, values }: { userId: string; accessToken:string; values: ChangeSupplierDto }) =>
          updateSupplier(userId, accessToken, values),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["supplierQueries.details()"] });
        },
      }),
};
