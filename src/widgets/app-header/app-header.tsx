"use client"

import { MainNav } from "./_ui/main-nav"
import { MobileNav } from "./_ui/mobile-nav"
import { useMediaQuery } from "usehooks-ts"
import { StoreIcon } from "@/shared/icons/store-icon"
import { FC, SVGProps } from "react"
import { UsersIcon } from "@/shared/icons/users-icon"
import { CornerUpLeftIcon } from "@/shared/icons/corner-up-left-icon"

export interface IHeaderItems {
  title: string
  url: string
  icon?: FC<SVGProps<SVGSVGElement>>
}

const headerItems = [
  {
    title: "Главная",
    url: "/",
    icon: CornerUpLeftIcon,
  },
  {
    title: "Cклад",
    url: "/stock",
    icon: StoreIcon,
  },
  {
    title: "Поставщики",
    url: "/supplier",
    icon: UsersIcon,
  },
]

export function AppHeader() {
  const isDesktop = useMediaQuery("(min-width:768px)", {
    initializeWithValue: false,
  })

  if (isDesktop) return <MainNav headerItems={headerItems} />
  return <MobileNav headerItems={headerItems} />
}
