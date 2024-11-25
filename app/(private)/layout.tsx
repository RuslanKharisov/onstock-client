import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar"
import { AppSidebar } from "@/widgets/app-sidebar.tsx"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger className=" absolute top-2"/>
        {children}
      </div>
    </SidebarProvider>
  )
}
