import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";

export const nextAuthConfig: AuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    YandexProvider({
        clientId: process.env.YANDEX_CLIENT_ID ?? "",
        clientSecret: process.env.YANDEX_CLIENT_SECRET ?? "",
      })
  ],
    session: { strategy: "jwt" },

    callbacks: {
        async session({ user, session, token }) {
            session.user = token as any;
            session.user.id = user?.id;
            session.user.role = user?.role;
            return Promise.resolve(session);
        },
        
        async jwt({ token, user, account }) {
            const isSignIn = user ? true : false;
            if (isSignIn && account) {
                try {
                    console.log(`Provider ${account.provider} Account >>>>>>>>>>>>>> `, account);
                    const public_url = process.env.NEXT_PUBLIC_API_URL;
                    const response = await fetch(
                        `${public_url}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
                    );
                    const data = await response.json();
                    console.log("Strapi Callback Data >>>>>>>>>>>>>> ", data);
                    token.jwt = data.jwt;
                    token.id = data.user.id;
                } catch (error) {
                    console.error('Fetch failed:', error);
                }
            }
            return Promise.resolve(token);
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string
};

// export { handler as GET, handler as POST };