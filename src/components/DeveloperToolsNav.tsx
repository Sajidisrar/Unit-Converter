import Link from 'next/link';

const developerTools = [
  { name: 'JSON to CSV', url: '/json-to-csv', icon: '📊' },
  { name: 'Base64 Encoder', url: '/base64-encoder-decoder', icon: '🔐' },
  { name: 'URL Encoder', url: '/url-encoder-decoder', icon: '🌐' },
  { name: 'JWT Decoder', url: '/jwt-decoder', icon: '🔑' },
  { name: 'XML Formatter', url: '/xml-formatter', icon: '📄' },
  { name: 'JSON Compare', url: '/json-compare', icon: '🔍' },
  { name: 'XML Compare', url: '/xml-compare', icon: '⚖️' },
  { name: 'Text Compare', url: '/text-compare', icon: '📝' },
  { name: 'Color Converter', url: '/color-converter', icon: '🎨' },
  { name: 'JSON Prettier', url: '/json-prettier', icon: '✨' }
];

interface DeveloperToolsNavProps {
  currentPath?: string;
}

export default function DeveloperToolsNav({ currentPath }: DeveloperToolsNavProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Other Developer Tools
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {developerTools
          .filter(tool => tool.url !== currentPath)
          .map((tool, index) => (
            <Link
              key={index}
              href={tool.url}
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-3 text-center transition-colors border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            >
              <div className="text-2xl mb-1">{tool.icon}</div>
              <div className="text-xs font-medium text-gray-800 dark:text-white">
                {tool.name}
              </div>
            </Link>
          ))}
      </div>
      <div className="text-center mt-4">
        <Link
          href="/developer"
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
        >
          View All Developer Tools →
        </Link>
      </div>
    </section>
  );
}
