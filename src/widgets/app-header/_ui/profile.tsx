// "use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { LogoutButton } from "@/features/auth/_ui/logout-button";
import { getUserProfile } from "@/entities/user/get-user-profile";
import { ProfileAvatar } from "@/entities/user/_ui/profile-avatar";

export async function Profile() {
  const session = await getUserProfile();
  const user = session?.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-px border rounded-full self-center h-8 w-8 dark:bg-slate-400"
        >
          <ProfileAvatar profile={user} className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 ">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="pt-2 text-xs text-muted-foreground overflow-hidden text-ellipsis">
            {user ? user.username : undefined}
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
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
