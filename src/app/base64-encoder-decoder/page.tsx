import Base64PageClient from "@/components/Base64PageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder Decoder - Free Online Tool | Text to Base64",
  description: "Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 strings instantly. Perfect for web development, API testing, and data transmission.",
  keywords: "base64 encoder, base64 decoder, base64 encoding, base64 decoding, online base64, text to base64, base64 converter",
  robots: "index, follow",
  alternates: {
    canonical: 'https://freeunitconvertor.com/base64-encoder-decoder',
  },
  openGraph: {
    title: "Base64 Encoder Decoder - Free Online Tool | Text to Base64",
    description: "Convert text to Base64 and decode Base64 strings instantly. Perfect for web development and API testing.",
    type: "website",
    url: "https://freeunitconvertor.com/base64-encoder-decoder",
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Base64 Encoder Decoder",
      "url": "https://freeunitconvertor.com/base64-encoder-decoder",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All",
      "description": "Encode and decode Base64 strings for web development and data transmission"
    })
  }
};

export default function Base64EncoderDecoderPage() {
  return <Base64PageClient />;
}