"use client"
import { Button } from "@/shared/ui/button"
import { useOAuthSignIn } from "../_vm/use-oauth-sign-in"
import { IProviders } from "../models/types"

export function ProviderButton({ provider }: { provider: IProviders }) {
  const oauthSignIn = useOAuthSignIn(provider)

  return (
    <Button
      variant="outline"
      type="button"
      disabled={oauthSignIn.isPending}
      onClick={() => oauthSignIn.signIn()}
    >
      {provider.name}
    </Button>
  )
}
