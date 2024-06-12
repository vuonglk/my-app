
import { withAuthMiddleware } from "./authMiddleware";
import { chain } from "./chanMiddleware";
import { withI18nMiddleware } from "./i18nMiddleware";

export default chain([withI18nMiddleware, withAuthMiddleware])

// Apply this middleware to relevant paths
export const config = {
  matcher: [
    "/((?!api|static|\\..*|_next).*)", // Matches all routes except api, static files, hidden files, and Next.js internals
    // "/[locale]/admin/:path*",
    // "/[locale]/login",
  ],
};
