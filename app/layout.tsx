import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Prompt } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SF Management — Premium Creator Management Agency",
  description:
    "The premier Scandinavian management agency located in Norway. We do the heavy lifting, you keep the focus on creation.",
  icons: {
    icon: [
      { url: "/sf-crown-dark.png", media: "(prefers-color-scheme: light)" },
      { url: "/sf-crown.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/sf-crown.png",
  },
  openGraph: {
    title: "SF Management — Premium Creator Management Agency",
    description:
      "The premier Scandinavian management agency located in Norway. We do the heavy lifting, you keep the focus on creation.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    siteName: "SF Management",
  },
  twitter: {
    card: "summary",
    title: "SF Management — Premium Creator Management Agency",
    description:
      "The premier Scandinavian management agency located in Norway. We do the heavy lifting, you keep the focus on creation.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${prompt.variable}`}>
      <body className="font-sans">
        <Script id="scroll-top" strategy="beforeInteractive">{`if("scrollRestoration"in history)history.scrollRestoration="manual";window.scrollTo(0,0);document.addEventListener("DOMContentLoaded",function(){window.scrollTo(0,0)});window.addEventListener("pageshow",function(e){if(e.persisted)window.scrollTo(0,0)});window.addEventListener("beforeunload",function(){window.scrollTo(0,0)});`}</Script>
        {children}
      </body>
    </html>
  );
}
