import Link from 'next/link';

export interface Crumb {
  name: string;
  /** Omit for a crumb with no page of its own -- it renders as plain text. */
  url?: string;
}

interface BreadcrumbsProps {
  /** Trail excluding Home, which is prepended automatically. */
  trail: Crumb[];
}

const SITE = 'https://freeunitconvertor.com';

/**
 * Visible breadcrumbs plus the matching BreadcrumbList structured data.
 * The site emitted breadcrumb schema with no visible trail; this pairs them
 * so the markup describes something a user can actually see.
 */
export default function Breadcrumbs({ trail }: BreadcrumbsProps) {
  const crumbs: Crumb[] = [{ name: 'Home', url: '/' }, ...trail];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      // A crumb without a page of its own carries no item URL.
      ...(crumb.url ? { item: `${SITE}${crumb.url}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-gray-900 dark:text-gray-200 font-medium">
                  {crumb.name}
                </span>
              ) : (
                <>
                  {crumb.url ? (
                    <Link href={crumb.url} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span>{crumb.name}</span>
                  )}
                  <span aria-hidden="true" className="text-gray-400">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </nav>
  );
}
