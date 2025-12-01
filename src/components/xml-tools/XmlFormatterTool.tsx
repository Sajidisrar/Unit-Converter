'use client';

import { useState } from 'react';

export default function XmlFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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

  const formatXML = (xml: string): string => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');

      const parserError = xmlDoc.getElementsByTagName('parsererror');
      if (parserError.length > 0) {
        throw new Error('Invalid XML format');
      }

      const serializer = new XMLSerializer();
      const formatted = serializer.serializeToString(xmlDoc);

      return formatXMLString(formatted);
    } catch {
      throw new Error('Invalid XML format');
    }
  };

  const minifyXML = (xml: string): string => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            XML Input
          </label>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{
              minHeight: '350px',
              height: Math.max(350, Math.min(600, (input.split('\n').length * 20) + 100)) + 'px'
            }}
            placeholder='Paste your XML here...

Example:
<root>
  <item id="1">
    <name>Example</name>
  </item>
</root>'
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
              minHeight: '350px',
              height: Math.max(350, Math.min(600, (output.split('\n').length * 20) + 100)) + 'px'
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
          disabled={!input.trim()}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Format XML
        </button>

        <button
          onClick={handleMinify}
          disabled={!input.trim()}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Minify XML
        </button>

        <button
          onClick={handleCopy}
          disabled={!output}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {copied ? 'Copied!' : 'Copy Output'}
        </button>

        <button
          onClick={handleClear}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
