import { AppHeader } from "@/widgets/app-header/app-header"
import { Suspense } from "react"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppHeader />
      <Suspense>{children}</Suspense>
    </>
  )
}
