"use client"
import { cn } from "@/shared/ui/utils"
import { useRouter } from "next/navigation"

interface ButtonProps {
  children: React.ReactNode
  className?: string
}

export const GoToStockButton = ({
  children,
  className
}: ButtonProps) => {
  const router = useRouter()
  
  const onClick = () => {
    router.push("/stock")
  }

  return ( 
    <span onClick={onClick} className={cn("coursor-pointer", className)}>
      {children}
    </span>
   );
}
 
