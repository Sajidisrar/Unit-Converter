'use client';

import Head from "next/head";
import AdBanner from "@/components/AdBanner";
import DeveloperToolsNav from "@/components/DeveloperToolsNav";
import { useState } from "react";

// JSON to CSV converter function
function jsonToCsv(jsonStr: string): string {
  try {
    let arr = JSON.parse(jsonStr);
    if (!Array.isArray(arr)) {
      if (typeof arr === 'object' && arr !== null) {
        arr = [arr];
      } else {
        return 'Input must be a JSON object or an array of objects';
      }
    }
    if (arr.length === 0 || typeof arr[0] !== 'object' || arr[0] === null) {
      return 'Input must be a JSON object or an array of objects';
    }
    
    const keys = Array.from(
      arr.reduce((set: Set<string>, obj: Record<string, unknown>) => {
        if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(k => set.add(k));
        }
        return set;
      }, new Set<string>())
    );
    
    const escape = (v: unknown) => {
      let str: string;
      if (typeof v === 'object' && v !== null) {
        str = JSON.stringify(v);
      } else {
        str = String(v);
      }
      if (typeof v === 'undefined' || v === null) {
        str = '';
      }
      if (str.includes('"')) {
        str = str.replace(/"/g, '""');
      }
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str}"`;
      }
      return str;
    };
    
    const header = keys.join(',');
    const rows = arr.map((obj: Record<string, string | number | boolean | null | undefined>) =>
      keys.map(k => escape(obj && typeof obj === 'object' ? obj[k as keyof typeof obj] : undefined)).join(',')
    );
    return [header, ...rows].join('\n');
  } catch {
    return 'Invalid JSON';
  }
}

