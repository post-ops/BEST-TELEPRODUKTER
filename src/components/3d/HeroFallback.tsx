/**
 * Static hero visual used when:
 *  - 3D scene is loading
 *  - user prefers reduced motion
 *  - device is mobile (optional performance fallback)
 *
 * Pure CSS, no JS animation loops, so it's cheap.
 */
export function HeroFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      <div className="absolute inset-0 gradient-dark" aria-hidden />
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />

      {/* Central pulsing device */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan-400/50" aria-hidden />
          <div
            className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan-400/30"
            style={{ animationDelay: "0.8s" }}
            aria-hidden
          />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_0_60px_rgba(0,180,216,0.6)]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative orbit */}
      <svg
        className="absolute inset-0 h-full w-full opacity-50"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <circle cx="200" cy="200" r="140" stroke="rgba(0,180,216,0.35)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="180" stroke="rgba(0,180,216,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 6" />
      </svg>
    </div>
  );
}
