import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { hasSanity } from "@/lib/env";

type SanityImageRef = {
  asset?: { _ref?: string };
  alt?: string;
};

interface SanityImageProps {
  image?: SanityImageRef | null | undefined;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallback?: string;
}

export function SanityImage({
  image,
  alt,
  width = 1200,
  height = 800,
  className,
  priority,
  sizes,
  fallback,
}: SanityImageProps) {
  if (!image?.asset?._ref || !hasSanity) {
    if (fallback) {
      return (
        <Image
          src={fallback}
          alt={alt ?? ""}
          width={width}
          height={height}
          className={className}
          priority={priority}
          sizes={sizes}
        />
      );
    }
    return (
      <div
        className={`${className ?? ""} flex items-center justify-center bg-gradient-to-br from-navy-100 to-cyan-100 text-navy-900/30`}
        style={{ aspectRatio: `${width} / ${height}` }}
        aria-hidden
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    );
  }

  const src = urlFor(image)
    .width(width)
    .height(height)
    .auto("format")
    .url();

  return (
    <Image
      src={src}
      alt={alt ?? image.alt ?? ""}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
