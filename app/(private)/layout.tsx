import { AppSidebar } from "@/widgets/app-sidebar.tsx"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppSidebar />
      <main className="sm:ml-[300px] mt-16 w-full">{children}</main>
    </>
  )
}
