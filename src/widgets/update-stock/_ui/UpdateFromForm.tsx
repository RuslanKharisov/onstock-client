"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/shared/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card"
import { createProductFormSchema } from "@/entities/stock/_domain/schemas"
import { addOrUpdateProductCommand } from "@/entities/producrts-list/_domain/types"
import { addOrUpdateProductDto } from "@/entities/stock-personal.ts/dto/add-stock-item.dto"
import { AddOrUpdateStockItem } from "@/entities/stock-personal.ts/api/add-or-update-stock-item"
import { useMutation } from "@tanstack/react-query"

export function UpdateFromForm({
  accessToken,
  updateStock,
}: {
  accessToken: string
  updateStock: () => Promise<void>
}) {
  const {
    mutate: addOrUpdateProduct,
    isPending,
    isError,
    error: resError,
    data,
  } = useMutation({
    mutationFn: ({
      data,
      accessToken,
    }: {
      data: addOrUpdateProductDto[]
      accessToken: string
    }) => {
      // const items = Array.isArray(data) ? data : [data]
      return AddOrUpdateStockItem(accessToken, data)
    },
    onSuccess: async () => {
      await updateStock() // Обновляем данные после успешного запроса
    },
  })

  const form = useForm({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      sku: "",
      name: "",
      description: "",
      quantity: 0,
      category: undefined,
      manufacturer: undefined,
      newdelivery_qty_1: undefined,
      newdelivery_qty_2: undefined,
      newdelivery_date_1: undefined,
      newdelivery_date_2: undefined,
    },
  })

  const onSubmit = (values: addOrUpdateProductCommand) => {
    const data: addOrUpdateProductDto[] = [
      {
        ...values,
        category: values.category || undefined,
        quantity: Number(values.quantity) || 0,
        // Приводим поля к нужному формату
        newDeliveryQty1: values.newdelivery_qty_1
          ? Number(values.newdelivery_qty_1)
          : undefined,
        newDeliveryDate1: values.newdelivery_date_1
          ? new Date(values.newdelivery_date_1)
          : undefined,
        newDeliveryQty2: values.newdelivery_qty_2
          ? Number(values.newdelivery_qty_2)
          : undefined,
        newDeliveryDate2: values.newdelivery_date_2
          ? new Date(values.newdelivery_date_2)
          : undefined,
      },
    ]

    addOrUpdateProduct({ data, accessToken })
  }

  return (
    <Card className="w-[320px] ">
      <CardHeader>
        <CardTitle>Добавить товар на склад</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="skuInput">Артикул </FormLabel>
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
                  <FormLabel htmlFor="nameInput">Название </FormLabel>
                  <FormControl>
                    <Input
                      id="nameInput"
                      placeholder="название..."
                      {...field}
                    />
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
                  <FormLabel htmlFor="descInput">Описание</FormLabel>
                  <FormControl>
                    <Textarea
                      id="descInput"
                      placeholder="описание..."
                      {...field}
                    />
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
                  <FormLabel htmlFor="qtyInput">Количество </FormLabel>
                  <FormControl>
                    <Input
                      id="qtyInput"
                      type="number"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {data?.data[0]?.property === "ok" && (
              <p className="mb-2 rounded-lg bg-green-300 px-3 py-3 text-center text-xs ">
                {data?.data[0]?.message}
              </p>
            )}
            {data?.data[0]?.property === "warning" ? (
              <p className="rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">
                {data?.data[0]?.message}
              </p>
            ) : isError ? (
              <p className="rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">
                {resError.message}
              </p>
            ) : (
              ""
            )}
            <Button className="w-full" type="submit" disabled={isPending}>
              Добавить
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
