import type { Metadata } from 'next';
import JwtDecoderClient from './JwtDecoderClient';

export const metadata: Metadata = {
  title: "Free JWT Decoder Online | Decode JSON Web Tokens Instantly",
  description: "Decode and inspect JWT tokens online for free. Debug authentication, check token expiration, and analyze claims. Perfect for API testing and security analysis. No registration required.",
  keywords: "jwt decoder, decode jwt, jwt online, json web token decoder, jwt validator, jwt inspector, jwt analyzer, jwt token decoder, bearer token decoder, jwt debugger, free jwt decoder, jwt parser online",
  alternates: {
    canonical: 'https://freeunitconvertor.com/jwt-decoder',
  },
  openGraph: {
    title: "Free JWT Decoder Online | Decode JSON Web Tokens",
    description: "Decode and inspect JWT tokens instantly. Debug authentication, check expiration, and analyze claims. Free online tool.",
    type: "website",
    url: "https://freeunitconvertor.com/jwt-decoder",
  },
  twitter: {
    card: 'summary',
    title: "Free JWT Decoder Online",
    description: "Decode and inspect JWT tokens instantly. Debug authentication and analyze claims.",
  },
  other: {
    'application/ld+json': JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "JWT Decoder",
        "description": "Free online JWT decoder for inspecting JSON Web Token contents, claims, and expiration",
        "url": "https://freeunitconvertor.com/jwt-decoder",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "JWT payload decoding",
          "Claims inspection",
          "Token structure analysis",
          "Copy decoded output"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a JWT token?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A JSON Web Token (JWT) is a compact, URL-safe token used for securely transmitting information between parties. It consists of three parts: header, payload, and signature, separated by dots."
            }
          },
          {
            "@type": "Question",
            "name": "How do I decode a JWT token?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply paste your JWT token into our free online decoder and click 'Decode JWT'. The payload containing user data, claims, and expiration information will be displayed instantly in readable JSON format."
            }
          },
          {
            "@type": "Question",
            "name": "Is it safe to decode JWT tokens online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our JWT decoder processes tokens entirely in your browser - no data is sent to any server. However, never decode tokens containing sensitive production credentials on public tools. This tool is best for debugging and development."
            }
          },
          {
            "@type": "Question",
            "name": "What information is in a JWT payload?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "JWT payloads typically contain claims like user ID, email, roles, token expiration time (exp), issued at time (iat), and issuer (iss). The exact contents depend on how the token was created."
            }
          },
          {
            "@type": "Question",
            "name": "Can this tool verify JWT signatures?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This tool only decodes the JWT payload for inspection. Signature verification requires the secret key and should always be done server-side for security. Never trust decoded data without server-side validation."
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
          { "@type": "ListItem", "position": 3, "name": "JWT Decoder", "item": "https://freeunitconvertor.com/jwt-decoder" }
        ]
      }
    ])
  }
};

export default function JwtDecoderPage() {
  return <JwtDecoderClient />;
}
