"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { addOrUpdateProduct } from "@/shared/api/product";
import { Session } from "next-auth";
import { createProductFormSchema } from "@/entities/stock/_domain/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TStatus } from "@/shared/api/product/TStatus";


export function UpdateFromForm({
  supplier,
  session,
}: {
  supplier: Supplier;
  session: Session;
}) {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (data: addOrUpdateProductCommand) =>
      addOrUpdateProduct(session.backendTokens.accessToken, data),
    onSuccess: (data:TStatus) => {
      if(data.success) {
        setError(undefined)
        setSuccess(data.success)
      } else {
        setSuccess(undefined)
        setError(data.error)
      } 
      queryClient.invalidateQueries({ queryKey: ["personalStock"] })
    },
  })

  const form = useForm({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      sku: "",
      name: "",
      description: "",
      quantity: "",
    },
  });

  const onSubmit = (values: addOrUpdateProductCommand) => {
    const data = { ...values, supplierId: supplier?.id }

    addMutation.mutate(data)
  }

  return (
    <Card className="w-[320px] ">
      <CardHeader>
        <CardTitle>Добавить товар на склад</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="skuInput" >Артикул </FormLabel>
                  <FormControl>
                    <Input id="skuInput" placeholder="артикул..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="nameInput" >Название </FormLabel>
                  <FormControl>
                    <Input id="nameInput" placeholder="название..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="descInput" >Описание</FormLabel>
                  <FormControl>
                    <Textarea id="descInput" placeholder="описание..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="qtyInput" >Количество </FormLabel>
                  <FormControl>
                    <Input id="qtyInput" type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={isCreateTransiton}
            >
              Добавить
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardContent>
        {success && <h2 className="text-center bg-green-300 text-xs rounded-lg px-3 py-3 mb-2 ">{success}</h2>}
        {error && <h2 className="text-center bg-red-200 text-xs rounded-lg px-3 py-3 ">{error}</h2>}
      </CardContent>
    </Card>
  );
}
