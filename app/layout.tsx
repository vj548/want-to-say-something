import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";

// Fonts: this project uses a local system-font stack (see the CSS
// variables in app/globals.css) so it builds with zero network calls.
// For the exact editorial pairing from the design brief, swap in
// next/font/google:
//
//   import { Fraunces, Inter } from "next/font/google";
//   const display = Fraunces({ subsets: ["latin"], weight: ["400","500","600"], style: ["normal","italic"], variable: "--font-display" });
//   const body = Inter({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-body" });
//
// ...then add `${display.variable} ${body.variable}` to the <html> className below.

export const metadata: Metadata = {
  title: "hey.",
  description: "I could have just said hi... but apparently I decided to build a whole website instead.",
};

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.BACKGROUND_COLOR,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
