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
      <Suspense fallback={<div>Loading Header...</div>}>
        <AppHeader />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <main className="w-full">{children}</main>
      </Suspense>
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}
