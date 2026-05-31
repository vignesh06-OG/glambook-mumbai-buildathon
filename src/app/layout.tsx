import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-hero",
  subsets: ["latin"],
});

const siteDescription =
  "Discover curated Mumbai salons, book bridal, hair, nails & spa in seconds, ride with Uber or Ola, and review after every visit — powered by your AI beauty concierge.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://glambook-mumbai.vercel.app"
  ),
  title: {
    default: "GlamBook Mumbai | Your AI Beauty Concierge",
    template: "%s | GlamBook Mumbai",
  },
  description: siteDescription,
  applicationName: SITE_CONFIG.brand,
  keywords: [
    "GlamBook Mumbai",
    "Mumbai salon booking",
    "bridal makeup Mumbai",
    "AI beauty concierge",
    "women salon",
    "spa booking Mumbai",
    "salon reviews",
  ],
  authors: [{ name: SITE_CONFIG.brand }],
  creator: SITE_CONFIG.brand,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_CONFIG.brand,
    title: "GlamBook Mumbai | Your AI Beauty Concierge",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "GlamBook Mumbai | Your AI Beauty Concierge",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${cormorant.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans text-stone-800">
        <Header />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
