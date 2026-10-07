import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import {
  SCROLL_SESSION_KEY,
  SCROLL_SESSION_TTL,
} from "@/shared/components/motion/scrollSession";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const akiraExpanded = localFont({
  src: "../../public/font/Akira Expanded Demo.otf",
  variable: "--font-akira",
  display: "swap",
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
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "16x16 32x32 48x48",
      },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code",
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
      suppressHydrationWarning
      data-portfolio-bootstrap-mode="initial"
      className={`${geistSans.variable} ${geistMono.variable} ${akiraExpanded.variable}`}
      style={{ backgroundColor: "#12110d" }}
    >
      <head>
        <Script id="portfolio-scroll-restoration" strategy="beforeInteractive">
          {`(() => {
            try {
              const navigation = performance.getEntriesByType("navigation")[0];
              const shouldRestore = navigation && (navigation.type === "reload" || navigation.type === "back_forward");
              const isReload = navigation?.type === "reload";

              if (!shouldRestore) {
                document.documentElement.dataset.portfolioBootstrapMode = "initial";
                if ("scrollRestoration" in window.history) window.history.scrollRestoration = "auto";
                return;
              }

              const snapshot = JSON.parse(sessionStorage.getItem("${SCROLL_SESSION_KEY}") || "null");
              const isValid = snapshot &&
                snapshot.pathname === window.location.pathname &&
                Number.isFinite(snapshot.scrollY) &&
                snapshot.scrollY >= 0 &&
                Number.isFinite(snapshot.savedAt) &&
                Date.now() - snapshot.savedAt >= 0 &&
                Date.now() - snapshot.savedAt <= ${SCROLL_SESSION_TTL};

              if (!isValid) {
                document.documentElement.dataset.portfolioBootstrapMode = "initial";
                if (isReload) {
                  window.__tsanPortfolioReloadIntroPending = true;
                }
                if ("scrollRestoration" in window.history) window.history.scrollRestoration = "auto";
                return;
              }

              if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
              window.__tsanPortfolioScrollSession = snapshot;
              document.documentElement.dataset.portfolioBootstrapMode = "restore";

              const restoreSurface = ["hero", "light", "dark", "contact"].includes(snapshot.surface)
                ? snapshot.surface
                : snapshot.scrollY < window.innerHeight
                  ? "hero"
                  : "dark";
              document.documentElement.dataset.restoreSurface = restoreSurface;
              const restoreBackground =
                restoreSurface === "light"
                  ? "#ffffff"
                  : restoreSurface === "contact"
                    ? "#000000"
                    : "#12110d";
              document.documentElement.style.backgroundColor = restoreBackground;
              document.documentElement.style.setProperty(
                "--portfolio-bootstrap-background",
                restoreBackground,
              );

              if (isReload && snapshot.scrollY <= 20) {
                window.__tsanPortfolioReloadIntroPending = true;
              }

              if (snapshot.scrollY > 0) {
                document.documentElement.dataset.scrollRestoring = "true";
                window.setTimeout(() => {
                  delete document.documentElement.dataset.scrollRestoring;
                }, 3000);
              }
            } catch {
              document.documentElement.dataset.portfolioBootstrapMode = "initial";
              if ("scrollRestoration" in window.history) window.history.scrollRestoration = "auto";
            }
          })();`}
        </Script>
        <noscript>
          <style>{"#portfolio-bootstrap { display: none !important; }"}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <div
          id="portfolio-bootstrap"
          className="portfolio-bootstrap"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483647,
            backgroundColor: "var(--portfolio-bootstrap-background, #12110d)",
          }}
        />
        <SpeedInsights />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
