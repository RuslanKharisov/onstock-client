"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import { useSignOut } from "@/features/auth/use-sign-out"
import { ProfileAvatar, getProfileDisplayName } from "@/entities/user/profile"
import { LoginButton } from "@/features/login-user/login-button"
import { EnterIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { UserIcon } from "@/shared/icons/user-icon"
import { LogOutIcon } from "@/shared/icons/log-out-icon"

export function UserProfile() {
  const { signOut, isPending: isLoadingSignOut } = useSignOut()
  const { data: session, update } = useSession()
  const [isSessionUpdated, setIsSessionUpdated] = useState(false)

  useEffect(() => {
    if (!isSessionUpdated && session === null) {
      update()
        .then(() => setIsSessionUpdated(true))
        .catch((error) => console.error("Ошибка при обновлении сессии:", error))
    }
  }, [isSessionUpdated, session, update])

  const user = session?.user

  if (!session?.user) {
    return (
      <LoginButton>
        <Button variant={"outline"}>
          <EnterIcon className="mr-2 h-4 w-4" /> Войти
        </Button>
      </LoginButton>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 self-center rounded-full p-px"
        >
          <ProfileAvatar profile={user} className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 w-56 ">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="overflow-hidden text-ellipsis text-xs text-muted-foreground">
            {user ? getProfileDisplayName(user) : undefined}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile`}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Личный кабинет</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoadingSignOut}
            onClick={() => signOut()}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
