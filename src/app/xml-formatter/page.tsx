'use client';

import { useState } from 'react';
import Head from 'next/head';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

export default function XMLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatXML = (xml: string): string => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');
      
      // Check for parsing errors
      const parserError = xmlDoc.getElementsByTagName('parsererror');
      if (parserError.length > 0) {
        throw new Error('Invalid XML format');
      }
      
      const serializer = new XMLSerializer();
      const formatted = serializer.serializeToString(xmlDoc);
      
      // Format with indentation
      return formatXMLString(formatted);
    } catch {
      throw new Error('Invalid XML format');
    }
  };

  const formatXMLString = (xml: string): string => {
    let formatted = '';
    let indent = '';
    const tab = '  ';
    
    xml.split(/>\s*</).forEach((node, index) => {
      if (index > 0) {
        node = '<' + node;
      }
      if (index < xml.split(/>\s*</).length - 1) {
        node = node + '>';
      }
      
      const padding = node.match(/<\/\w/) ? indent = indent.substring(tab.length) : indent;
      formatted += padding + node + '\n';
      
      if (node.match(/<\w[^>]*[^\/]>.*$/)) {
        indent += tab;
      }
    });
    
    return formatted.trim();
  };

  const minifyXML = (xml: string): string => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');
      
      // Check for parsing errors
      const parserError = xmlDoc.getElementsByTagName('parsererror');
      if (parserError.length > 0) {
        throw new Error('Invalid XML format');
      }
      
      const serializer = new XMLSerializer();
      return serializer.serializeToString(xmlDoc).replace(/>\s+</g, '><');
    } catch {
      throw new Error('Invalid XML format');
    }
  };

  const handleFormat = () => {
    try {
      setError('');
      const formatted = formatXML(input);
      setOutput(formatted);
    } catch {
      setError('Invalid XML format. Please check your XML syntax.');
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      setError('');
      const minified = minifyXML(input);
      setOutput(minified);
    } catch {
      setError('Invalid XML format. Please check your XML syntax.');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <Head>
        <title>XML Formatter & Minifier - Free Online XML Beautifier Tool</title>
        <meta name="description" content="Free online XML formatter and minifier. Format, beautify, and minify XML data instantly. Perfect for developers working with XML files, APIs, and data processing." />
        <meta name="keywords" content="XML formatter, XML beautifier, XML minifier, XML validator, format XML online, beautify XML, minify XML, XML tools, developer tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/xml-formatter" />
        <meta property="og:title" content="XML Formatter & Minifier - Free Online Tool" />
        <meta property="og:description" content="Format and minify XML data instantly with our free online XML formatter tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/xml-formatter" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              XML Formatter & Minifier
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Format, beautify, and minify XML data instantly. Perfect for developers working with XML files, APIs, and data processing.
            </p>
          </div>

          <main className="max-w-6xl mx-auto">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
              <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    XML Input
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(600, (input.split('\n').length * 20) + 100)) + 'px'
                    }}
                    placeholder='Paste your XML here...\n\nExample:\n<root>\n<item id="1">\n<name>Example</name>\n</item>\n</root>'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Formatted XML Output
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(600, (output.split('\n').length * 20) + 100)) + 'px'
                    }}
                    readOnly
                    value={output}
                    placeholder="Formatted XML will appear here..."
                  />
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <button
                  onClick={handleFormat}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Format XML
                </button>
                
                <button
                  onClick={handleMinify}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Minify XML
                </button>
                
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Copy Output
                </button>
                
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="mb-6">
              <AdBanner position="inline" />
            </div>

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">About XML Formatting</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">XML Formatter Features</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our XML formatter helps developers and data scientists work with XML data more efficiently. Format messy XML into readable, properly indented structure or minify XML for production use. Essential for <strong>AI artificial Intelligence</strong> applications and <strong>Data Science</strong> workflows that process XML data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Related Tools</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Combine with our <a href="/json-to-csv" className="text-orange-600 dark:text-orange-400 hover:underline">json to csv</a> converter and <a href="/base64-encoder-decoder" className="text-orange-600 dark:text-orange-400 hover:underline">base64 encoding</a> tools for complete data processing. Also useful alongside <a href="/area" className="text-orange-600 dark:text-orange-400 hover:underline">Unit converter area</a> and <a href="/weight" className="text-orange-600 dark:text-orange-400 hover:underline">Unit converter weight</a> for applications handling measurement data in XML format.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Pro Tip:</strong> Use the formatter to debug XML structure issues, then minify for production deployment. Perfect for API responses, configuration files, and data exchange formats.
                </p>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/xml-formatter" />
          </main>
        </div>
      </div>
    </>
  );
}
