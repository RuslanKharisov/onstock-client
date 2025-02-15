"use client"

import { LucideIcon } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"
import { SidebarDesktop } from "./_ui/sidebar-desktop"
import { SidebarMobile } from "./_ui/sidebar-mobile"
import { AdminMenuItems } from "./_vm/admin-menu-items"
import { PrivateMenuItems } from "./_vm/privite-menu-items"

export interface IsideBarItems {
  title: string
  url: string
  icon?: LucideIcon
}

interface AppSidebarProps {
  variant?: "privite" | "admin"
}

export function AppSidebar({ variant = "privite" }: AppSidebarProps) {
  const isDesktop = useMediaQuery("(min-width:768px)", {
    initializeWithValue: false,
  })

  const menuItems = variant === "admin" ? AdminMenuItems : PrivateMenuItems

  if (isDesktop) return <SidebarDesktop sideBarItems={menuItems} />

  return <SidebarMobile sideBarItems={menuItems} />
}
