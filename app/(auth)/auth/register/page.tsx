import FormWrapper from "@/widgets/form-wraper/form-wrapper"
import { RegisterForm } from "@/features/auth/register-form.server"
import { Suspense } from "react"

export default function RegisterPage() {
  return (
    <div className=" flex h-screen flex-col items-center justify-center">
      <FormWrapper
        headerLabel="Регистрация"
        backButtonLabel="Уже зарегистрированы? Войти."
        backButtonHref="/auth/login"
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <RegisterForm />
        </Suspense>
      </FormWrapper>
    </div>
  )
}
