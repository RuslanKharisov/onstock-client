import Link from "next/link"
import { IsideBarItems } from "../app-sidebar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/shared/ui/sheet"
import { Button } from "@/shared/ui/button"
import { Menu, X } from "lucide-react"
import { SidebarButtonSheet as SidebarButton } from "./sidebar-button"
import { usePathname } from "next/navigation"
import { UserProfile } from "../../app-header/_ui/user-profile"
import { ToggleTheme } from "@/features/theme/toggle-theme"

interface SidebarMobileProps {
  sideBarItems: IsideBarItems[]
}

const SidebarMobile = ({ sideBarItems }: SidebarMobileProps) => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3 pl-3">
          <Button size="icon" variant="ghost" className="">
            <Menu size={25} />
          </Button>
        </div>
      </SheetTrigger>

      <SheetContent side="left" hideClose className="max-w-[80%] px-3 py-4">
        <SheetHeader className="flex flex-row items-center justify-between ">
          <div className="mb-3 ml-4">
            <h1 className="">Личный кабинет</h1>
            <div className="flex items-center gap-3 ">
              <UserProfile />
              <ToggleTheme />
            </div>
          </div>
          <SheetClose>
            <Button className="h-7 w-7 p-0" variant="ghost">
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div>
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
      </SheetContent>
    </Sheet>
  )
}

export { SidebarMobile }
