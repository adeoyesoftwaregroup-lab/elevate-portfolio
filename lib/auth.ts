import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  // Use JWT token strategies to keep the application fast and edge-compatible
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // Session auto-destructs after 4 hours of inactivity
  },
  pages: {
    signIn: "/login", // System re-routes unauthenticated triggers to this path
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "System Kernel Authentication",
      credentials: {
        email: { label: "System Identity", type: "email", placeholder: "operator@domain.com" },
        password: { label: "Security Key", type: "password" },
      },
      async authorize(credentials) {
        // 1. Validate incoming operational payloads exist
        if (!credentials?.email || !credentials?.password) {
          throw new Error("ERR_CREDENTIALS_MISSING: Payload vectors incomplete.");
        }

        // 2. Query your Neon PostgreSQL Admin table via our database singleton instance
        const admin = await db.admin.findUnique({
          where: { email: credentials.email },
        });

        // 3. Fail gracefully if the administrator identity doesn't match
        if (!admin) {
          throw new Error("ERR_AUTH_DENIED: Access parameter mismatch.");
        }

        // 4. Verify password validation signatures using deep bcrypt calculations
        const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);

        if (!isPasswordValid) {
          throw new Error("ERR_AUTH_DENIED: Security key invalid.");
        }

        // 5. Return an explicitly structured object payload to populate session parameters
        return {
          id: admin.id,
          email: admin.email,
          name: "System Principal Operator",
        };
      },
    }),
  ],
  callbacks: {
    // Inject the user's secure database ID parameter directly into the JWT token token payload
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Pass the matching token parameters down into the active front-end session instance
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
