import { ClientSafeProvider } from "node_modules/next-auth/lib/client"
import { ProviderType } from "next-auth/providers"

// export interface IProviders extends ClientSafeProvider {
//   type: ProviderType
// }

export interface IProviders extends ClientSafeProvider {
  id: string
  name: string
  type: ProviderType
  signinUrl: string
  callbackUrl: string
}
