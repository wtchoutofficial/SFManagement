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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${prompt.variable}`}>
      <body className="font-sans">
        <Script id="scroll-top" strategy="beforeInteractive">{`if("scrollRestoration"in history)history.scrollRestoration="manual";window.scrollTo(0,0);window.addEventListener("beforeunload",function(){window.scrollTo(0,0)});`}</Script>
        {children}
      </body>
    </html>
  );
}
