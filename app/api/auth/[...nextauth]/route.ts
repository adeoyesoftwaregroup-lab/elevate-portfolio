// 1. CRITICAL: Force the full Node runtime environment configuration
export const runtime = "nodejs";

// 2. FORCED PARSING BOUNDARY: Ensures environment values exist before any imports process
import "dotenv/config";

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
