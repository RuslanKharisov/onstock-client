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
  const profileQuery = useQuery({
    ...getProfileQuery(userId),
    retry: 0,
  });

  const router = useRouter();
  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  if (profileQuery.isPending) {
    return <Spinner aria-label="Загрузка профиля" />;
  }

  if (!profileQuery.data) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
  }

  console.log(profileQuery.data)

  return (
    <ProfileForm
      userId={userId}
      profile={profileQuery.data.profile}
      onSuccess={handleSuccess}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}