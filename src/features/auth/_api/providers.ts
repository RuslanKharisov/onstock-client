import { IProviders } from "../models/types";

export const providers:IProviders[] = [
    {
      id: "yandex",
      name: "Yandex",
      type: "oauth",
      signinUrl: "http://localhost:3000/api/auth/signin/yandex",
      callbackUrl: "http://localhost:3000/api/auth/callback/yandex",
      redirectTo: ""
    },
]