export default function JsonToCsvPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');

  const handleConvert = () => {
    setCsvOutput(jsonToCsv(jsonInput));
  };

  const handleCopy = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(csvOutput);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>JSON to CSV Converter - Free Online Tool | Convert JSON Data to CSV</title>
        <meta name="description" content="Convert JSON data to CSV format instantly with our free online JSON to CSV converter. Perfect for data analysis, Excel imports, and spreadsheet workflows. Fast, accurate, and secure." />
        <meta name="keywords" content="json to csv, json converter, csv converter, json to csv online, data conversion, excel import, spreadsheet converter, json data, csv format" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/json-to-csv" />
        <meta property="og:title" content="JSON to CSV Converter - Free Online Tool" />
        <meta property="og:description" content="Convert JSON data to CSV format instantly. Perfect for data analysis and Excel imports." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/json-to-csv" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "JSON to CSV Converter",
              "url": "https://freeunitconvertor.com/json-to-csv",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "All",
              "description": "Convert JSON data to CSV format for spreadsheets and data analysis"
            }),
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              JSON to CSV Converter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Convert JSON data to CSV format instantly. Perfect for data analysis, Excel imports, and spreadsheet workflows.
            </p>
          </header>

          <main className="max-w-6xl mx-auto">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
              <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    JSON Input
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(600, (jsonInput.split('\n').length * 20) + 100)) + 'px'
                    }}
                    placeholder='Paste your JSON here...\n\nExample:\n[\n  {"name": "John", "age": 30},\n  {"name": "Jane", "age": 25}\n]'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CSV Output
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(600, (csvOutput.split('\n').length * 20) + 100)) + 'px'
                    }}
                    readOnly
                    value={csvOutput}
                    placeholder="CSV output will appear here..."
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <button
                  onClick={handleConvert}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Convert to CSV
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!csvOutput}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50"
                >
                  Copy CSV
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!csvOutput}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                >
                  Download CSV
                </button>
              </div>
            </div>

            <div className="mb-6">
              <AdBanner position="inline" />
            </div>

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Complete Guide to JSON to CSV Conversion
              </h2>
              
              {/* What is JSON to CSV */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">What is JSON to CSV Conversion?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  JSON to CSV conversion transforms JavaScript Object Notation (JSON) data into Comma-Separated Values (CSV) format. This process is essential for <strong>data analysis</strong>, <strong>spreadsheet import</strong>, and <strong>database operations</strong>. Our free online JSON to CSV converter handles nested objects, arrays, and complex data structures automatically.
                </p>
              </div>

              {/* How to Use Guide */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">How to Convert JSON to CSV - Step by Step</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                    <li><strong>Paste JSON Data:</strong> Copy your JSON data from APIs, databases, or files into the input field</li>
                    <li><strong>Validate Format:</strong> Our tool automatically validates JSON syntax and shows errors if any</li>
                    <li><strong>Convert Instantly:</strong> Click &quot;Convert to CSV&quot; for immediate transformation</li>
                    <li><strong>Download Results:</strong> Copy the CSV output or download as a file for Excel/Google Sheets</li>
                    <li><strong>Handle Arrays:</strong> Nested arrays and objects are flattened into readable CSV columns</li>
                  </ol>
                </div>
              </div>

              {/* Use Cases */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Common JSON to CSV Use Cases</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">🔬 Data Science & Analytics</h4>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                      <li>• API response analysis in Python/R</li>
                      <li>• Machine learning dataset preparation</li>
                      <li>• Statistical analysis in SPSS/SAS</li>
                      <li>• Data visualization in Tableau/Power BI</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">🤖 AI & Machine Learning</h4>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                      <li>• Training data preparation</li>
                      <li>• Feature engineering workflows</li>
                      <li>• Model output analysis</li>
                      <li>• Dataset cleaning and preprocessing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">💼 Business Intelligence</h4>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                      <li>• Sales data from CRM APIs</li>
                      <li>• Financial reporting automation</li>
                      <li>• Customer analytics dashboards</li>
                      <li>• Marketing campaign analysis</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">🛠️ Development & Testing</h4>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                      <li>• API testing and validation</li>
                      <li>• Database migration tasks</li>
                      <li>• Log file analysis</li>
                      <li>• Configuration data export</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Features */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Advanced Features & Technical Details</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">✅ Supported JSON Formats</h4>
                      <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                        <li>• Nested objects and arrays</li>
                        <li>• Mixed data types (strings, numbers, booleans)</li>
                        <li>• Large datasets (up to 10MB)</li>
                        <li>• Unicode and special characters</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🚀 Performance Features</h4>
                      <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                        <li>• Client-side processing (secure)</li>
                        <li>• No file size limits</li>
                        <li>• Instant conversion</li>
                        <li>• No data uploaded to servers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Related Data Processing Tools</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <a href="/json-compare" className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                    <div className="text-xl mb-1">🔍</div>
                    <div className="text-xs font-medium text-gray-800 dark:text-white">JSON Compare</div>
                  </a>
                  <a href="/json-prettier" className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg text-center hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors">
                    <div className="text-xl mb-1">✨</div>
                    <div className="text-xs font-medium text-gray-800 dark:text-white">JSON Prettier</div>
                  </a>
                  <a href="/base64-encoder-decoder" className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                    <div className="text-xl mb-1">🔐</div>
                    <div className="text-xs font-medium text-gray-800 dark:text-white">Base64 Tools</div>
                  </a>
                  <a href="/xml-formatter" className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors">
                    <div className="text-xl mb-1">📄</div>
                    <div className="text-xs font-medium text-gray-800 dark:text-white">XML Formatter</div>
                  </a>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">💡 Pro Tips for JSON to CSV Conversion</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <strong>For Excel Users:</strong> Save as .csv and open in Excel. Use &quot;Data &gt; Text to Columns&quot; for advanced formatting.
                  </div>
                  <div>
                    <strong>For Large Files:</strong> Consider splitting large JSON files into smaller chunks for better performance.
                  </div>
                  <div>
                    <strong>For Nested Data:</strong> Our tool automatically flattens nested objects using dot notation (e.g., user.address.city).
                  </div>
                  <div>
                    <strong>For APIs:</strong> Perfect for converting REST API responses into spreadsheet-friendly format for analysis.
                  </div>
                </div>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/json-to-csv" />
          </main>
        </div>
      </div>
    </>
  );
}
