import {
  Home, Users, FileText, Settings, Factory
} from "lucide-react";

export const AdminMenuItems = [
  {
    title: "Главная",
    url: "/admin/dashboard",
    icon: Home,
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
];

