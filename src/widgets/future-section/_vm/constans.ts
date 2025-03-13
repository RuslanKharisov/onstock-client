import { CableIcon } from "@/shared/icons/cable-icon"
import { ClipboardPenLineIcon } from "@/shared/icons/clipboard-pen-line-icon"
import { DatabaseBackupIcon } from "@/shared/icons/database-backup-icon"
import { HourglassIcon } from "@/shared/icons/hourglass-icon"
import { SearchIcon } from "@/shared/icons/search-icon"

export const features = [
  {
    title: "Удобный Поиск Оборудования",
    text: "Мы делаем сервис удобным и быстрым - каждый день! Оставляйте пожелания и мы их постараемся учесть.",
    icon: SearchIcon,
  },
  {
    title: "Регистрация для Поставщиков",
    text: "Регистрируйтесь и загружайте ваши складские позиции.",
    icon: ClipboardPenLineIcon,
  },
  {
    title: "Прямой Контакт с Поставщиками",
    text: "Связывайтесь с поставщиками и обсуждайте детали напрямую.",
    icon: CableIcon,
  },
  {
    title: "Растущая База Данных",
    text: "Расширяющаяся база данных позволяет находить необходимое оборудование в ниличии",
    icon: DatabaseBackupIcon,
  },
  {
    title: "Экономия Времени и Ресурсов",
    text: "Всё в одном месте! ",
    icon: HourglassIcon,
  },
  {
    title: "Текущая доступность и статус склада",
    text: "Актуальная информация о наличии товаров на складах поставщиков.",
    icon: DatabaseBackupIcon,
  },
]
