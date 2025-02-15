import { Store, Home, User, Database } from "lucide-react"

export const PrivateMenuItems = [
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
