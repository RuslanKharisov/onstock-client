"use server";

import { EmailSignInForm } from "./_ui/email-sign-in-form";

export async function SignInForm({ className }: { className?: string }) {
  const providers = await getProviders();
  console.log("🚀 ~ SignInForm ~ providers:", providers)
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  const testToken = privateConfig.TEST_EMAIL_TOKEN;

  return (
    <div className={cn("grid gap-6", className)}>
      {testToken ? (
        <TestEmailSignInForm testToken={testToken} />
      ) : (
        <EmailSignInForm />
      )}
      <Divider />
      {oauthProviders.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}