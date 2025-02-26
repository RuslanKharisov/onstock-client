import { Store, User, Database, CornerUpLeft } from "lucide-react"

export const PrivateMenuItems = [
  {
    title: "Общий склад",
    url: "/stock",
    icon: CornerUpLeft,
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
