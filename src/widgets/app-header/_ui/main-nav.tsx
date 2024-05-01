"use client";
import { useAppSession } from "@/entities/user/session";
import Link from "next/link";

export function MainNav() {
    const session = useAppSession();
    const id = session?.data?.user.id;
    
  return (
    <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row ">
        { id && <Link
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href={`/personal-stock/${id}`}
                >
                    Мой склад
                </Link>
        }
      <Link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/news"
      >
        Новости
      </Link>
    </nav>
  );
}
