import { LoginForm } from "@/features/auth/login-form.server"
import FormWrapper from "@/widgets/form-wraper/form-wrapper"

export default function LoginPage() {
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <FormWrapper
        headerLabel="Войти"
        backButtonLabel="Нет аккаунта? Заргистрироваться."
        backButtonHref="/auth/register"
      >
        <LoginForm />
      </FormWrapper>
    </div>
  )
}
