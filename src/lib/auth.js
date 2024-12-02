// authOptions in src/pages/api/auth/[...nextauth].ts or src/app/api/auth/[...nextauth].ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db"; // Adjust the import as per your db setup
import { compare } from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(credentials.password, existingUser.password);
        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id,  // Return user ID
          name: existingUser.name,
          email: existingUser.email,
          address: existingUser.address,
          phone: existingUser.phoneNumber,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,  // Store user ID in JWT token
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,  // Pass user ID to session
          name: token.name,
          email: token.email,
          address: token.address,
          phone: token.phone,
        },
      };
    },
  },
};
