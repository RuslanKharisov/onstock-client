import { ResetForm } from "@/features/auth/_ui/reset-form";
import FormWrapper from "@/widgets/form-wraper/form-wrapper";

const ResetPage = () => {
  return ( 
    <div className=" flex h-screen flex-col items-center justify-center">
      <FormWrapper
        headerLabel="Сбросить пароль."
        backButtonLabel="Войти"
        backButtonHref="/auth/login"
      >
        <ResetForm />
      </FormWrapper>
    </div>
   );
}
 
export default ResetPage;