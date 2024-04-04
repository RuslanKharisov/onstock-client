// "use client";

import { getUserProfile } from "@/entities/user/_actions/get-user-profile";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default async function AuthorizedGuard({
  children,
}: {
  children: React.ReactNode;
}) {
    const user = await getUserProfile();
    
    const isUnauthenticated = user.ok === false;
    if (isUnauthenticated) redirect(`/auth/sign-in`);

  return (
    <>
      {user.ok === true && children}
    </>
  );
}