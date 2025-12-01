import { Metadata } from 'next';
import XmlToolsClient from './XmlToolsClient';

export const metadata: Metadata = {
  title: 'Free XML Tools Online | Format, Parse & Compare XML Documents',
  description: 'All-in-one free XML toolkit: format and beautify XML documents, validate with interactive tree view, and compare XML files side-by-side. Perfect for SOAP APIs, RSS feeds, and configuration files.',
  keywords: 'xml formatter, xml beautifier, xml parser, xml validator, xml compare, xml diff, format xml online, prettify xml, xml tree view, validate xml, compare xml documents, xml diff tool, online xml tools, free xml formatter, xml editor online, soap testing tools, rss feed validator, xml minifier, xml syntax validator',
  openGraph: {
    title: 'Free XML Tools Online | Format, Parse & Compare XML',
    description: 'Complete XML toolkit - format, validate, and compare XML documents. All processing happens in your browser for complete privacy.',
    type: 'website',
    url: 'https://freeunitconvertor.com/xml',
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/xml',
  },
};

const xmlJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'XML Tools Suite',
  description: 'Free online XML toolkit with formatter, parser, and compare tools',
  url: 'https://freeunitconvertor.com/xml',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'XML formatting and beautification',
    'XML parsing and validation',
    'Interactive tree view',
    'XML minification',
    'Side-by-side XML comparison',
    'Attribute comparison',
    'Element-level diff detection',
    'Copy to clipboard'
  ]
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an XML formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An XML formatter is a tool that takes unformatted or minified XML data and reformats it with proper indentation and line breaks, making it easier to read and understand the document structure.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is my XML data safe when using this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all processing happens locally in your browser. Your XML data never leaves your device, ensuring total privacy and security.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I compare XML documents with attributes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our XML Compare tool detects differences in elements, attributes, and text content. Attribute changes are highlighted separately for easy identification.'
      }
    },
    {
      '@type': 'Question',
      name: 'What types of XML files can I validate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can validate any XML document including SOAP messages, RSS/Atom feeds, configuration files, and data exchange formats. The parser provides detailed statistics and error reporting.'
      }
    }
  ]
};

export default function XmlPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(xmlJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <XmlToolsClient />
    </>
  );
}
