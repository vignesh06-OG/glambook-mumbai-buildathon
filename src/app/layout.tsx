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
  "India's AI Beauty Decision Engine. Get personalized hairstyle, makeup, and grooming recommendations powered by AI — then book top Mumbai salons in one tap.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://glambook-mumbai.vercel.app"
  ),
  title: {
    default: "GlamBook AI | India's Beauty Decision Engine",
    template: "%s | GlamBook AI",
  },
  description: siteDescription,
  applicationName: SITE_CONFIG.brand,
  keywords: [
    "AI Beauty Analysis",
    "GlamBook AI",
    "Mumbai salon booking",
    "bridal makeup Mumbai",
    "skin tone analysis",
    "hairstyle recommendation AI",
    "beauty tech startup",
    "AI beauty startup hackathon",
    "India AI beauty",
  ],
  authors: [{ name: SITE_CONFIG.teamName }],
  creator: SITE_CONFIG.brand,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_CONFIG.brand,
    title: "GlamBook AI | India's Beauty Decision Engine",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "GlamBook AI | India's Beauty Decision Engine",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${cormorant.variable}`}>
      <body className="min-h-screen antialiased text-foreground overflow-x-hidden">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}