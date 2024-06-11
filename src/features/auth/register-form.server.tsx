"use server";

import { getProviders } from "next-auth/react";
import { privateConfig } from "@/shared/config/private";
import { cn } from "@/shared/ui/utils";
import { EmailRegisterForm } from "./_ui/email-register-form";
import { ProviderButton } from "./_ui/provider-button";
import { Divider } from "./_ui/divider";

export async function RegisterForm({ className }: { className?: string }) {
  const providers = await getProviders();
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  const testToken = privateConfig.TEST_EMAIL_TOKEN;

  return (
    <div className={cn("grid gap-6", className)}>
      <EmailRegisterForm />
      <Divider />
      {oauthProviders.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}