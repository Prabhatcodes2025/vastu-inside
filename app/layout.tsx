import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import FloatingSocialMedia from "@/components/FloatingSocialMedia";

export const metadata: Metadata = {
  metadataBase: new URL("https://vastu-inside.vercel.app"),
  title: "Vastu Inside - Professional Vastu Consultation Services",
  description: "Expert Vastu consultation services for homes, offices, and commercial spaces. Harmonize your space with ancient wisdom and modern understanding.",
  keywords: ["vastu", "vastu shastra", "consultation", "feng shui", "home design", "architecture"],
  authors: [{ name: "Vastu Inside" }],
  manifest: "/manifest.json",
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      url: '/icons/icon-192x192.png',
    },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#b94812',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <FloatingSocialMedia />
        <main className="min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
