import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Online Unit Converter Tools - Length, Weight, Temperature & More",
  description: "Convert between different units of measurement instantly with our free online unit converters. Fast, accurate conversions for length, weight, temperature, area, speed, and more.",
  keywords: "unit converter, length converter, weight converter, temperature converter, area converter, speed converter, free online converter",
  openGraph: {
    title: "Free Online Unit Converter Tools",
    description: "Convert between different units of measurement instantly with our free online unit converters.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3759958145886276"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="schema-webapp"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Free Online Unit Converters",
              "url": "https://freeonlineconverters.vercel.app",
              "applicationCategory": "Calculator",
              "operatingSystem": "All",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
