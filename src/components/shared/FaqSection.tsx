export interface FaqEntry {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  heading?: string;
  entries: FaqEntry[];
}

/**
 * Renders an FAQ block together with its FAQPage structured data, so the two
 * can never drift apart. Server component -- the questions are in the HTML
 * that crawlers receive.
 */
export default function FaqSection({ heading = 'Frequently Asked Questions', entries }: FaqSectionProps) {
  if (entries.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">{heading}</h2>
      <dl className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.question}>
            <dt className="font-semibold text-gray-900 dark:text-white mb-2">{entry.question}</dt>
            <dd className="text-gray-600 dark:text-gray-300 leading-relaxed">{entry.answer}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
