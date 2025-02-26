import {
  Users, FileText, Settings, Factory, User, Store,
  LayoutDashboard,
  CornerUpLeft
} from "lucide-react";

export const AdminMenuItems = [
  {
    title: "На главную",
    url: "/",
    icon: CornerUpLeft,
  },
  {
    title: "Аналитика",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Пользователи и роли",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Поставщики",
    url: "/admin/suppliers",
    icon: Factory,
  },
  {
    title: "Логи и аудит",
    url: "/admin/logs",
    icon: FileText,
  },
  {
    title: "Настройки",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Профиль",
    url: "/profile",
    icon: User,
  },
  {
    title: "Мой склад",
    url: "/personal-stock",
    icon: Store,
  },
];

