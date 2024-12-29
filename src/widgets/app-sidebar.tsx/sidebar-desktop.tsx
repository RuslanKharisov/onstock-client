import Link from "next/link"
import { IsideBarItems } from "./app-sidebar"
import { SidebarButton } from "./sidebar-button"
import { usePathname } from "next/navigation"
import { ToggleTheme } from "@/features/theme/toggle-theme"
import { UserProfile } from "../app-header/_ui/user-profile"
interface SidebarDesktopProps {
  sideBarItems: IsideBarItems[]
}

const SidebarDesktop = ({ sideBarItems }: SidebarDesktopProps) => {
  const pathname = usePathname()
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <div className="ml-4">
          <h1 className="">Личный кабинет</h1>
          <div className="flex items-center gap-3 ">
            <UserProfile />
            <ToggleTheme />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex w-full flex-col gap-1">
            {sideBarItems.map((item, idx) => (
              <Link key={idx} href={item.url}>
                <SidebarButton
                  variant={pathname === item.url ? "secondary" : "ghost"}
                  icon={item.icon}
                >
                  <span>{item.title}</span>
                </SidebarButton>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export { SidebarDesktop }
