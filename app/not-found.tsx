import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-6xl font-bold text-primary/90">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="mb-8 text-foreground/80">
        Oй! Страница, которую вы ищете, не существует..
      </p>
      <Link
        href="/"
        className="rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/80"
      >
        Вернуться на главную
      </Link>
    </div>
  )
}
