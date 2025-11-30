import type { Metadata } from 'next';
import JsonPrettierClient from './JsonPrettierClient';

export const metadata: Metadata = {
  title: "Free JSON Formatter & Prettier Online | Format JSON Instantly",
  description: "Format, beautify, and validate JSON online for free. Interactive tree view, minify JSON, and syntax highlighting. Perfect for API debugging, data analysis, and development. No registration required.",
  keywords: "json formatter, json prettier, format json online, json beautifier, json validator, json minifier, json viewer, prettify json, json tree view, parse json online, json lint, json editor online, free json formatter",
  alternates: {
    canonical: 'https://freeunitconvertor.com/json-prettier',
  },
  openGraph: {
    title: "Free JSON Formatter & Prettier Online",
    description: "Format, beautify, and validate JSON instantly with interactive tree view. Free online tool for developers.",
    type: "website",
    url: "https://freeunitconvertor.com/json-prettier",
  },
  twitter: {
    card: 'summary',
    title: "Free JSON Formatter & Prettier Online",
    description: "Format, beautify, and validate JSON instantly with interactive tree view.",
  },
  other: {
    'application/ld+json': JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "JSON Formatter & Prettier",
        "description": "Free online JSON formatting, beautification, and validation tool with interactive tree view",
        "url": "https://freeunitconvertor.com/json-prettier",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "JSON formatting and beautification",
          "Interactive tree view",
          "JSON minification",
          "Syntax validation",
          "Copy to clipboard"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a JSON formatter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A JSON formatter is a tool that takes raw or minified JSON data and formats it with proper indentation and line breaks, making it human-readable. It helps developers debug APIs, analyze data structures, and validate JSON syntax."
            }
          },
          {
            "@type": "Question",
            "name": "How do I format JSON online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply paste your JSON into our free online formatter, click 'Format & Tree View', and get instantly beautified JSON with an interactive tree structure. You can also minify JSON or copy the output with one click."
            }
          },
          {
            "@type": "Question",
            "name": "Is this JSON formatter free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our JSON formatter is completely free with no registration required. All processing happens in your browser, so your data stays private and secure."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between JSON format and minify?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Formatting adds indentation and line breaks to make JSON readable. Minifying removes all whitespace to reduce file size, which is useful for production APIs and data transfer."
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
          { "@type": "ListItem", "position": 3, "name": "JSON Formatter", "item": "https://freeunitconvertor.com/json-prettier" }
        ]
      }
    ])
  }
};

export default function JSONPrettierPage() {
  return <JsonPrettierClient />;
}
