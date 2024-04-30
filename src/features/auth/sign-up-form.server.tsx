"use server";

import { EmailSignUpForm } from "./_ui/email-sign-up-form";

export async function SignUpForm({ className }: { className?: string }) {
  return <EmailSignUpForm />

}
