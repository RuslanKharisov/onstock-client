import Link from "next/link"

const PolicyLink = () => {
  return (
    <p className="px-0 text-center text-sm text-muted-foreground">
      Нажимая продолжить вы соглашаетесь с{" "}
      <Link
        href="/terms"
        className="underline underline-offset-4 hover:text-primary"
      >
        Пользовательским соглашением
      </Link>{" "}
      и{" "}
      <Link
        href="/privacy"
        className="underline underline-offset-4 hover:text-primary"
      >
        Политикой конфиденциальности
      </Link>
      .
    </p>
  )
}

export default PolicyLink
