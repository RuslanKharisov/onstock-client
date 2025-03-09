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
  // Устанавливаем значение по умолчанию, если isMobile не является булевым значением
  const isMobileSafe = typeof isMobile === "boolean" ? isMobile : false
  console.log("isMobileSafe ==> ", isMobileSafe)
  return (
    <>
      <AppHeader isMobile={isMobileSafe} />
      <Suspense fallback={<div>Loading...</div>}>
        <main className="mt-5 w-full">{children}</main>
      </Suspense>
      <Footer />
    </>
  )
}
