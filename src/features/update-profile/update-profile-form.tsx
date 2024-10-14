"use client"

import { ProfileSchema } from "@/entities/user/_domain/schemas"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { FormEroor } from "@/shared/ui/form-error"
import { FormSuccess } from "@/shared/ui/form-success"
import { Spinner } from "@/shared/ui/spinner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { ProfileAvatar } from "@/entities/user/profile"
import { updateUser } from "@/shared/api/user"


const UpdateProfileForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const { update } = useSession()
  const { data: session, status } = useSession()
  const user = session?.user

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      // password: undefined,
      // newPassword: undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      updateUser(user?.id, user?.backendTokens.accessToken, values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
          if (data.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch(() => setError("Что-то пошло не так"))
    })
  }
  return (
    <Card className="w-[315px]">
      <CardHeader className=" items-center gap-3">
        <h2 className="text-center text-lg font-bold">
          Форма редактирования профиля
        </h2>
        <ProfileAvatar profile={user} />
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
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Имя"
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
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Текущий пароль</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Новый пароль</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormEroor message={error} />
              <FormSuccess message={success} />
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner className="mr-2 h-4 w-full " />}
              Обновить
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default UpdateProfileForm
