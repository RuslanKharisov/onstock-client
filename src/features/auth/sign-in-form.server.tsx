"use server";

import { EmailSignInForm } from "./_ui/email-sign-in-form";

export async function SignInForm({ className }: { className?: string }) {
  return <EmailSignInForm />
}
