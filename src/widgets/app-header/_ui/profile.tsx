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
import { LogOut, User } from "lucide-react"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import { useAppSession } from "@/entities/user/session"
import { Skeleton } from "@/shared/ui/skeleton"
import { useSignOut } from "@/features/auth/use-sign-out"
import { ProfileAvatar, getProfileDisplayName } from "@/entities/user/profile"
import { LoginButton } from "@/features/auth/login-button"
import { EnterIcon } from "@radix-ui/react-icons"

export function Profile() {
  const session = useAppSession()
  const { signOut, isPending: isLoadingSignOut } = useSignOut()

  if (session.status === "loading") {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  if (session.status === "unauthenticated") {
    return (
      <LoginButton>
        <Button variant={"outline"} >
          <EnterIcon className="mr-2 h-4 w-4" /> Войти
        </Button>
      </LoginButton>
    )
  }

  const user = session?.data?.user

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
            <Link href={`/profile/${user?.id}`}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoadingSignOut}
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
