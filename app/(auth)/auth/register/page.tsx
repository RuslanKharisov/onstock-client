import FormWrapper from "@/widgets/form-wraper/form-wrapper";
import { RegisterForm } from "@/features/auth/register-form.server";

export default function RegisterPage() {
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <FormWrapper
        headerLabel="Регистрация"
        backButtonLabel="Уже зарегистрированы? Войти."
        backButtonHref="/auth/login"
      >
        <RegisterForm />
      </FormWrapper>
    </div>
  );
}
