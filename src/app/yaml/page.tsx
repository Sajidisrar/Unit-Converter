import { Metadata } from 'next';
import YamlToolsClient from './YamlToolsClient';

export const metadata: Metadata = {
  title: 'Free YAML Tools Online | Format, Validate & Convert YAML',
  description: 'All-in-one free YAML toolkit: format and beautify YAML files, validate syntax, and convert between YAML and JSON. Perfect for DevOps, Kubernetes configs, and CI/CD pipelines.',
  keywords: 'yaml formatter, yaml validator, yaml to json, json to yaml, yaml beautifier, format yaml online, yaml parser, yaml lint, kubernetes yaml, docker compose yaml, yaml converter, devops tools, configuration file formatter',
  openGraph: {
    title: 'Free YAML Tools Online | Format, Validate & Convert',
    description: 'Complete YAML toolkit - format, validate, and convert YAML to JSON. Perfect for DevOps workflows.',
    type: 'website',
    url: 'https://freeunitconvertor.com/yaml',
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/yaml',
  },
};

const yamlJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'YAML Tools Suite',
  description: 'Free online YAML toolkit with formatter, validator, and JSON converter',
  url: 'https://freeunitconvertor.com/yaml',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'YAML formatting and beautification',
    'YAML syntax validation',
    'YAML to JSON conversion',
    'JSON to YAML conversion',
    'Indentation control',
    'Copy to clipboard'
  ]
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is YAML?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YAML (YAML Ain\'t Markup Language) is a human-readable data serialization format commonly used for configuration files, especially in DevOps tools like Kubernetes, Docker Compose, and CI/CD pipelines.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I convert YAML to JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use our YAML to JSON converter tab. Simply paste your YAML content, click Convert, and get properly formatted JSON output instantly.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is YAML better than JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YAML is more human-readable and supports comments, making it ideal for configuration files. JSON is more widely supported in APIs and programming languages. Choose based on your use case.'
      }
    }
  ]
};

export default function YamlPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(yamlJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <YamlToolsClient />
    </>
  );
}
