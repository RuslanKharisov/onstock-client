import Link from "next/link"
import { IsideBarItems } from "../app-sidebar"
import { SidebarButton } from "./sidebar-button"
import { usePathname } from "next/navigation"
import { ToggleTheme } from "@/features/theme/toggle-theme"
import { UserProfile } from "../../app-header/_ui/user-profile"
interface SidebarDesktopProps {
  sideBarItems: IsideBarItems[]
}

const SidebarDesktop = ({ sideBarItems }: SidebarDesktopProps) => {
  const pathname = usePathname()
  return (
    <aside className="h-screen max-w-xs border-r bg-background lg:min-w-[270px] w-[270px] ">
      <div className="h-full px-3 py-4">
        <div className="ml-4">
          {/* <h1 className="">Личный кабинет</h1> */}
          <div className="gap-3 flex items-center ">
            <UserProfile />
            <ToggleTheme />
          </div>
        </div>
        <div className="mt-5">
          <div className="w-full gap-1 flex flex-col">
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
