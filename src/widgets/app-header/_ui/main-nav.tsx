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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav>
        <div className="container flex  h-14 items-center gap-12">
          <div className="mr-4 hidden md:flex">
            <Logo />
          </div>
          <div className="flex flex-1 items-center gap-7">
            {headerItems.map((item, idx) => (
              <Link
                key={idx}
                className={` ${pathname === item.url ? "text-destructive/70" : "text-foreground/60"}  transition-colors hover:text-destructive`}
                href={item.url}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-end space-x-3 ">
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
