"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { NewPasswordSchema } from "@/entities/user/_domain/schemas"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Spinner } from "@/shared/ui/spinner"
import { FormEroor } from "@/shared/ui/form-error"
import { FormSuccess } from "@/shared/ui/form-success"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { useSearchParams } from "next/navigation"
import { useUpdatePassword } from "../_api/auth.queries"
import { error } from "console"

export function NewPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const {
    mutate: updatePasword,
    isPending,
    isError,
    data,
    error,
  } = useUpdatePassword()
    console.log("🚀 ~ NewPasswordForm ~ data:", data)

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    if (token) {
      updatePasword({ data, token })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isError && <FormEroor message={error.message} />}
          {data?.error && <FormEroor message={data.error} />}
          {data?.success && <FormSuccess message={data.success} />}
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Spinner
                className="mr-2 h-4 w-full "
                aria-label="Загрузка выхода"
              />
            )}
            Обновить пароль
          </Button>
        </div>
      </form>
    </Form>
  )
}
