"use client"

import { SupplierSchema } from "@/entities/supplier/_domain/schemas"
import { updateSupplierData } from "@/entities/supplier/_use-cases/update-supplier"
import { ButtonWrapper } from "@/shared/lib/button-wrapper"
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
import { Heading3, SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const UpdateSupplier = ({
  supplier,
  revalidatePagePath,
}: {
  supplier: Supplier | null,
  revalidatePagePath: string
}) => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

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
    startTransition(() => {
      updateSupplierData(values, revalidatePagePath)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
          if (data.success) {
            setSuccess(data.success)
          }
        })
        .catch(() => setError("Что-то пошло не так"))
    })
  }

  return (
    <>
      <Card className="w-[315px]">
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
              <div className="mb-5 grid gap-3">
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
                <FormEroor message={error} />
                <FormSuccess message={success} />
              </div>
              <Button type="submit" disabled={isPending} className="mb-5">
                {isPending && <Spinner className="mr-2 h-4 w-full " />}
                Отправить
              </Button>
            </form>
          </Form>
          <div hidden={!supplier}>
            <Link
              className="flex items-center text-primary/60 transition-colors hover:text-primary"
              href="/personal-stock"
            >
              {" "}
              <SquareArrowOutUpRight className="mr-2" />
              <span>Редактировать склад</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UpdateSupplier
