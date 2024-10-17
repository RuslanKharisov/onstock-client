"use client"

import { SupplierSchema } from "@/entities/supplier/_domain/schemas"
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
import { SquareArrowOutUpRight } from "lucide-react"
import { Session } from "next-auth"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const UpdateSupplierForm = ({
  supplier,
  revalidatePagePath,
  session,
}: {
  supplier: Supplier | null,
  revalidatePagePath: string
  session: Session
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
  
  const onSubmit = async (values: z.infer<typeof SupplierSchema>) => {
    startTransition(async () => {
      
        let data;
        if (supplier) {
          data = await updateSupplier(session.user.id, session.backendTokens.accessToken, values, revalidatePagePath);
          console.log("🚀 ~ startTransition ~ data:", data)
        } else {
          data = await createSupplier(session.user.id, session.backendTokens.accessToken, values, revalidatePagePath);
        }
        
        if (data) {
          setSuccess("Успешно");
        }
    });
  };

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

export default UpdateSupplierForm
