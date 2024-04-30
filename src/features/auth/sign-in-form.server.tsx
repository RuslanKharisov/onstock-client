"use server";

import { getProviders } from "next-auth/react";
import { EmailSignInForm } from "./_ui/email-sign-in-form";
import { privateConfig } from "@/shared/config/private";
import { Divider } from "./_ui/divider";
import { cn } from "@/shared/ui/utils";
import { ProviderButton } from "./_ui/provider-button";

export async function SignInForm({ className }: { className?: string }) {
  const providers = await getProviders();
  console.log("🚀 ~ SignInForm ~ providers:", providers)
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  const testToken = privateConfig.TEST_EMAIL_TOKEN;

  return (
    <div className={cn("grid gap-6", className)}>
      <EmailSignInForm />
      <Divider />
      {oauthProviders.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}