"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LinkButton } from "@/components/ui/LinkButton";
import { MenuIcon, XIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "products", href: "/produkter" as const, matchPrefix: "/produkter" },
  {
    key: "solutions",
    href: {
      pathname: "/losninger/[slug]" as const,
      params: { slug: "sykehus" },
    },
    matchPrefix: "/losninger",
  },
  { key: "references", href: "/referanser" as const, matchPrefix: "/referanser" },
  { key: "support", href: "/support" as const, matchPrefix: "/support" },
  { key: "careers", href: "/karriere" as const, matchPrefix: "/karriere" },
  { key: "about", href: "/om" as const, matchPrefix: "/om" },
];

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const isDark = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isDark
          ? "bg-transparent"
          : "border-b border-navy-900/5 bg-white/85 backdrop-blur-xl shadow-sm",
      )}
    >
      <div className="container-prose flex h-16 items-center justify-between md:h-20">
        <Logo variant={isDark ? "dark" : "light"} />
        <nav
          aria-label="Hovednavigasjon"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.matchPrefix);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? isDark
                      ? "text-cyan-300"
                      : "text-cyan-600"
                    : isDark
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-navy-900/80 hover:text-navy-900 hover:bg-navy-900/5",
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher variant={isDark ? "dark" : "light"} />
          <LinkButton href="/kontakt" size="sm">
            {tCommon("contactUs")}
          </LinkButton>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            isDark
              ? "text-white hover:bg-white/10"
              : "text-navy-900 hover:bg-navy-900/5",
          )}
          aria-label={mobileOpen ? tCommon("close") : tCommon("menu")}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-navy-900/5 bg-white lg:hidden">
          <nav
            aria-label="Mobilnavigasjon"
            className="container-prose flex flex-col gap-1 py-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-navy-900 hover:bg-navy-900/5"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 px-4 pt-3">
              <LocaleSwitcher />
              <LinkButton href="/kontakt" size="sm">
                {tCommon("contactUs")}
              </LinkButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
