"use server";

import { getProviders } from "next-auth/react";
import { privateConfig } from "@/shared/config/private";
import { Divider } from "./_ui/divider";
import { cn } from "@/shared/ui/utils";
import { ProviderButton } from "./_ui/provider-button";
import { EmailLoginForm } from "./_ui/email-login-form";

export async function LoginForm({ className }: { className?: string }) {
  const providers = await getProviders();
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  const testToken = privateConfig.TEST_EMAIL_TOKEN;

  return (
    <div className={cn("grid gap-6", className)}>
      <EmailLoginForm />
      <Divider />
      {oauthProviders.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}