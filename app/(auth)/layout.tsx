import { AppHeader } from "@/widgets/app-header/app-header";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader variant="auth" />
      {children}
    </>
  );
}