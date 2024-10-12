import type { Metadata } from "next"
import "@/globalStyles*"
import { Roboto_Mono } from "next/font/google"
import { cn } from "@/shared/ui/utils"
import { AppProvider } from "../src/app/_providers/app-provider"


export const metadata: Metadata = {
  title: "Оборудование и комплектующие в наличии на складах в России",
  description:
    "Поиск оборудования и запасных частей на складах Российских компаний по всей стране",
}

const roboto_mono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto-mono",
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased ",
          `${roboto_mono.variable}`,
        )}
        >
          <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
