import Link from "next/link"
import { LogoNew } from "./logo-new"

export function Logo() {
  return (
    <Link className="flex items-center space-x-2" href="/">
      <LogoNew className="h-12 w-12" />
      <span className="inline-block font-bold">Prom-Stock</span>
    </Link>
  )
}
