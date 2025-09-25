import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
