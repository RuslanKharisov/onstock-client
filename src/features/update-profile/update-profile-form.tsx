"use client";
import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./_ui/profile-form";
import { Spinner } from "@/shared/ui/spinner";
import { useRouter } from "next/navigation";

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: string;
  callbackUrl?: string;
}) {

  const router = useRouter();
  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

//   if (profileQuery.isPending) {  
//     return <Spinner aria-label="Загрузка профиля" />;
//   }

  if (!false) {  
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
  }


  return (
    <h2></h2>
    // <ProfileForm
    //   userId={userId}
    //    profile={profileQuery.data.profile}
    //    onSuccess={handleSuccess}
    //   submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    // />
  );
}