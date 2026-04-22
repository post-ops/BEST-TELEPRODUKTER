import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match every path except:
  //  - Next.js internals (_next, _vercel)
  //  - Static assets (anything with a dot in it)
  //  - API routes (/api/*)
  //  - Sanity Studio (/studio/*)
  // The root `/` must be explicitly listed so Vercel edge doesn't skip it.
  matcher: [
    "/",
    "/(no|en)/:path*",
    "/((?!_next|_vercel|api|studio|.*\\..*).*)",
  ],
};
