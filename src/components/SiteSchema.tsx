// Site-wide structured data.
//
// This previously lived in the root layout's `metadata.other`, which Next
// renders as <meta name="application/ld+json" content="...">. Search engines
// only read JSON-LD from a <script type="application/ld+json"> tag, so none
// of it counted. Rendering it here emits the correct element.
const SITE = 'https://freeunitconvertor.com';

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Free Online Unit Converter',
    url: SITE,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE}/unit-converter?from={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Free Unit Converter',
    url: SITE,
    logo: `${SITE}/icon.svg`,
  },
];

export default function SiteSchema() {
  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
