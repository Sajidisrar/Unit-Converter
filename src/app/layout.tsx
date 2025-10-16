import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Free Online Unit & Developer Tools 2025 | JSON, Base64, URL, JWT, XML Converters & Regex Validator",
  description: "Best free online developer tools and unit converters for 2025. Format JSON, encode Base64, decode JWT, validate regex, convert units instantly. Trusted by 100K+ developers worldwide. No registration required.",
  keywords: "free online developer tools, JSON formatter online, Base64 encoder decoder, URL encoder decoder, JWT token decoder, XML formatter, regex validator, unit converter online, length converter, weight converter, temperature converter, area converter, speed converter, cooking converter, JSON to CSV converter, developer utilities, web development tools, API testing tools, data conversion tools, programming tools, code formatter, text compare tool, color converter, AI cheat sheet, prompt engineering",
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
    canonical: '/',
  },
  openGraph: {
    title: "Free Online Unit & Developer Tools 2025",
    description: "The best free online tools for developers and unit conversions. JSON, Base64, JWT, Regex, and more.",
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
    title: "Free Online Unit & Developer Tools 2025",
    description: "The best free online tools for developers and unit conversions. JSON, Base64, JWT, Regex, and more.",
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
      }),
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an online unit converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An online unit converter lets you quickly change values between measurement systems such as length, weight, temperature, area, speed, and cooking units."
            }
          },
          {
            "@type": "Question",
            "name": "Is this unit converter free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all our converters are completely free to use without any registration required."
            }
          },
          {
            "@type": "Question",
            "name": "What developer tools are available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide free developer tools including JSON Formatter, JSON to CSV Converter, Base64 Encoder/Decoder, URL Encoder/Decoder, JWT Decoder, Unix Timestamp Converter, and Number Base Converter."
            }
          }
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3759958145886276"
          crossOrigin="anonymous"
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
