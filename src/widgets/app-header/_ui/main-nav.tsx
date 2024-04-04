// "use client";

import { getUserProfile } from "@/entities/user/_actions/get-user-profile";
import Link from "next/link";

export async function MainNav() {
    const session =  await getUserProfile();
    const user = session?.data;
    
  return (
    <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row ">
      <Link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href={`/personal-stock/${user?.id}`}
      >
        Мой склад
      </Link>
      <Link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/news"
      >
        Новости
      </Link>
    </nav>
  );
}
