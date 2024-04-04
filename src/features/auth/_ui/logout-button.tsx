
import { logoutAction } from "@/entities/user/_actions/auth-actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="flex">
        <LogOut className="w-4 h-4 hover:text-primary mr-2" />
        <span>Выход</span>
      </button>
    </form>
  );
}