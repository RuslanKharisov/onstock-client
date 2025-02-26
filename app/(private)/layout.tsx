import { auth } from "@/entities/user/auth"
import { AppSidebar } from "@/widgets/app-sidebar.tsx"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  const role = session
    ? (session?.user.role as "USER" | "ADMIN" | undefined)
    : "USER"
  return (
    <div className="flex">
      <AppSidebar variant={role} />
      <main className="w-full">{children}</main>
    </div>
  )
}
