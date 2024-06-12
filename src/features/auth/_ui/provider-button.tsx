"use client"
import { Button } from "@/shared/ui/button"
import { Spinner } from "@/shared/ui/spinner"
import { useOAuthSignIn } from "../_vm/use-oauth-sign-in"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
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
