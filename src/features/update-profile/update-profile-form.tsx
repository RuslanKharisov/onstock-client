"use client";
import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./_ui/profile-form";
import { Spinner } from "@/shared/ui/spinner";
import { useRouter } from "next/navigation";

export function UpdateProfileForm({
  userId,
  callbackUrl,
  profile
}: {
  userId: string;
  callbackUrl?: string;
  profile?:{
    ok: boolean;
    data:any;
    error: any;
  }
}) {

  console.log("🚀 ~ profile:", profile)

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
    <h2>{profile?.ok}</h2>
    // <ProfileForm
    //   userId={userId}
    //    profile={profileQuery.data.profile}
    //    onSuccess={handleSuccess}
    //   submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    // />
  );
}