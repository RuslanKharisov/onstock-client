import { ToggleTheme } from "@/features/theme/toggle-theme"
import { Logo } from "../../shared/ui/logo"
import { MainNav } from "./_ui/main-nav"
import { Button } from "@/shared/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet"
import { Menu } from "lucide-react"
import { UserProfile } from "./_ui/user-profile"
import { auth } from "@/entities/user/auth"

export async function AppHeader() {
  const session = await auth()
  const user = session?.user

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className=" mb-5 border-b pb-5">
                <Logo />
              </SheetHeader>
              <MainNav role={user?.role}/>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center">
          <div className="hidden md:flex">
            <MainNav role={user?.role} />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-3 ">
            <ToggleTheme />
           <UserProfile/>
          </div>
        </div>
      </div>
    </nav>
  )
}
