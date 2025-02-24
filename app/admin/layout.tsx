import { auth } from "@/entities/user/auth"
import { AppSidebar } from "@/widgets/app-sidebar.tsx"
import { redirect } from "next/navigation"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session?.user.role !== "ADMIN") redirect("/")

  return (
    <div className="flex">
      <AppSidebar variant="admin" />
      <main className="w-full">{children}</main>
    </div>
  )
}
