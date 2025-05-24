import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "MeatballMap",
  description: "A world map application",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MeatballMap",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
}; 