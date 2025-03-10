"use client"

import { MainNav } from "./_ui/main-nav"
import { Home, LucideIcon, Store } from "lucide-react"
import { MobileNav } from "./_ui/mobile-nav"
import { useMediaQuery } from "usehooks-ts"

export interface IHeaderItems {
  title: string
  url: string
  icon?: LucideIcon
}

const headerItems = [
  {
    title: "Главная",
    url: "/",
    icon: Home,
  },
  {
    title: "Cклад",
    url: "/stock",
    icon: Store,
  },
  {
    title: "Поставщики",
    url: "/supplier",
    icon: Store,
  },
]

export function AppHeader() {
  const isDesktop = useMediaQuery("(min-width:768px)", {
    initializeWithValue: false,
  })

  if (isDesktop) return <MainNav headerItems={headerItems} />
  return <MobileNav headerItems={headerItems} />
}
