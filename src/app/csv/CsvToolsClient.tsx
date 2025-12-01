'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import TabContainer from '@/components/shared/TabContainer';
import { CsvFormatterTool, CsvJsonConverterTool, CsvTableViewerTool } from '@/components/csv-tools';

const csvTabs = [
  { id: 'formatter', label: 'Formatter', icon: '✨' },
  { id: 'converter', label: 'CSV ↔ JSON', icon: '🔄' },
  { id: 'viewer', label: 'Table Viewer', icon: '📊' },
];

export default function CsvToolsClient() {
  const [activeTab, setActiveTab] = useState('formatter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            CSV Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Format, convert, and visualize CSV data with our comprehensive toolkit. Perfect for data analysis and spreadsheet work.
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
              tabs={csvTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              accentColor="emerald"
            />

            {/* Tool Content */}
            {activeTab === 'formatter' && <CsvFormatterTool />}
            {activeTab === 'converter' && <CsvJsonConverterTool />}
            {activeTab === 'viewer' && <CsvTableViewerTool />}
          </div>

          {/* SEO Content Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Complete Guide to CSV Tools</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">What is CSV?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  CSV (Comma-Separated Values) is a simple file format used to store tabular data. It&apos;s widely supported by spreadsheet applications like Excel, Google Sheets, and databases. Each line represents a row, with values separated by commas.
                </p>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Our CSV Tools Include:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Formatter:</strong> Clean and validate CSV with custom delimiters</li>
                  <li><strong>Converter:</strong> Convert between CSV and JSON formats</li>
                  <li><strong>Table Viewer:</strong> Visualize CSV as sortable, filterable tables</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Key Features</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Support for multiple delimiters (comma, semicolon, tab, pipe)</li>
                  <li>Proper handling of quoted fields and escaped characters</li>
                  <li>Bidirectional CSV to JSON conversion</li>
                  <li>Interactive table view with sorting and filtering</li>
                  <li>Whitespace trimming and empty row removal</li>
                  <li>All processing happens locally in your browser</li>
                </ul>
                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Pro Tip:</strong> When working with CSV files containing commas in data, ensure fields are properly quoted. Our tools handle this automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Common Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Data Export</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Clean and format CSV exports from databases and applications.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Spreadsheets</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Prepare data for Excel, Google Sheets, and other spreadsheet tools.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">API Integration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Convert CSV to JSON for REST API requests and responses.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Data Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quick preview and validation of CSV datasets before processing.</p>
                </div>
              </div>
            </div>

            {/* CSV vs JSON */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">CSV vs JSON: When to Use Each</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Use CSV When:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Working with spreadsheet applications</li>
                    <li>• Data is simple and tabular</li>
                    <li>• File size needs to be minimal</li>
                    <li>• Human readability with basic structure</li>
                    <li>• Importing/exporting from databases</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Use JSON When:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Data has nested structures</li>
                    <li>• Working with APIs and web services</li>
                    <li>• Complex data types (objects, arrays)</li>
                    <li>• Configuration files</li>
                    <li>• JavaScript/TypeScript applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-5 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">What delimiters are supported?</h3>
                <p>Our CSV tools support comma, semicolon, tab, and pipe delimiters. This covers most CSV variants including European formats that use semicolons.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Is my data safe?</h3>
                <p>Yes, all processing happens locally in your browser. Your CSV data never leaves your device, ensuring complete privacy for sensitive data.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">How do I handle special characters?</h3>
                <p>Fields containing commas, quotes, or newlines should be wrapped in double quotes. Our tools handle this automatically when formatting.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Can I sort and filter my CSV data?</h3>
                <p>Yes! Use our Table Viewer tool to see your CSV as an interactive table. Click column headers to sort, and use the filter box to search across all columns.</p>
              </div>
            </div>
          </section>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/csv" />
        </main>
      </div>
    </div>
  );
}
