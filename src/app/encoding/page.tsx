import { Metadata } from 'next';
import EncodingToolsClient from './EncodingToolsClient';

export const metadata: Metadata = {
  title: 'Encoding Tools Online - Base64, URL Encoder, JWT Decoder | Free Developer Tools',
  description: 'Free online encoding and decoding tools. Base64 encode/decode with file support, URL encode/decode, and JWT token decoder with claim analysis. All processing done in browser for privacy.',
  keywords: [
    'base64 encoder', 'base64 decoder', 'base64 online',
    'url encoder', 'url decoder', 'url encoding',
    'jwt decoder', 'jwt parser', 'jwt validator',
    'encode decode tools', 'developer tools',
    'percent encoding', 'base64 to image',
    'image to base64', 'token decoder'
  ],
  openGraph: {
    title: 'Encoding Tools - Base64, URL, JWT | Free Online Tools',
    description: 'Encode and decode Base64, URLs, and JWT tokens online. Free, fast, and private - all processing happens in your browser.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Encoding Tools',
  description: 'Free online encoding and decoding tools for Base64, URL encoding, and JWT tokens.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Base64 text encoding and decoding',
    'Base64 file encoding with image preview',
    'URL encoding with standard and full modes',
    'JWT token decoding and analysis',
    'Claim descriptions and algorithm info',
    'Expiration status checking',
    'Browser-based processing for privacy'
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Base64 encoding and how does it work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Base64 encoding converts binary data into a 64-character ASCII text format using characters A-Z, a-z, 0-9, +, and /. It works by taking 3 bytes of binary data and converting them into 4 ASCII characters. This makes binary data safe for transmission over text-based protocols like email (MIME) and HTTP.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert an image to Base64?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To convert an image to Base64: 1) Use our Base64 encoder tool, 2) Click "File Upload" tab, 3) Drag and drop your image or click to browse, 4) The tool automatically converts it to Base64 string. You can optionally include the data URL prefix (data:image/png;base64,...) for direct use in HTML/CSS.',
      },
    },
    {
      '@type': 'Question',
      name: 'What characters need to be URL encoded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Characters that must be URL encoded include: spaces (%20), ampersand & (%26), equals = (%3D), question mark ? (%3F), plus + (%2B), forward slash / (%2F), hash # (%23), and percent % (%25). Non-ASCII characters like accented letters and emojis must also be encoded.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between encodeURI and encodeURIComponent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'encodeURI() encodes a complete URL, preserving characters like :, /, ?, and # that have special meaning in URLs. encodeURIComponent() encodes everything except alphanumeric characters, making it suitable for encoding URL parameters. Use encodeURIComponent() for query string values.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I decode a JWT token?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To decode a JWT: 1) Paste your token into our JWT decoder, 2) Click "Decode JWT", 3) View the decoded header (algorithm info), payload (claims like user ID, expiration), and signature. Our tool also shows if the token is expired and explains common claims like iss, sub, exp, and iat.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does JWT exp claim mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The JWT "exp" (expiration) claim indicates when the token expires, stored as a Unix timestamp (seconds since January 1, 1970). After this time, the token should be considered invalid. Our decoder shows both the timestamp and human-readable date, plus remaining time until expiration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Base64 encoding the same as encryption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, Base64 is NOT encryption. Base64 is an encoding scheme that converts binary to text - anyone can decode it without a key. It provides no security. For sensitive data, use proper encryption (AES, RSA) before Base64 encoding if you need to transmit encrypted data as text.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does Base64 increase file size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Base64 increases data size by approximately 33% because it converts every 3 bytes of binary data into 4 ASCII characters. For example, a 1MB file becomes about 1.37MB when Base64 encoded. This overhead is the tradeoff for text-safe transmission.',
      },
    },
  ],
};

export default function EncodingToolsPage() {
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
      <EncodingToolsClient />
    </>
  );
}
