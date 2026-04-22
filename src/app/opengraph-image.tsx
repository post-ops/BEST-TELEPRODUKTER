import { ImageResponse } from "next/og";

// Node runtime is more robust on Vercel than edge for OG image generation,
// and our traffic volume doesn't justify edge cold-start optimization.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #0a2540 0%, #05152a 100%)",
          color: "white",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,180,216,0.5), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#22d3ee",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #00b4d8, #0a2540)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: "white",
                fontWeight: 800,
                fontSize: 28,
              }}
            >
              B
            </div>
          </div>
          BEST Teleprodukter
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginTop: 48,
            maxWidth: 960,
          }}
        >
          Pasientvarsling som redder tid og liv
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a5f3fc",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          Markedsledende i Skandinavia på intelligente tilkallings- og alarmsystemer for helsesektoren — siden 1979.
        </div>
      </div>
    ),
    size,
  );
}
