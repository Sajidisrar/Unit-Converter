import { Metadata } from 'next';
import HashGeneratorClient from './HashGeneratorClient';

export const metadata: Metadata = {
  title: 'Free Hash Generator Online | MD5, SHA-256, SHA-512 & More',
  description: 'Generate cryptographic hashes instantly using MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms. Perfect for checksums, data verification, and security testing.',
  keywords: 'hash generator, md5 hash, sha256 hash, sha512 hash, sha1 hash, checksum generator, cryptographic hash, hash calculator, file checksum, data integrity',
  openGraph: {
    title: 'Free Hash Generator Online | MD5, SHA-256, SHA-512',
    description: 'Generate cryptographic hashes using MD5, SHA-256, SHA-512 and more. All processing happens in your browser.',
    type: 'website',
    url: 'https://freeunitconvertor.com/hash-generator',
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/hash-generator',
  },
};

const hashJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Hash Generator',
  description: 'Free online hash generator supporting MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms',
  url: 'https://freeunitconvertor.com/hash-generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'MD5 hash generation',
    'SHA-1 hash generation',
    'SHA-256 hash generation',
    'SHA-384 hash generation',
    'SHA-512 hash generation',
    'Uppercase/lowercase output',
    'Copy to clipboard'
  ]
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a cryptographic hash function?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cryptographic hash function takes any input data and produces a fixed-size string of bytes. The same input always produces the same hash, but even a tiny change in input creates a completely different output.'
      }
    },
    {
      '@type': 'Question',
      name: 'Which hash algorithm should I use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For security purposes, use SHA-256 or higher. MD5 and SHA-1 are cryptographically broken and should only be used for non-security checksums or legacy compatibility.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I reverse a hash to get the original text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, cryptographic hash functions are designed to be one-way functions. You cannot mathematically reverse a hash to get the original input. This is why they are used for password storage and data integrity verification.'
      }
    }
  ]
};

export default function HashGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hashJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HashGeneratorClient />
    </>
  );
}
