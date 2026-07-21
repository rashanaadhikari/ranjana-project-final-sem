import type { Metadata } from "next";
import "./globals.css";

import BottomNavbar from "./components/BottomNavbar";

export const metadata: Metadata = {
  // title: "RoomHunt – Discover Perfect Rooms Near You",
  // description:
  //   "RoomHunt is a property rental marketplace helping you discover rooms, flats, and office spaces near you. Filter by location, budget, and room type.",

  title: {
    default: "RoomHunt – Discover Perfect Rooms Near You",
    template: "%s | RoomHunt",
  },
  description: "RoomHunt is a property rental marketplace helping you discover rooms, flats, and office spaces near you. Filter by location, budget, and room type.",
  icons: {
    icon: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased pb-24 md:pb-32">
        {children}
        <BottomNavbar />
      </body>
    </html>
  );
}
