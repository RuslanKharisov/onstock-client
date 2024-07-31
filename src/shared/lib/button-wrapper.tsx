"use client"

import { useRouter } from "next/navigation"

interface ButtonProps {
  children: React.ReactNode
  routeUrl: string
  asChild?:boolean
}

export const ButtonWrapper = ({
  children,
  routeUrl,
  asChild
}: ButtonProps) => {

  const router = useRouter()

  const handleClick = () => {
    router.push(routeUrl)
  }


  return (
    <span onClick={handleClick} className=" coursor-pointer ">
      {children}
    </span>
  )
}