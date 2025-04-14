"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Spinner } from "@/shared/ui/spinner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { useConnectSupplierApi } from "@/entities/supplier/api/supplier.queries"

const ConnectApiSchema = z.object({
  url: z.string().url({ message: "Некорректный URL" }),
  token: z.string().min(1, "Токен обязателен"),
})

type ConnectApiValues = z.infer<typeof ConnectApiSchema>

interface ConnectSupplierApiFormProps {
  accessToken: string
}

const ConnectSupplierApiForm: React.FC<ConnectSupplierApiFormProps> = ({
  accessToken,
}) => {
  const {
    mutate: connectApi,
    isPending,
    isSuccess,
    isError,
  } = useConnectSupplierApi()

  const form = useForm<ConnectApiValues>({
    resolver: zodResolver(ConnectApiSchema),
    defaultValues: {
      url: "",
      token: "",
    },
  })

  const onSubmit = (data: ConnectApiValues) => {
    connectApi({ ...data, accessToken })
  }

  return (
    <Card className="w-full">
      <CardHeader className="items-center gap-3">
        <h2 className="text-center text-lg font-bold">Подключение к API</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-5 grid gap-3 md:grid-cols-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://api.example.com"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Токен доступа</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="abcdef123..."
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isSuccess && (
              <p className="mb-3 rounded bg-green-200 p-2 text-center text-xs">
                Успешно подключено
              </p>
            )}
            {isError && (
              <p className="mb-3 rounded bg-red-200 p-2 text-center text-xs">
                Ошибка при подключении
              </p>
            )}

            <Button type="submit" size="sm" disabled={isPending}>
              {isPending && <Spinner className="mr-2 h-4 w-4" />}
              Подключить
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ConnectSupplierApiForm
