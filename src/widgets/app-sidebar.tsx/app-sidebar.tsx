"use client"

import { useMediaQuery } from "usehooks-ts"
import { SidebarDesktop } from "./_ui/sidebar-desktop"
import { SidebarMobile } from "./_ui/sidebar-mobile"
import { AdminMenuItems } from "./_vm/admin-menu-items"
import { PrivateMenuItems } from "./_vm/privite-menu-items"
import { FC, SVGProps } from "react"
import { DocsMenuItems } from "./_vm/docs-menu-items"

export interface IsideBarItems {
  title: string
  url: string
  icon?: FC<SVGProps<SVGSVGElement>>
}

interface AppSidebarProps {
  variant: "USER" | "ADMIN" | "DOCSMENU" | undefined
}

export function AppSidebar({ variant = "USER" }: AppSidebarProps) {
  const isDesktop = useMediaQuery("(min-width:768px)", {
    initializeWithValue: false,
  })

  const menuItems =
    variant === "ADMIN"
      ? AdminMenuItems
      : variant === "DOCSMENU"
        ? DocsMenuItems
        : PrivateMenuItems

  if (isDesktop) return <SidebarDesktop sideBarItems={menuItems} />

  return <SidebarMobile sideBarItems={menuItems} />
}
