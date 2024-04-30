import { AuthOptions } from "next-auth";
import YandexProvider from "next-auth/providers/yandex";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { compact } from "lodash-es";
import { privateConfig } from "@/shared/config/private";
import { createUserUseCase } from "./_use-cases/create-user";

const prismaAdapter = PrismaAdapter(dbClient);

const emailToken = privateConfig.TEST_EMAIL_TOKEN
  ? {
      generateVerificationToken: () => privateConfig.TEST_EMAIL_TOKEN ?? "",
      sendVerificationRequest: () =>
        console.log("we don't send emails in test mode"),
    }
  : {};

export const nextAuthConfig: AuthOptions = {
    adapter: prismaAdapter as AuthOptions["adapter"],
//   adapter: {
//     ...prismaAdapter,
//     createUser: (user) => {
//       return createUserUseCase.exec(user);
//     },
//   } as AuthOptions["adapter"],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  providers: ([
    YandexProvider({
        clientId: process.env.YANDEX_CLIENT_ID ?? "",
        clientSecret: process.env.YANDEX_CLIENT_SECRET ?? "",
      })
  ]),
};