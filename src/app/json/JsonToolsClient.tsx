'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import TabContainer from '@/components/shared/TabContainer';
import { JsonPrettierTool, JsonParserTool, JsonCompareTool, JsonToCsvTool } from '@/components/json-tools';

const jsonTabs = [
  { id: 'formatter', label: 'Formatter', icon: '✨' },
  { id: 'parser', label: 'Parser', icon: '🔧' },
  { id: 'compare', label: 'Compare', icon: '🔍' },
  { id: 'csv', label: 'To CSV', icon: '📊' },
];

export default function JsonToolsClient() {
  const [activeTab, setActiveTab] = useState('formatter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            JSON Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Format, parse, compare, and convert JSON data with our comprehensive toolkit.
          </p>
        </header>

        {/* Main Tool */}
        <main className="max-w-[1800px] mx-auto">
          {/* Ad Banner - Top */}
          <div className="mb-4">
            <AdBanner position="top" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
            {/* Tab Navigation */}
            <TabContainer
              tabs={jsonTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              accentColor="emerald"
            />

            {/* Tool Content */}
            {activeTab === 'formatter' && <JsonPrettierTool />}
            {activeTab === 'parser' && <JsonParserTool />}
            {activeTab === 'compare' && <JsonCompareTool />}
            {activeTab === 'csv' && <JsonToCsvTool />}
          </div>

          {/* SEO Content Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Complete Guide to JSON Tools</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">What is JSON?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  JSON (JavaScript Object Notation) is a lightweight data interchange format that&apos;s easy for humans to read and write, and easy for machines to parse and generate. It&apos;s widely used for API responses, configuration files, and data storage.
                </p>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Our JSON Tools Include:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Formatter:</strong> Beautify and minify JSON with interactive tree view</li>
                  <li><strong>Parser:</strong> Validate JSON syntax with detailed statistics</li>
                  <li><strong>Compare:</strong> Find differences between two JSON objects</li>
                  <li><strong>To CSV:</strong> Convert JSON arrays to CSV format</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Key Features</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Real-time JSON validation with detailed error feedback</li>
                  <li>Interactive tree viewer for nested JSON structures</li>
                  <li>One-click JSON formatting and minification</li>
                  <li>Side-by-side JSON comparison with diff highlighting</li>
                  <li>JSON to CSV conversion with download support</li>
                  <li>Copy to clipboard functionality</li>
                  <li>All processing happens locally in your browser</li>
                </ul>
                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Pro Tip:</strong> Use the Parser tab to analyze JSON structure and statistics, then switch to Formatter for beautified output with an interactive tree view.
                  </p>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Common Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">API Development</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Format and validate API responses, compare expected vs actual output.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Data Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Convert JSON data to CSV for spreadsheet analysis in Excel or Google Sheets.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Debugging</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Identify syntax errors, explore nested structures, and validate data integrity.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Configuration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Format config files, compare versions, and validate schema compliance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-5 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">What is a JSON formatter?</h3>
                <p>A JSON formatter takes unformatted or minified JSON data and reformats it with proper indentation and line breaks, making it easier to read and understand.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Is my JSON data safe when using this tool?</h3>
                <p>Yes, all processing happens locally in your browser. Your JSON data never leaves your device, ensuring total privacy and security.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Can I compare large JSON files online?</h3>
                <p>Yes, our JSON Compare tool supports large JSON structures with arrays, nested objects, and complex hierarchies. It efficiently highlights differences in seconds.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">How do I convert JSON to CSV?</h3>
                <p>Simply switch to the &quot;To CSV&quot; tab, paste your JSON array or object, click Convert, and your data will be transformed into CSV format ready for download.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Does it support minifying JSON?</h3>
                <p>Yes, the Formatter tab includes a Minify button that removes all whitespace and line breaks, producing compact JSON output perfect for production use.</p>
              </div>
            </div>
          </section>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/json" />
        </main>
      </div>
    </div>
  );
}
