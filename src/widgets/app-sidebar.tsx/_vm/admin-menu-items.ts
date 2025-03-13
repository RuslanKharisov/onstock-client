import { IsideBarItems } from "../_model/ISideBarItems";
import { CornerUpLeftIcon } from "@/shared/icons/corner-up-left-icon";
import { LayoutDashboardIcon } from "@/shared/icons/layout-dashboard-icon";
import { UserIcon } from "@/shared/icons/user-icon";
import { UsersIcon } from "@/shared/icons/users-icon";
import { StoreIcon } from "@/shared/icons/store-icon";
import { SettingsIcon } from "@/shared/icons/settings-icon";
import { FactoryIcon } from "@/shared/icons/factory-icon";
import { FileTextIcon } from "@/shared/icons/file-text-icon";

export const AdminMenuItems: IsideBarItems[] = [
  {
    title: "На главную",
    url: "/",
    icon: CornerUpLeftIcon,
  },
  {
    title: "Аналитика",
    url: "/admin/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Пользователи и роли",
    url: "/admin/users",
    icon: UsersIcon,
  },
  {
    title: "Поставщики",
    url: "/admin/suppliers",
    icon: FactoryIcon,
  },
  {
    title: "Логи и аудит",
    url: "/admin/logs",
    icon: FileTextIcon,
  },
  {
    title: "Настройки",
    url: "/admin/settings",
    icon: SettingsIcon,
  },
  {
    title: "Профиль",
    url: "/profile",
    icon: UserIcon,
  },
  {
    title: "Мой склад",
    url: "/personal-stock",
    icon: StoreIcon,
  },
];

