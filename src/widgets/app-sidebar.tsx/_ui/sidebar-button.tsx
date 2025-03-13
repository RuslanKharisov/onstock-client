import { Button, ButtonProps } from "@/shared/ui/button"
import { SheetClose } from "@/shared/ui/sheet"
import { cn } from "@/shared/ui/utils"
import { FC, ReactNode, SVGProps } from "react"

interface SidebarButtonProps extends ButtonProps {
  icon?: FC<SVGProps<SVGSVGElement>>
  className?: string
  children: ReactNode
}

const SidebarButton = ({
  icon: Icon,
  className,
  children,
  ...props
}: SidebarButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start gap-2", className)}
      {...props}
    >
      {Icon && <Icon />}
      <span>{children}</span>
    </Button>
  )
}

export { SidebarButton }

const SidebarButtonSheet = (props: SidebarButtonProps) => {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  )
}

export { SidebarButtonSheet }
