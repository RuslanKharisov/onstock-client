import { Button, ButtonProps } from "@/shared/ui/button"
import { SheetClose } from "@/shared/ui/sheet"
import { cn } from "@/shared/ui/utils"
import { LucideIcon} from "lucide-react"
import { ReactNode } from "react"

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon
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
      className={cn("justify-start gap-2 w-full", className)}
      {...props}
    >
      {Icon && <Icon size={20}/>}
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
  );
}

export {SidebarButtonSheet};