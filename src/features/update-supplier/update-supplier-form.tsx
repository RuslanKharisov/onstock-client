"use client"

import { SupplierSchema } from "@/entities/supplier/_domain/schemas"
import { supplierQueries } from "@/entities/supplier/api/supplier.queries"
import { queryClient } from "@/shared/api/query-client"
import { createSupplier, updateSupplier } from "@/shared/api/supplier"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { FormEroor } from "@/shared/ui/form-error"
import { FormSuccess } from "@/shared/ui/form-success"
import { Input } from "@/shared/ui/input"
import { Spinner } from "@/shared/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const UpdateSupplierForm = ({
  userId,
  accessToken,
}: {
  userId: string
  accessToken: string
}) => {
  const [formError, setFormError] = useState<string | undefined>()
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Мутация для создания поставщика
  const createMutation = supplierQueries.create(userId, accessToken)
  const {
    isPending: isCreateLoading,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = createMutation

  // Мутация для обновления поставщика
  const updateMutation = supplierQueries.update(userId, accessToken)
  const {
    isPending: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
  } = updateMutation

  // Получение данных поставщика
  const {
    data: supplier,
    error: supplierError,
    isLoading: isSupplierLoading,
    isError: isSupplierError,
  } = useQuery(supplierQueries.detail(userId, accessToken))

  const form = useForm<z.infer<typeof SupplierSchema>>({
    resolver: zodResolver(SupplierSchema),
    defaultValues: {
      name: supplier?.name || "",
      email: supplier?.email || "",
      siteUrl: supplier?.siteUrl || "",
    },
  })

  useEffect(() => {
    // Обновление defaultValues при изменении supplier
    form.reset({
      name: supplier?.name || "",
      email: supplier?.email || "",
      siteUrl: supplier?.siteUrl || "",
    })
  }, [supplier, success])

  const onSubmit = (values: z.infer<typeof SupplierSchema>) => {
    if (supplier) {
      // Если это обновление
      updateMutation.mutate({ userId, accessToken, values })
    } else {
      // Если это создание
      createMutation.mutate({ userId, accessToken, values })
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          {!supplier ? (
            <h3 className="text-center text-lg font-bold text-destructive">
              !!! Внести данные !!!
            </h3>
          ) : (
            <h2 className="text-center text-lg font-bold">Данные компании</h2>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-5 grid gap-3 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Поставщик</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Укажите вашу фирму "
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Почта для запросов</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Куда отправлять заявки?"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="siteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Адрес сайта</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="https:// ...."
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormEroor message={formError} />
                <FormSuccess message={success ? "Успешно" : ""} />
              </div>
              <Button
                type="submit"
                disabled={isCreateLoading || isUpdateLoading}
                className="w-[120px]"
              >
                {isCreateLoading
                  ? "Создание..."
                  : isUpdateLoading
                    ? "Обновление..."
                    : "Сохранить"}
              </Button>
            </form>
          </Form>
          {success && (
            <Link
              className="flex items-center text-primary/60 transition-colors hover:text-primary"
              href="/personal-stock"
            >
              {" "}
              <SquareArrowOutUpRight className="mr-2" />
              <span>Редактировать склад</span>
            </Link>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default UpdateSupplierForm
