"use client"
import { useAppSession } from "@/entities/user/session"
import Link from "next/link"

export function MainNav() {
  const session = useAppSession()
  const id = session?.data?.user.id

  return (
    <nav className="flex flex-col items-start gap-6 text-sm font-medium md:flex-row md:items-center ">
      {id && (
        <Link
          className="text-foreground/60 transition-colors hover:text-foreground/80"
          href={`/personal-stock/${id}`}
        >
          Мой склад
        </Link>
      )}
      <Link
        className="text-foreground/60 transition-colors hover:text-foreground/80"
        href="/news"
      >
        Новости
      </Link>
    </nav>
  )
}
