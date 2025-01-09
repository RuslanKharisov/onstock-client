"use client"

import { ProfileSchema } from "@/entities/user/_domain/schemas"

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
import { UserEntity } from "@/entities/user/types/types"
import { useUpdateUser } from "@/entities/user/api/auth.queries"

interface UpdateProfileFormProps {
  existingUser?: UserEntity | null
  accessToken: string
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  existingUser ,
  accessToken,
}) => {
  const { mutate: updateUser, isPending, isSuccess, isError } = useUpdateUser()

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: existingUser?.name || undefined,
      email: existingUser?.email || undefined,
      // password: undefined,
      // newPassword: undefined,
    },
  })

  const onSubmit = (data: z.infer<typeof ProfileSchema>) => {
    if (existingUser) {
      updateUser({ data, accessToken })
    }
  }

  return (
    <Card className="w-full ">
      <CardHeader className=" items-center gap-3">
        <h2 className="text-center text-lg font-bold">Редактировать профиль</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-5 grid gap-3 md:grid-cols-2">
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
              
              {isSuccess && (
                <h2 className="mb-2 rounded-lg bg-green-300 px-3 py-3 text-center text-xs ">
                  Успешно
                </h2>
              )}
              {isError && (
                <h2 className="rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">
                  Что-то пошло не так
                </h2>
              )}
            </div>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending && <Spinner className="mr-2 h-4 w-full " />}
              Подтвердить
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default UpdateProfileForm
