import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Triftly — Explore · Plan · Spend · Share",
  applicationName: "Triftly",
  description:
    "Triftly is your travel world — plan days on the map, split spends with buddies, and keep every trip in one place.",
  metadataBase: new URL("https://www.triftly.app"),
  alternates: { canonical: "/" },
  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
  openGraph: {
    title: "Triftly",
    description: "Explore · Plan · Spend · Share. Your trips. Your world.",
    url: "https://www.triftly.app",
    siteName: "Triftly",
    images: [{ url: "/og.png", width: 1024, height: 1024, alt: "Triftly" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triftly",
    description: "Explore · Plan · Spend · Share. Your trips. Your world.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0D9488",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
