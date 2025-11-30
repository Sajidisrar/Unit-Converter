import Base64PageClient from "@/components/Base64PageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Base64 Encoder & Decoder Online | Encode Decode Base64",
  description: "Free online Base64 encoder and decoder. Convert text to Base64, decode Base64 to text instantly. Perfect for web development, API testing, JWT debugging, and data transmission. No registration required.",
  keywords: "base64 encoder, base64 decoder, base64 online, free base64, encode base64, decode base64, base64 to text, text to base64, base64 converter, base64 string, base64 encode online, base64 decode online, base64 tool, convert base64",
  robots: "index, follow",
  alternates: {
    canonical: 'https://freeunitconvertor.com/base64-encoder-decoder',
  },
  openGraph: {
    title: "Free Base64 Encoder & Decoder Online",
    description: "Convert text to Base64 and decode Base64 strings instantly. Free online tool for developers.",
    type: "website",
    url: "https://freeunitconvertor.com/base64-encoder-decoder",
  },
  twitter: {
    card: 'summary',
    title: "Free Base64 Encoder & Decoder Online",
    description: "Encode and decode Base64 strings instantly. Free tool for developers.",
  },
  other: {
    'application/ld+json': JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Base64 Encoder Decoder",
        "url": "https://freeunitconvertor.com/base64-encoder-decoder",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Free online tool to encode and decode Base64 strings for web development and data transmission",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Base64 encoding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Base64 is an encoding scheme that converts binary data into ASCII text using a 64-character alphabet. It's commonly used to embed images in HTML/CSS, transmit binary data in JSON/XML, and encode data in URLs."
            }
          },
          {
            "@type": "Question",
            "name": "How do I encode text to Base64?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply paste your text into our free Base64 encoder and click 'Encode'. The Base64 encoded string will be generated instantly. You can then copy it for use in your application."
            }
          },
          {
            "@type": "Question",
            "name": "Is Base64 encryption?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, Base64 is NOT encryption. It's an encoding scheme that can be easily reversed. Anyone can decode Base64 strings. Never use Base64 to hide sensitive data like passwords."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freeunitconvertor.com/" },
          { "@type": "ListItem", "position": 2, "name": "Developer Tools", "item": "https://freeunitconvertor.com/developer" },
          { "@type": "ListItem", "position": 3, "name": "Base64 Encoder Decoder", "item": "https://freeunitconvertor.com/base64-encoder-decoder" }
        ]
      }
    ])
  }
};

export default function Base64EncoderDecoderPage() {
  return <Base64PageClient />;
}