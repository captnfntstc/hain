import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hain — Budget-First Pinoy Ulam Planner",
  description:
    "Hain (from the Filipino word meaning 'to serve' or 'to set the table') is a mobile-first PWA acting as a budget-first daily ulam planner and automated palengke grocery shopping list generator tailored for Philippine households.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hain",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#B8381D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tl" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
