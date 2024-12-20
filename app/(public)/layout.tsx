import { Footer } from "@/widgets/app-footer";
import { AppHeader } from "@/widgets/app-header/app-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
        {children}
      <Footer/>
    </>
  );
}