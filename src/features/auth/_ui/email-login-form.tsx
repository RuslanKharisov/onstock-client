"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { LoginSchema } from "@/entities/user/_domain/schemas"
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
import { FormEroor } from "@/shared/ui/form-error"
import { FormSuccess } from "@/shared/ui/form-success"
import { useState, useTransition } from "react"
import Link from "next/link"
import { getSession, signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/shared/lib/routes"

export function EmailLoginForm() {
  const [showToFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    setShowTwoFactor(false)

    startTransition(async () => {
      try {
        const result = await signIn("credentials", { 
          email: values.email,
          password: values.password,
        });

        if (result?.error) {
          setError(result.error);
          form.reset();
        } else {
          setSuccess("Вход выполнен!");
          form.reset();

          // Явно обновляем сессию после успешного входа 
          await getSession();

          // Выполняем редирект вручную, если необходимо 
          window.location.href = DEFAULT_LOGIN_REDIRECT;
        }
      } catch {
        setError("Что-то пошло не так");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          {showToFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!showToFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal"
                    >
                      <Link href="/auth/reset">Забыли пароль?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormEroor message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Spinner
                className="mr-2 h-4 w-full "
                aria-label="Загрузка выхода"
              />
            )}
            Продолжить
          </Button>
        </div>
      </form>
    </Form>
  )
}
