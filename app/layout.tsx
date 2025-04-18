import type { Metadata } from "next"
import "@/globalStyles*"
import { cn } from "@/shared/ui/utils"
import { AppProvider } from "../src/app/_providers/app-provider"
import YandexMetrikaContainer from "@/shared/lib/YandexMetrika"

export const metadata: Metadata = {
  title: "Оборудование и комплектующие в наличии на складах в России",
  description:
    "Промышленный склад: Агрегатор оборудования для АСУ ТП, КИП и автоматизации производств",
  openGraph: {
    title: "Онлайн склад | Prom-Stock",
    description: "Онлайн каталог оборудования промышленной автоматизации...",
    url: "https://prom-stock.ru",
    siteName: "Prom-Stock",
    images: [
      {
        url: "https://prom-stock.ru/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Prom-Stock Preview",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const analyticsEnabled = !!(process.env.NODE_ENV === "production")
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={cn("h-screen bg-background antialiased ")}>
        <AppProvider>{children}</AppProvider>

        <YandexMetrikaContainer enabled={analyticsEnabled} />
      </body>
    </html>
  )
}
