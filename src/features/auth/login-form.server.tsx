"use server"

import { Divider } from "./_ui/divider"
import { cn } from "@/shared/ui/utils"
import { ProviderButton } from "./_ui/provider-button"
import { EmailLoginForm } from "./_ui/email-login-form"
import { providers } from "./_api/providers"

export async function LoginForm({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-6", className)}>
      <EmailLoginForm />
      <Divider />
      {providers.map((provider, index) => (
        <ProviderButton key={index} provider={provider} />
      ))}
    </div>
  )
}
