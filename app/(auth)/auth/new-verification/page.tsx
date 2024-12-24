"use client"
import { useEmailUserVerify } from "@/entities/user/api/auth.queries"
import { FormEroor } from "@/shared/ui/form-error"
import { FormSuccess } from "@/shared/ui/form-success"
import { Spinner } from "@/shared/ui/spinner"
import FormWrapper from "@/widgets/form-wraper/form-wrapper"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function NewVerificationPage() {
  const [errorMsg, setErrorMsg] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const {
    mutate: EmailUserVerify,
    isPending,
    data,
    isError,
    error
  } = useEmailUserVerify()

  useEffect(() => {

    if (!token) {
      setErrorMsg("Missing token!")
      return
    }
    EmailUserVerify({ token })

  }, [EmailUserVerify, token])

  return (
    <div className=" flex h-screen flex-col items-center justify-center">
      <FormWrapper
        headerLabel="Проверяем"
        backButtonLabel="Войти в систему."
        backButtonHref="/auth/register"
      >
        <div className="flex items-center justify-center">
          {isPending && <Spinner />}
          {data?.error && <FormEroor message={data?.error} />}
          {errorMsg && <FormEroor message={errorMsg} />}
          {isError && <FormEroor message={error.message} />}
          {data?.success && <FormSuccess message={data?.success} />}
        </div>
      </FormWrapper>
    </div>
  )
}
