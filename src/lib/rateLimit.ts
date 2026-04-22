import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env, hasRateLimit } from "./env";

let ratelimit: Ratelimit | null = null;

if (hasRateLimit) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: env.upstash.url,
      token: env.upstash.token,
    }),
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
    prefix: "rl:contact",
  });
}

export async function checkRateLimit(identifier: string) {
  if (!ratelimit) return { success: true, remaining: 5 } as const;
  const { success, remaining } = await ratelimit.limit(identifier);
  return { success, remaining } as const;
}
