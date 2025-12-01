'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import TabContainer from '@/components/shared/TabContainer';
import { XmlFormatterTool, XmlParserTool, XmlCompareTool } from '@/components/xml-tools';

const xmlTabs = [
  { id: 'formatter', label: 'Formatter', icon: '📄' },
  { id: 'parser', label: 'Parser', icon: '🛠️' },
  { id: 'compare', label: 'Compare', icon: '⚖️' },
];

export default function XmlToolsClient() {
  const [activeTab, setActiveTab] = useState('formatter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            XML Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Format, parse, and compare XML documents with our comprehensive toolkit.
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
              tabs={xmlTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              accentColor="orange"
            />

            {/* Tool Content */}
            {activeTab === 'formatter' && <XmlFormatterTool />}
            {activeTab === 'parser' && <XmlParserTool />}
            {activeTab === 'compare' && <XmlCompareTool />}
          </div>

          {/* SEO Content Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Complete Guide to XML Tools</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">What is XML?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  XML (eXtensible Markup Language) is a markup language that defines rules for encoding documents in a format that is both human-readable and machine-readable. It&apos;s widely used for data storage, configuration files, web services, and data exchange.
                </p>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Our XML Tools Include:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Formatter:</strong> Beautify and minify XML documents</li>
                  <li><strong>Parser:</strong> Validate XML syntax with interactive tree view</li>
                  <li><strong>Compare:</strong> Find differences between two XML documents</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Key Features</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Real-time XML validation with detailed error feedback</li>
                  <li>Interactive tree viewer for nested XML structures</li>
                  <li>One-click XML formatting and minification</li>
                  <li>Side-by-side XML comparison with diff highlighting</li>
                  <li>Attribute-level change detection</li>
                  <li>Copy to clipboard functionality</li>
                  <li>All processing happens locally in your browser</li>
                </ul>
                <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Pro Tip:</strong> Use the Parser tab to analyze complex XML hierarchies. Elements with attributes are clearly highlighted, and text content is displayed separately for easy reading.
                  </p>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Common Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">SOAP Web Services</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Format and validate SOAP request/response messages for API testing.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">RSS/Atom Feeds</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Validate and debug RSS or Atom feed structures.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Configuration Files</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Format config files, compare versions, and validate changes.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Data Migration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Compare XML exports before and after data transformations.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Schema Validation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Verify XML document structure against expected patterns.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Debugging</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Identify syntax errors and explore nested element structures.</p>
                </div>
              </div>
            </div>

            {/* XML vs JSON */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">XML vs JSON: When to Use Each</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Use XML When:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Working with SOAP web services</li>
                    <li>• Document-centric data with mixed content</li>
                    <li>• Need for schema validation (XSD)</li>
                    <li>• Legacy system integration</li>
                    <li>• RSS/Atom feed handling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Use JSON When:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Building REST APIs</li>
                    <li>• JavaScript/web applications</li>
                    <li>• Simpler data structures needed</li>
                    <li>• Faster parsing is important</li>
                    <li>• Mobile app development</li>
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
                <h3 className="font-medium text-gray-900 dark:text-white">What is an XML formatter?</h3>
                <p>An XML formatter takes unformatted or minified XML data and reformats it with proper indentation and line breaks, making it easier to read and understand the document structure.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Is my XML data safe when using this tool?</h3>
                <p>Yes, all processing happens locally in your browser. Your XML data never leaves your device, ensuring total privacy and security.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Can I compare XML documents with attributes?</h3>
                <p>Yes, our XML Compare tool detects differences in elements, attributes, and text content. Attribute changes are highlighted separately for easy identification.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">What types of XML files can I validate?</h3>
                <p>You can validate any XML document including SOAP messages, RSS/Atom feeds, configuration files, and data exchange formats. The parser provides detailed statistics and error reporting.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Does it support minifying XML?</h3>
                <p>Yes, the Formatter tab includes a Minify button that removes all whitespace and line breaks, producing compact XML output perfect for production use.</p>
              </div>
            </div>
          </section>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/xml" />
        </main>
      </div>
    </div>
  );
}
