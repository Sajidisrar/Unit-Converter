import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  title: "Free Online Unit Converter | Length, Weight, Temperature, Power & More",
  description: "Free online unit converter for length, weight, temperature, area, speed, power, cooking, fuel economy, and fitness. Accurate metric and imperial conversions with instant results. No registration required.",
  keywords: "unit converter, online unit converter, free unit converter, length converter, weight converter, temperature converter, area converter, speed converter, power converter, cooking converter, metric converter, imperial converter, meters to feet, kg to lbs, celsius to fahrenheit, cups to grams, watts to horsepower, BMI calculator, fuel economy converter",
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
  alternates: {
    canonical: 'https://freeunitconvertor.com/',
  },
  openGraph: {
    title: "Free Online Unit Converter | Length, Weight, Temperature & More",
    description: "Free unit converter for length, weight, temperature, area, speed, power, and cooking. Accurate metric and imperial conversions.",
    type: "website",
    url: "https://freeunitconvertor.com/",
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
    title: "Free Online Unit Converter",
    description: "Free unit converter for length, weight, temperature, area, speed, power, and cooking. Accurate conversions with instant results.",
    images: ['/icon.svg'],
  },
  other: {
    'application/ld+json': [
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Free Online Unit Converter",
        "url": "https://freeunitconvertor.com"
      }),
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freeunitconvertor.com/" }
        ]
      })
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-YXYR0FKNSK"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YXYR0FKNSK');
            `}
          </Script>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3759958145886276"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
