import { CornerUpLeftIcon } from "@/shared/icons/corner-up-left-icon"
import { StoreIcon } from "@/shared/icons/store-icon"
import { UserIcon } from "@/shared/icons/user-icon"
import { IsideBarItems } from "../_model/ISideBarItems"
import { RussianRubleIcon } from "@/shared/icons/russian-ruble-icon"

export const PrivateMenuItems: IsideBarItems[] = [
  {
    title: "Общий склад",
    url: "/stock",
    icon: CornerUpLeftIcon,
  },
  {
    title: "Мой склад",
    url: "/personal-stock",
    icon: StoreIcon,
  },
  {
    title: "Профиль",
    url: "/profile",
    icon: UserIcon,
  },
  {
    title: "Тарифы",
    url: "/prising",
    icon: RussianRubleIcon,
  },
]
