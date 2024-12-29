"use client"

import { Store, Home, User, Database, LucideIcon } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"
import { SidebarDesktop } from "./sidebar-desktop"
import { SidebarMobile } from "./sidebar-mobile"

export interface IsideBarItems {
  title: string
  url: string
  icon?: LucideIcon
}

const sideBarItems = [
  {
    title: "Home",
    url: "/stock",
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
  const isDesktop = useMediaQuery("(min-width:640px)", {
    initializeWithValue: false,
  })
  console.log("🚀 ~ isDesktop ~ isDesktop:", isDesktop)
  if (isDesktop) return <SidebarDesktop sideBarItems={sideBarItems} />

  return <SidebarMobile sideBarItems={sideBarItems} />
}
