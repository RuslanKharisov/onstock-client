import { Button, ButtonProps } from "@/shared/ui/button"
import { SheetClose } from "@/shared/ui/sheet"
import { cn } from "@/shared/ui/utils"
import { LucideIcon} from "lucide-react"
import { ReactNode } from "react"

interface HeaderSidebarButtonProps extends ButtonProps {
  icon?: LucideIcon
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
      className={cn("justify-start gap-2 w-full", className)}
      {...props}
    >
      {Icon && <Icon size={20}/>}
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
  );
}

export {HeaderSidebarButtonSheet};