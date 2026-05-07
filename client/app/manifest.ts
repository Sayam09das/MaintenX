import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MaintenX AI",
    short_name: "MaintenX",
    description:
      "Predictive maintenance dashboard with machine failure prediction, AI guidance, and explainability.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A1018",
    theme_color: "#0A1018",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
