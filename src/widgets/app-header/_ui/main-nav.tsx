import Link from "next/link"
import { IHeaderItems } from "../app-header"
import { Logo } from "@/shared/ui/logo"
import { ToggleTheme } from "@/features/theme/toggle-theme"
import { UserProfile } from "./user-profile"
import { usePathname } from "next/navigation"
import { Socials } from "@/widgets/socials"
import { socialsData } from "@/widgets/socials/_vm/constans"

interface MainNavProps {
  headerItems: IHeaderItems[]
}

function MainNav({ headerItems }: MainNavProps) {
  const pathname = usePathname()
  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky">
      <nav>
        <div className="h-14 gap-12  container flex items-center">
          <div className="mr-4 md:flex hidden">
            <Logo />
          </div>
          <div className="flex-1 gap-7 flex items-center">
            {headerItems.map((item, idx) => (
              <Link
                key={idx}
                className={` ${pathname === item.url ? "text-primary" : "text-foreground/90"} font-medium  transition-colors hover:text-destructive`}
                href={item.url}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex-1 space-x-3 flex items-center justify-end ">
            <Socials socialsData={socialsData} size="24" />
            <ToggleTheme />
            <UserProfile />
          </div>
        </div>
      </nav>
    </header>
  )
}

export { MainNav }
