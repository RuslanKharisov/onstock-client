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
  variant: "USER" | "ADMIN" | undefined
}

export function AppSidebar({ variant = "USER" }: AppSidebarProps) {
  const isDesktop = useMediaQuery("(min-width:768px)", {
    initializeWithValue: false,
  })

  const menuItems = variant === "ADMIN" ? AdminMenuItems : PrivateMenuItems

  if (isDesktop) return <SidebarDesktop sideBarItems={menuItems} />

  return <SidebarMobile sideBarItems={menuItems} />
}
