"use client"
import { useRouter } from "next/navigation"

interface ButtonProps {
  children: React.ReactNode
  asChild?: boolean
}

export const GoToStockButton = ({
  children,  
  asChild
}: ButtonProps) => {
  const router = useRouter()
  
  const onClick = () => {
    router.push("/stock")
  }

  return ( 
    <span onClick={onClick} className="coursor-pointer">
      {children}
    </span>
   );
}
 
