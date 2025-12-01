import { Metadata } from 'next';
import JsonToolsClient from './JsonToolsClient';

export const metadata: Metadata = {
  title: 'Free JSON Tools Online | Format, Parse, Compare & Convert JSON',
  description: 'All-in-one free JSON toolkit: format and beautify JSON, validate with interactive tree view, compare JSON objects side-by-side, and convert JSON to CSV. Browser-based, no upload required.',
  keywords: 'json formatter, json beautifier, json parser, json validator, json compare, json diff, json to csv, format json online, prettify json, json tree view, validate json, compare json objects, json diff tool, convert json to csv, online json tools, free json formatter, json editor online, api response formatter, json syntax validator, json minifier',
  openGraph: {
    title: 'Free JSON Tools Online | Format, Parse, Compare & Convert',
    description: 'Complete JSON toolkit - format, validate, compare, and convert JSON to CSV. All processing happens in your browser for complete privacy.',
    type: 'website',
    url: 'https://freeunitconvertor.com/json',
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/json',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON Tools Suite',
  description: 'Free online JSON toolkit with formatter, parser, compare, and CSV converter',
  url: 'https://freeunitconvertor.com/json',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'JSON formatting and beautification',
    'JSON parsing and validation',
    'Interactive tree view',
    'JSON minification',
    'Side-by-side JSON comparison',
    'JSON to CSV conversion',
    'Difference highlighting',
    'Copy to clipboard',
    'CSV download'
  ]
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON formatter is a tool that takes unformatted or minified JSON data and reformats it with proper indentation and line breaks, making it easier to read and understand.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is my JSON data safe when using this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all processing happens locally in your browser. Your JSON data never leaves your device, ensuring total privacy and security.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I compare large JSON files online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our JSON Compare tool supports large JSON structures with arrays, nested objects, and complex hierarchies. It efficiently highlights differences in seconds.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I convert JSON to CSV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply paste your JSON array or object into the JSON to CSV tab, click Convert, and your data will be transformed into CSV format ready for download or copy.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does it support minifying and formatting JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can format or minify JSON with one click for improved readability or compact output in the Formatter tab.'
      }
    }
  ]
};

export default function JsonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <JsonToolsClient />
    </>
  );
}
