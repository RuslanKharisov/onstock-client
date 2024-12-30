import { NewPasswordForm } from "@/features/auth/_ui/new-password-form"
import FormWrapper from "@/widgets/form-wraper/form-wrapper"
import { Suspense } from "react"

const NewPasswordPage = () => {
  return (
    <div className=" flex flex-col md:items-center justify-center pt-5">
      <FormWrapper
        headerLabel="Придумайте новый пароль."
        backButtonLabel="На станицу входа"
        backButtonHref="/auth/login"
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <NewPasswordForm />
        </Suspense>
      </FormWrapper>
    </div>
  )
}

export default NewPasswordPage
