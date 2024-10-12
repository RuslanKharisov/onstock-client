"use client"

import { newVerification } from "@/features/auth/_actions/email-verificatuon"
import { useEmaulUserVerify } from "@/features/user/_auth-hooks"
import { FormEroor } from "@/shared/ui/form-error"
import { FormSuccess } from "@/shared/ui/form-success"
import { Spinner } from "@/shared/ui/spinner"
import FormWrapper from "@/widgets/form-wraper/form-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function NewVerificationPage() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { mutate, status } = useEmaulUserVerify()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Missing token!");
      return;
    }

    mutate(token, {
      onSuccess: (data) => {
        setSuccess(data.success);
        setError(data.error);
      },
      onError: (error: any) => {
        setError("Что-то пошло не так!");
      },
    });
  }, [token, mutate]);


  return (
    <div className=" flex h-screen flex-col items-center justify-center">
      <FormWrapper
        headerLabel="Проверяем"
        backButtonLabel="Войти в систему."
        backButtonHref="/auth/register"
      >
        <div className="flex items-center justify-center">
          {status === "pending" && <Spinner />}
          <FormSuccess message={success} />
          <FormEroor message={error} />
        </div>
      </FormWrapper>
    </div>
  )
}