import { SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel, SidebarGroupContent } from "@/shared/ui/sidebar";
import { Store, Home, Inbox, Search, Settings, User, Database } from "lucide-react"
import Link from 'next/link'

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Мой склад",
    url: "/personal-stock",
    icon: Store,
  },
  {
    title: "Профиль",
    url: "/profile",
    icon: User,
  },
  {
    title: "Тарифы",
    url: "/prising",
    icon: Database,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center h-14 font-semibold">
        Личный кабинет
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild variant='outline' size='lg' >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
