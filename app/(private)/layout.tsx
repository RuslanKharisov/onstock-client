import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar"
import { AppHeader } from "@/widgets/app-header/app-header"
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
        <SidebarTrigger/>
        {children}
      </div>
    </SidebarProvider>
  )
}
