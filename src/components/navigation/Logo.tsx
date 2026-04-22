import { Link } from "@/i18n/routing";

export function Logo({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const textColor = variant === "light" ? "text-navy-900" : "text-white";
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${textColor}`}
      aria-label="Best Teleprodukter — forside"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        aria-hidden
        className="transition-transform duration-500 group-hover:rotate-12"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B4D8" />
            <stop offset="100%" stopColor="#0A2540" />
          </linearGradient>
        </defs>
        <rect
          x="3"
          y="3"
          width="30"
          height="30"
          rx="8"
          fill="url(#logoGrad)"
        />
        <path
          d="M11 11h8a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-8V11Zm0 8h9a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-9V19Z"
          fill="white"
          opacity="0.95"
        />
        <circle cx="26" cy="10" r="2" fill="#00B4D8" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight">BEST</span>
        <span
          className={`text-[9px] font-medium tracking-[0.2em] ${
            variant === "light" ? "text-ink-muted" : "text-navy-200/80"
          }`}
        >
          TELEPRODUKTER
        </span>
      </div>
    </Link>
  );
}
