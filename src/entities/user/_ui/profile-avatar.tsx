"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { cn } from "@/shared/ui/utils"
import { Profile } from "../types/types"
import { UserIcon } from "@/shared/icons/user-icon"

export const ProfileAvatar = ({
  profile,
  className,
}: {
  profile?: Profile
  className?: string
}) => {
  if (!profile) {
    return null
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={profile.image ?? ""} className="object-cover" />
      <AvatarFallback>
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  )
}
