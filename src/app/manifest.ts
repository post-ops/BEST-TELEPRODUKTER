import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Best Teleprodukter",
    short_name: "BEST",
    description:
      "Intelligent pasientvarsling og kommunikasjonsløsninger for helsesektoren",
    start_url: "/",
    display: "standalone",
    background_color: "#0A2540",
    theme_color: "#00B4D8",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        src: "/apple-icon.svg",
        type: "image/svg+xml",
        sizes: "180x180",
      },
    ],
  };
}
