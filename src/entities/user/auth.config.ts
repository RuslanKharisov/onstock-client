import GitHub from "next-auth/providers/github"
import Yandex from "next-auth/providers/yandex"
import type { NextAuthConfig } from "next-auth"
 
export default { providers: [GitHub, Yandex] } satisfies NextAuthConfig