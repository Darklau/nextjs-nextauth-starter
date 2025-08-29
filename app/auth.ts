import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // или argon2
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email и пароль обязательны");
        }

        console.log(credentials);

        return {
          credentials,
          id: "hello",
        };
      },
    }),
  ],
  callbacks: {
    session({ user, session }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};
