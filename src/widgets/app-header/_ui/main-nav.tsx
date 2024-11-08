"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"

export function MainNav({ role }: { role: Role | undefined }) {
  const session = useSession()

  return (
    <nav className="flex flex-col items-start gap-6 text-sm font-medium md:flex-row md:items-center ">
      <Link
        className="text-foreground/60 transition-colors hover:text-foreground/80"
        href={`/stock`}
      >
        Онлайн склад
      </Link>
      {role === "ADMIN" && (
        <Link
          className="text-foreground/60 transition-colors hover:text-foreground/80"
          href="/settings"
        >
          Консоль
        </Link>
      )}
    </nav>
  )
}
