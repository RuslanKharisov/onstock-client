import { getUserProfile } from "@/entities/user/get-user-profile";
import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";
import { Separator } from "@/shared/ui/separator";

export default async function ProfilePage({ params }: { params: { id: string } }) {

    const profile = await getUserProfile()

  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Профиль</h3>
        <p className="text-sm text-muted-foreground">
          Это как другие пользователи видят вас на сайте
        </p>
         <h3>Мой Id: <span>{params.id}</span> </h3> 
      </div>
      <Separator />
      <UpdateProfileForm profile={profile} userId={params.id} />
    </main>
  );
}