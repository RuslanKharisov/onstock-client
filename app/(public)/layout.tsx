import { Spinner } from "@/shared/ui/spinner"
import { Footer } from "@/widgets/app-footer"
import { AppHeader } from "@/widgets/app-header/app-header"
import { Suspense } from "react"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppHeader />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <Spinner className="h-12 w-12 animate-spin text-primary" />
          </div>
        }
      >
        <main className="mt-5 w-full">{children}</main>
      </Suspense>
      <Footer />
    </>
  )
}
