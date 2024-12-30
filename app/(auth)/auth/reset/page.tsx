import { ResetForm } from "@/features/auth/_ui/reset-form"
import FormWrapper from "@/widgets/form-wraper/form-wrapper"
import { Suspense } from "react"

const ResetPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center md:h-screen">
      <FormWrapper
        headerLabel="Сбросить пароль."
        backButtonLabel="Войти"
        backButtonHref="/auth/login"
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <ResetForm />
        </Suspense>
      </FormWrapper>
    </div>
  )
}

export default ResetPage
