"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { User } from "lucide-react"
import { UserEntity } from "../types/types"
import { cn } from "@/shared/ui/utils"

export const ProfileAvatar = ({
  profile,
  className,
}: {
  profile?: UserEntity
  className?: string
}) => {
  if (!profile) {
    return null
  }
  
  console.log("🚀 ~ profile:", profile)
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={profile.image ?? ""} className="object-cover" />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  )
}
