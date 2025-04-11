import Link from "next/link"
import { IHeaderItems } from "../app-header"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet"
import { ToggleTheme } from "@/features/theme/toggle-theme"
import { Button, ButtonProps } from "@/shared/ui/button"
import { UserProfile } from "./user-profile"
import { usePathname } from "next/navigation"
import { HeaderSidebarButtonSheet as HeaderSidebarButton } from "./header-sidebar-button"
import { XIcon } from "@/shared/icons/x-icon"
import { MenuIcon } from "@/shared/icons/menu-icon"

interface MobileNavProps extends ButtonProps {
  headerItems: IHeaderItems[]
}

function MobileNav({ headerItems }: MobileNavProps) {
  const pathname = usePathname()
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="fixed left-0 top-0 z-50 w-full justify-between bg-background/95 px-3 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" hideClose className="max-w-[80%] px-3 py-4">
          <SheetHeader className="mb-3 ml-4">
            <SheetTitle>Личный кабинет</SheetTitle>
            <SheetDescription className="space-x-3 ">
              <UserProfile />
              <ToggleTheme />
            </SheetDescription>
            <SheetClose className=" absolute right-5">
              {/* <Button className="h-7 w-7 p-0" variant="ghost"> */}
              <XIcon />
              {/* </Button> */}
            </SheetClose>
          </SheetHeader>
          <div>
            {headerItems.map((item, idx) => (
              <Link key={idx} href={item.url}>
                <HeaderSidebarButton
                  variant={pathname === item.url ? "secondary" : "ghost"}
                  icon={item.icon}
                >
                  <span>{item.title}</span>
                </HeaderSidebarButton>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
export { MobileNav }
