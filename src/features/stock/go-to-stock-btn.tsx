"use client"
import { useRouter } from "next/navigation"

interface ButtonProps {
  children: React.ReactNode
}

export const GoToStockButton = ({
  children
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
 
