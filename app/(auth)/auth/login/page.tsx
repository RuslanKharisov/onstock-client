import { LoginForm } from "@/features/auth/login-form.server"
import FormWrapper from "@/widgets/form-wraper/form-wrapper"
import { Suspense } from "react"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FormWrapper
        headerLabel="Войти"
        backButtonLabel="Нет аккаунта? Заргистрироваться."
        backButtonHref="/auth/register"
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <LoginForm />
        </Suspense>
      </FormWrapper>
    </div>
  )
}
