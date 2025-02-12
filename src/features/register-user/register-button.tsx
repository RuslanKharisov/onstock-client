"use client"

import { useRouter } from "next/navigation"

interface RegisterButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export function RegisterButton({
  children,
  mode = "redirect",
  asChild,
}: RegisterButtonProps) {
  
  const router = useRouter()

  const onClick = () => {
    router.push("/auth/register")
  }

  if (mode === "modal") {
    return <span>TODO: Modal component</span>
  }

  if (asChild) {
    return (
      <>{children}</>
    )
  }

  return (
    <span onClick={onClick} className="coursor-pointer">
      {children}
    </span>
  )
}
