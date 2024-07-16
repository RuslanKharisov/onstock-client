import type { Metadata } from "next"
import "@/globalStyles*"
import { Inter, Roboto_Mono } from "next/font/google"
import { cn } from "@/shared/ui/utils"
import { AppProvider } from "../src/app/_providers/app-provider"
import { auth } from "@/entities/user/auth"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: "Оборудование и комплектующие в наличии на складах в России",
  description:
    "Поиск оборудования и запасных частей на складах Российских компаний по всей стране",
}

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
})

const roboto_mono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto-mono",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          `${roboto_mono.variable}`,
        )}
      >
        <SessionProvider session={session} >
          <AppProvider>{children}</AppProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
