import { Metadata } from 'next';
import CsvToolsClient from './CsvToolsClient';

export const metadata: Metadata = {
  title: 'Free CSV Tools Online | Format, Convert & View CSV Data',
  description: 'All-in-one free CSV toolkit: format and clean CSV files, convert between CSV and JSON, view data as interactive tables. Support for multiple delimiters.',
  keywords: 'csv formatter, csv to json, json to csv, csv viewer, csv table, csv parser, csv converter, csv validator, spreadsheet tools, data converter, csv editor online',
  openGraph: {
    title: 'Free CSV Tools Online | Format, Convert & View',
    description: 'Complete CSV toolkit - format, convert to JSON, and view as interactive tables. Perfect for data analysis.',
    type: 'website',
    url: 'https://freeunitconvertor.com/csv',
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/csv',
  },
};

const csvJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSV Tools Suite',
  description: 'Free online CSV toolkit with formatter, JSON converter, and table viewer',
  url: 'https://freeunitconvertor.com/csv',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'CSV formatting and cleaning',
    'CSV to JSON conversion',
    'JSON to CSV conversion',
    'Interactive table viewer',
    'Multiple delimiter support',
    'Sorting and filtering'
  ]
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is CSV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CSV (Comma-Separated Values) is a simple file format for storing tabular data. Each line represents a row, with values separated by commas. It\'s widely supported by spreadsheet applications and databases.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I convert CSV to JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use our CSV to JSON converter tab. Paste your CSV content, select the appropriate delimiter, and click Convert. The tool will transform your tabular data into a JSON array of objects.'
      }
    },
    {
      '@type': 'Question',
      name: 'What delimiters are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our CSV tools support comma, semicolon, tab, and pipe delimiters. This covers most CSV variants including European formats that commonly use semicolons.'
      }
    }
  ]
};

export default function CsvPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(csvJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CsvToolsClient />
    </>
  );
}
