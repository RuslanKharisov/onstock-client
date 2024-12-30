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
      <div className="pt-20 md:pt-5">
        <Suspense>{children}</Suspense>
      </div>
    </>
  )
}
