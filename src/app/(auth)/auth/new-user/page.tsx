import { getAppSessionServer } from "@/entities/user/session.server";
import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";
import { Separator } from "@/shared/ui/separator";
import { redirect } from "next/navigation";

export default async function NewUserPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await getAppSessionServer();
  console.log("🚀 ~ session:", session)

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Последний шаг</h3>
        <p className="text-sm text-muted-foreground">
          Обновите профиль, это как другие пользователи увидят вас на сайте
        </p>
      </div>
      <Separator />
      <UpdateProfileForm
        userId={session.user.id}
        callbackUrl={searchParams.callbackUrl}
      />
    </main>
  );
}