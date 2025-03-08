import { cn } from "@/shared/ui/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted bg-gradient-to-r from-primary/40 to-success/40 opacity-70",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
