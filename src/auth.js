import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const payload = new URLSearchParams({
          username: credentials.email,
          password: credentials.password,
        });
        try {
          const res = await fetch(`${process.env.BASE_URL}/auth/token`, {
            method: "POST",
            body: payload.toString(),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          });
          console.log(res);
          if (!res.ok) {
            console.error("Failed to authenticate:", res.statusText);
            return null;
          }
          const user = await res.json();
          console.log("this is user", user);
          return user ? user : null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("this is callback :", user);
      if (account && user) {
        return {
          ...token,
          accessToken: user.access_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
});
