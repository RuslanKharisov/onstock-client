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

//   const isLoading =
//     session.status === "loading" || session.status === "unauthenticated";

  return (
    <>
      {/* <FullPageSpinner isLoading={isLoading} /> */}
      {user.ok === true && children}
    </>
  );
}