import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

// Accept either a typed next-intl href OR a raw string (e.g. mailto:, tel:, https://)
type AnyHref = ComponentProps<typeof Link>["href"] | string;

interface LinkButtonProps {
  href: AnyHref;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5",
  secondary:
    "bg-white text-navy-900 border border-navy-900/10 hover:border-navy-900/30 hover:bg-paper-alt",
  ghost: "text-navy-900 hover:bg-navy-900/5",
  dark:
    "bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/25 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  children,
  ...props
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const isStringProtocolHref =
    typeof href === "string" &&
    /^(https?:|mailto:|tel:|#)/.test(href);

  if (external || isStringProtocolHref) {
    const isExternalWeb =
      typeof href === "string" && /^https?:\/\//.test(href);
    return (
      <a
        href={href as string}
        target={isExternalWeb ? "_blank" : undefined}
        rel={isExternalWeb ? "noopener noreferrer" : undefined}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href as ComponentProps<typeof Link>["href"]}
      className={classes}
      {...props}
    >
      {children}
    </Link>
  );
}
