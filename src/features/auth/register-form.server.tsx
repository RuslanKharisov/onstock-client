"use server";

import { cn } from "@/shared/ui/utils";
import { EmailRegisterForm } from "./_ui/email-register-form";
import { ProviderButton } from "./_ui/provider-button";
import { Divider } from "./_ui/divider";
import { providers } from "./_api/providers";

export async function RegisterForm({ className }: { className?: string }) {

  return (
    <div className={cn("grid gap-6", className)}>
      <EmailRegisterForm />
      <Divider />
      {providers.map((provider, index) => (
        <ProviderButton key={index} provider={provider} />
      ))}
    </div>
  );
}