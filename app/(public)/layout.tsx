import { isMobileDevice } from "@/shared/lib/responsive"
import { Footer } from "@/widgets/app-footer"
import { AppHeader } from "@/widgets/app-header/app-header"
import { Suspense } from "react"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = await isMobileDevice()
  return (
    <>
      <AppHeader isMobile={isMobile} />
      <Suspense fallback={<div>Loading...</div>}>
        <main className="mt-5 w-full">{children}</main>
      </Suspense>
      <Footer />
    </>
  )
}
