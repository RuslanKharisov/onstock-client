"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"
import PolicyLink from "./_ui/policy-link"
import BackButton from "./_ui/back-button"

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
}

const FormWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="mx-auto w-[320px]">
      <CardHeader className="flex flex-col text-center">
        <h1 className="text-2xl font-semibold m-0">{headerLabel}</h1>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
      <CardFooter>
        <PolicyLink />
      </CardFooter>
    </Card>
  )
}

export default FormWrapper
