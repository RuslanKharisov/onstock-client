import UpdateProfileForm from "@/features/update-profile/update-profile-form";
import { Separator } from "@/shared/ui/separator";

export default function ProfilePage() {
  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Профиль</h3>
        <p className="text-sm text-muted-foreground">
          Заполнить или обновить данные
        </p>
      </div>
      <Separator />
      <UpdateProfileForm />
    </main>
  );
}