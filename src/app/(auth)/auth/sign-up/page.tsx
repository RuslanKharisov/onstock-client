import { SignUpForm } from "@/features/auth/sign-up-form.server";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import Link from "next/link";

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative  flex-col items-center justify-center self-center pt-24">
        <Card className="max-w-[350px] mx-auto">
          <CardContent className="grid gap-4">
          {/* <AuthForm/> */}
            <SignUpForm />
            <p className="px-0 text-center text-sm text-muted-foreground">
              Нажимая продолжить вы соглашаетесь с{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Пользовательским соглашением
              </Link>{" "}
              и{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Политикой конфиденциальности
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}