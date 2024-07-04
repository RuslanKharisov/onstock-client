import { NewPasswordForm } from "@/features/auth/_ui/new-password-form";
import FormWrapper from "@/widgets/form-wraper/form-wrapper";

const NewPasswordPage = () => {
  return ( 
    <div className=" flex h-screen flex-col items-center justify-center">
      <FormWrapper
        headerLabel="Придумайте новый пароль."
        backButtonLabel="На станицу входа"
        backButtonHref="/auth/login"
      >
        <NewPasswordForm />
      </FormWrapper>
    </div>
   );
}
 
export default NewPasswordPage;