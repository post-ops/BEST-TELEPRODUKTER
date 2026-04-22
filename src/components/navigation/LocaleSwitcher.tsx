"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { GlobeIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (next: string) => {
    if (next === locale) return;
    // The returned pathname is the pattern (e.g. "/produkter/[slug]") — next-intl
    // preserves dynamic params automatically when we reuse it. The typed router
    // is strict about concrete-vs-pattern, so we relax the type here.
    router.replace(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pathname as any,
      { locale: next as (typeof routing.locales)[number] },
    );
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border px-1 py-1 text-sm",
        variant === "light"
          ? "border-navy-900/10 text-navy-900"
          : "border-white/20 text-white/90",
      )}
    >
      <GlobeIcon size={16} className="ml-2 opacity-60" />
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => onChange(loc)}
          aria-current={locale === loc}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors",
            locale === loc
              ? variant === "light"
                ? "bg-navy-900 text-white"
                : "bg-white text-navy-900"
              : "hover:bg-navy-900/5",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
