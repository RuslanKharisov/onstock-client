import { auth } from "@/entities/user/auth"
import { AppHeader } from "@/widgets/app-header/app-header"
import { redirect } from "next/navigation"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
if (session?.user.role !== "ADMIN") redirect("/")
  
  return (
    <>
      <AppHeader variant="auth" />
      {children}
    </>
  )
}
