import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className,
  ...props
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest",
            isDark ? "text-cyan-300" : "text-cyan-600",
          )}
        >
          <span
            className={cn(
              "h-1 w-6 rounded-full",
              isDark ? "bg-cyan-300" : "bg-cyan-500",
            )}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-bold md:text-4xl lg:text-5xl",
          isDark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-pretty text-lg max-w-2xl",
            isDark ? "text-navy-100/80" : "text-ink-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
