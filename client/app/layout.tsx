import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeRegistry } from "../components/ThemeRegistry";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mainten-x.vercel.app"),
  title: {
    default: "MaintenX AI",
    template: "%s | MaintenX AI",
  },
  description:
    "Predictive maintenance dashboard with machine failure prediction, AI guidance, and explainability for industrial teams.",
  applicationName: "MaintenX AI",
  keywords: [
    "predictive maintenance",
    "machine failure prediction",
    "industrial AI",
    "maintenance dashboard",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "MaintenX" }],
  creator: "MaintenX",
  publisher: "MaintenX",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://mainten-x.vercel.app",
    title: "MaintenX AI",
    description:
      "Predictive maintenance dashboard with machine failure prediction, AI guidance, and explainability for industrial teams.",
    siteName: "MaintenX AI",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MaintenX AI predictive maintenance dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MaintenX AI",
    description:
      "Predictive maintenance dashboard with machine failure prediction, AI guidance, and explainability for industrial teams.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
