import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt";

declare module "next-auth" {


  //   interface Session {
  //   user: {
  //     role: ROLE
  //     isTwoFactorEnabled: boolean
  //     isOAuth: boolean
  //   } & DefaultSession["user"]
  // }

  interface Session {
    user: {
      id: string;
      name?: string | null | undefined;
      email: string;
      image: string | null;
      role: string;
      emailVerified?: Date | null;
    } & DefaultSession["user"];
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }

  interface User {
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
      role: string;
      emailVerified?: Date | null;
    } & DefaultSession["user"];
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}