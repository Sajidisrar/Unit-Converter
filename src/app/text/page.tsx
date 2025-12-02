import { Metadata } from 'next';
import TextToolsClient from './TextToolsClient';

export const metadata: Metadata = {
  title: 'Text Tools Online - Compare, Regex Validator, String Helpers | Free Developer Tools',
  description: 'Free online text processing tools. Compare text documents, test regular expressions with 20+ patterns, transform strings with case conversion and formatting. All processing done in browser.',
  keywords: [
    'text compare', 'text diff', 'compare text online',
    'regex validator', 'regex tester', 'regular expression',
    'string tools', 'text transformer', 'case converter',
    'line compare', 'word compare', 'code diff',
    'email regex', 'phone regex', 'url regex'
  ],
  openGraph: {
    title: 'Text Tools - Compare, Regex, String Helpers | Free Online',
    description: 'Compare text, test regex patterns, and transform strings. Free developer tools with browser-based processing for privacy.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Text Tools',
  description: 'Free online text processing tools for comparing documents, testing regex, and transforming strings.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Text comparison (line, word, character modes)',
    'Regex validation with real-time matching',
    '20+ common regex patterns included',
    'String transformation (case, trim, reverse)',
    'Character and word counting',
    'Browser-based processing for privacy'
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between line, word, and character comparison modes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Line mode compares text line by line, ideal for code review and configuration files. Word mode compares individual words, best for documents and prose. Character mode compares letter by letter, useful for finding typos and precise text validation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare two text files online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your first text in the left panel and second text in the right panel. Click "Compare Text" to see differences. Added lines show in green, removed lines in red. Use different comparison modes (line/word/character) based on your needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a regular expression (regex)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A regular expression is a pattern that describes a set of strings. It uses special characters like . (any character), * (zero or more), + (one or more), and character classes like \\d (digits), \\w (word characters) to match text patterns.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I validate an email address with regex?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$. This matches standard email formats. Our tool includes this as a preset - just click "Email" in the Common Patterns section to load it automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do regex flags g, i, m, and s mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'g (global) finds all matches, not just the first. i (case-insensitive) ignores uppercase/lowercase. m (multiline) makes ^ and $ match line starts/ends. s (dotall) makes . match newline characters too.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I match a phone number with regex?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For US phone numbers, use: ^\\+?1?[-.\\s]?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$. This matches formats like (555) 123-4567, 555-123-4567, and +1 555 123 4567.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between * and + in regex?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '* matches zero or more occurrences of the previous character/group, while + matches one or more. For example, a* matches "" (empty), "a", "aa", but a+ requires at least one "a" - it matches "a", "aa" but not empty string.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use regex to find URLs in text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the URL pattern from our Common Patterns section: ^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$. This matches both http and https URLs.',
      },
    },
  ],
};

export default function TextToolsPage() {
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
      <TextToolsClient />
    </>
  );
}
