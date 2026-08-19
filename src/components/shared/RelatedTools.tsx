import { getRelatedTools } from '@/constants/tools';
import Link from 'next/link';

interface RelatedToolsProps {
  currentUrl: string;
}

/** Registry-driven internal links. Real anchors, rendered on the server. */
export default function RelatedTools({ currentUrl }: RelatedToolsProps) {
  const related = getRelatedTools(currentUrl);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Related Converters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.url}
            href={tool.url}
            className="card card-interactive p-4 flex items-start gap-3"
          >
            <span className="text-2xl" aria-hidden="true">{tool.icon}</span>
            <span>
              <span className="block font-semibold text-gray-900 dark:text-white">{tool.name}</span>
              <span className="block text-sm text-gray-600 dark:text-gray-300">{tool.description}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
