"use client"

import { SupplierSchema } from "@/entities/supplier/_domain/schemas"
import {
  useCreateSupplier,
  useGetSupplier,
  useUpdateSupplier,
} from "@/entities/supplier/api/supplier.queries"
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
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMask } from '@react-input/mask';

const UpdateSupplierForm = ({
  userId,
  accessToken,
}: {
  userId: string
  accessToken: string
}) => {
  const inputRef = useMask({
    mask: 'https://_____________________________________',
    replacement: { _: /[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%-]/ }, // Позволяет вводить буквы и цифры
  });
  const {
    mutate: createSupplier,
    isPending: isCreateLoading,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
  } = useCreateSupplier()

  const {
    mutate: updateSupplier,
    isPending: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useUpdateSupplier()

  const { data: supplier, isPending } = useGetSupplier(userId, accessToken)

  const form = useForm<z.infer<typeof SupplierSchema>>({
    resolver: zodResolver(SupplierSchema),
    defaultValues: {
      name: supplier?.name || "",
      email: supplier?.email || "",
      siteUrl: supplier?.siteUrl || "",
    },
  })

  useEffect(() => {
    form.reset({
      name: supplier?.name || "",
      email: supplier?.email || "",
      siteUrl: supplier?.siteUrl || "",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier])

  const onSubmit = (values: z.infer<typeof SupplierSchema>) => {
    if (supplier) {
      updateSupplier({ userId, accessToken, values })
    } else {
      createSupplier({ userId, accessToken, values })
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          {isPending ? (
            <div className="flex items-center justify-center">
              <Spinner />
              {/* <span>Загрузка...</span> */}
            </div>
          ) : !supplier ? (
            <div>
              <h3 className="text-center text-lg font-bold text-destructive">
                Поставщик не найден!
              </h3>
              <p className="text-center text-xs">
                Укажите данные вашей компании и нажмите на кнопку
                &quot;Сохранить&quot;
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-center text-lg font-bold mb-2">{supplier.name}</h3>
              <p className="text-center text-sm ">Активный тариф: <span>{supplier.supplierTariff.name}</span> </p>
              <p className="text-center text-sm ">Лимит склада по тарифу: <span>{supplier.supplierTariff.maxProducts}</span> </p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-5 grid gap-3 lg:grid-cols-3">
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
                          disabled={isCreateLoading || isUpdateLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
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
                          disabled={isCreateLoading || isUpdateLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
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
                          ref={inputRef}
                          type="text"
                          placeholder="site.ru"
                          disabled={isCreateLoading || isUpdateLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormEroor
                  message={
                    isCreateError || isUpdateError ? "Что то пошло не так" : ""
                  }
                />
                <FormSuccess
                  message={isCreateSuccess || isUpdateSuccess ? "Успешно" : ""}
                />
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={isCreateLoading || isUpdateLoading}
                className="w-[120px] "
              >
                {isCreateLoading
                  ? "Создание..."
                  : isUpdateLoading
                    ? "Обновление..."
                    : "Сохранить"}
              </Button>
            </form>
          </Form>
          {isCreateSuccess || isUpdateSuccess ? (
            <Link
              className="flex w-fit items-center text-destructive transition-colors hover:text-primary"
              href="/personal-stock"
            >
              {" "}
              <SquareArrowOutUpRight className="mr-2" />
              <span className="my-5">Редактировать склад</span>
            </Link>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default UpdateSupplierForm
