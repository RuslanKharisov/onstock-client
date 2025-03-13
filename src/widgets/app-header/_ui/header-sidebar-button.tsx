import { Button, ButtonProps } from "@/shared/ui/button"
import { SheetClose } from "@/shared/ui/sheet"
import { cn } from "@/shared/ui/utils"
import { FC, ReactNode, SVGProps } from "react"

interface HeaderSidebarButtonProps extends ButtonProps {
  icon?: FC<SVGProps<SVGSVGElement>>
  className?: string
  children: ReactNode
}

const HeaderSidebarButton = ({
  icon: Icon,
  className,
  children,
  ...props
}: HeaderSidebarButtonProps) => {
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

export { HeaderSidebarButton }

const HeaderSidebarButtonSheet = (props: HeaderSidebarButtonProps) => {
  return (
    <SheetClose asChild>
      <HeaderSidebarButton {...props} />
    </SheetClose>
  )
}

export { HeaderSidebarButtonSheet }
