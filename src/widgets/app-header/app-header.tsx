import { ToggleTheme } from "@/features/theme/toggle-theme"
import { Logo } from "./_ui/logo"
import { MainNav } from "./_ui/main-nav"
import { Profile } from "./_ui/profile"
import { Button } from "@/shared/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet"
import { Menu } from "lucide-react"
import { auth } from "@/entities/user/auth"

export async function AppHeader({
  variant,
}: {
  variant: "auth" | "private" | "public"
}) {
  const isProfile = variant !== "auth"
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              <MainNav role={session?.user?.role}/>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center">
          <div className="hidden md:flex">
            <MainNav role={session?.user?.role} />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-3 ">
            <ToggleTheme />
            {<Profile session={session}/>}
            {/* {isProfile && <Profile session={session}/>} */}
          </div>
        </div>
      </div>
    </header>
  )
}
