"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/shared/ui/card";

import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { registerUserAction } from "@/entities/user/_actions/auth-actions";
import { ZodErrors } from "@/shared/lib/ZodErrors";
import { StrapiErrors } from "@/shared/lib/strapi-errors";
import { SubmitButton } from "./submit-button";

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  message: null,
};

export function EmailSignUpForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE,
  );

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        {/* <Card> */}
        <CardHeader className="space-y-6 text-center">
          <CardTitle className="text-3xl font-bold">Регистрация</CardTitle>
          <CardDescription>
            Введите свои данные, чтобы создать новую учетную запись
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Логин</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="username"
            />
            <ZodErrors error={formState?.zodErrors?.username} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Почта</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
            />
            <ZodErrors error={formState?.zodErrors?.email} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
            />
            <ZodErrors error={formState?.zodErrors?.password} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <SubmitButton
            className="w-full"
            text="Зарегистрироваться"
            loadingText="Loading"
          />
          <StrapiErrors error={formState?.strapiErrors} />
        </CardFooter>
        {/* </Card> */}
        <div className="mt-4 text-center text-sm">
          Есть аккаунт?
          <Link className="underline ml-2" href="sign-in">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
