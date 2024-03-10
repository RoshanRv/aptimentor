import usePrismaClient from "@/store/usePrismaClient";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        // Existing User || null
        const databaseUser = await usePrismaClient
          .getState()
          .prisma.user.findUnique({
            where: {
              email: user.email || "",
            },
          });

        // New User
        if (!databaseUser) {
          await usePrismaClient.getState().prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              image: user.image,
            },
          });
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
