import type { Metadata } from "next"
import "@/globalStyles*"
import { Roboto } from "next/font/google"
import { cn } from "@/shared/ui/utils"
import { AppProvider } from "../src/app/_providers/app-provider"
import YandexMetrikaContainer from "@/shared/lib/YandexMetrika"

const analyticsEnabled = !!(process.env.NODE_ENV === "production")

export const metadata: Metadata = {
  title: "Оборудование и комплектующие в наличии на складах в России",
  description:
    "Поиск оборудования и запасных частей на складах Российских компаний по всей стране",
}

const roboto = Roboto({
  style: ["normal"],
  weight: ["100", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen bg-background antialiased ",
          `${roboto.className}`,
        )}
      >
        <AppProvider>{children}</AppProvider>

        <YandexMetrikaContainer enabled={analyticsEnabled} />
      </body>
    </html>
  )
}
