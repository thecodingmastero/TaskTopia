import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskTopia — Chores become adventures",
  description:
    "The family chore app where completing real-life tasks builds an exciting fantasy world. Fun for kids, simple for parents.",
  keywords: ["chores", "kids", "family", "rewards", "adventure", "game"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7e22ce" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1e35" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
