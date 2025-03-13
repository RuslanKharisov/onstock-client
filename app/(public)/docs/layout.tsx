import { AppSidebar } from "@/widgets/app-sidebar.tsx"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <AppSidebar variant="DOCSMENU" />
      <main className="w-full">{children}</main>
    </div>
  )
}
