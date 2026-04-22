"use client";

import dynamic from "next/dynamic";
import { HeroFallback } from "./HeroFallback";
import { useIsMobile, usePrefersReducedMotion } from "./hooks";

const SignalOrb = dynamic(
  () => import("./SignalOrb").then((mod) => ({ default: mod.SignalOrb })),
  { ssr: false, loading: () => <HeroFallback /> },
);

export function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  if (reducedMotion || isMobile) {
    return <HeroFallback />;
  }

  return <SignalOrb />;
}
