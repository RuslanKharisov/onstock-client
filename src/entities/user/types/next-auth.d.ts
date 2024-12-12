import { type DefaultSession } from "next-auth"

declare module "next-auth" {

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string ;
      email: string;
      image?: string | null;
      role: string;
      emailVerified?: Date | null;
    } & DefaultSession["user"];
    backendTokens: {
      accessToken: string;
      refreshToken: string;
    };
    provider?: string;
  }

  interface User {
    picture: string | null | undefined;
    role: string;
    backendTokens: {
      accessToken: string;
      refreshToken: string;
    };
  }

  interface BackendTokens {
    accessToken: string ;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
      role: string;
      emailVerified?: Date | null;
    } & DefaultSession["user"];
    backendTokens: {
      accessToken?: string ;
      refreshToken?: string ;
    };
    provider?: string;
  }
}

