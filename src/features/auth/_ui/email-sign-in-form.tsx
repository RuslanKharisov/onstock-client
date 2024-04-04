"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { loginUserAction } from "@/entities/user/_actions/auth-actions";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { ZodErrors } from "@/shared/lib/ZodErrors";
import { StrapiErrors } from "@/shared/lib/strapi-errors";
import { SubmitButton } from "./submit-button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/shared/ui/card";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function EmailSignInForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-6 text-center">
            <CardTitle className="text-3xl font-bold">
              Войти в аккаунт
            </CardTitle>
            <CardDescription>
              Введите свои данные для входа в свою учетную запись
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 ">
            <div className="space-y-2">
              <Label htmlFor="email">Почта</Label>
              <Input
                id="identifier"
                name="identifier"
                type="email"
                placeholder="name@example.com"
              />
              <ZodErrors error={formState?.zodErrors?.identifier} />
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
              text="Войти"
              loadingText="Loading"
            />
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          У вас нет учетной записи?
          <Link className="underline ml-2" href="sign-up">
            Регистрация
          </Link>
        </div>
      </form>
      //{" "}
    </div>
  );
}
