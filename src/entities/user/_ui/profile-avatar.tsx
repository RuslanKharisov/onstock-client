import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { User } from "lucide-react"
import { SessionUser } from "../types/types"
import { cn } from "@/shared/ui/utils"

export const ProfileAvatar = ({
  profile,
  className,
}: {
  profile?: SessionUser
  className?: string
}) => {
  if (!profile) {
    return null
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={profile.image ?? ""} className="object-cover" />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  )
}
