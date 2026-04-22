import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude Next.js internals, Sanity Studio, API routes, and static assets
  matcher: "/((?!api|studio|_next|_vercel|.*\\..*).*)",
};
