import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alfi Tsani - Frontend Developer Portfolio",
    template: "%s | Alfi Tsani",
  },
  description:
    "Portfolio website of Alfi Tsani, a Junior Frontend Developer specializing in Next.js, TypeScript, and modern web development.",
  keywords: [
    "Alfi Tsani",
    "Frontend Developer",
    "Web Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Portfolio",
    "Indonesia",
    "Malang",
  ],
  authors: [{ name: "Alfi Tsani", url: "https://github.com/alfitsani" }],
  creator: "Alfi Tsani",
  metadataBase: new URL("https://alfitsani.my.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alfitsani.my.id",
    siteName: "Alfi Tsani Portfolio",
    title: "Alfi Tsani - Frontend Developer Portfolio",
    description:
      "Junior Frontend Developer specializing in Next.js, TypeScript, and modern web development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alfi Tsani - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfi Tsani - Frontend Developer Portfolio",
    description:
      "Junior Frontend Developer specializing in Next.js, TypeScript, and modern web development.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code",
  },
};

import CustomCursor from "@/shared/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <SpeedInsights />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
