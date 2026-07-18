import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    // If the token parameter signature fails, drop connection and route here
    signIn: "/login",
  },
});

// Explicit matching matrix blocks unauthorized access at edge level
export const config = {
  matcher: [
    /*
     * Match all administrative layout sub-routes dynamically:
     * - /admin
     * - /admin/projects
     * - /admin/skills
     * - /admin/experience
     *
     * Excludes root operations, assets, and api endpoints from loop interception.
     */
    "/admin/:path*",
  ],
};
