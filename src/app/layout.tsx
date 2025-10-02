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
  metadataBase: new URL('https://freeunitconvertor.com'),
  title: "Free Online Unit Converter Tools - Length, Weight, Temperature & More",
  description: "Convert between different units of measurement instantly with our free online unit converters. Fast, accurate conversions for length, weight, temperature, area, speed, and more.",
  keywords: "unit converter, length converter, weight converter, temperature converter, area converter, speed converter, free online converter",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3B82F6' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Free Online Unit Converter Tools",
    description: "Convert between different units of measurement instantly with our free online unit converters.",
    type: "website",
    url: "https://freeunitconvertor.com",
    siteName: "Free Unit Converter",
    images: [
      {
        url: '/icon.svg',
        width: 32,
        height: 32,
        alt: 'Unit Converter Icon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: "Free Online Unit Converter Tools",
    description: "Convert between different units of measurement instantly with our free online unit converters.",
    images: ['/icon.svg'],
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="canonical" href="https://freeunitconvertor.com" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3759958145886276"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YXYR0FKNSK"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-YXYR0FKNSK');
            `,
          }}
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
              "url": "https://freeunitconvertor.com",
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
