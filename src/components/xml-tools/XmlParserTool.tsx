'use client';

import React, { useState, useCallback } from 'react';

interface XmlNode {
  name: string;
  attributes: Record<string, string>;
  children: XmlNode[];
  textContent: string;
  path: string;
}

export default function XmlParserTool() {
  const [xmlInput, setXmlInput] = useState('');
  const [parsedData, setParsedData] = useState<XmlNode | null>(null);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [stats, setStats] = useState({
    size: 0,
    elements: 0,
    attributes: 0,
    depth: 0,
    textNodes: 0
  });
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const parseXmlToNode = useCallback((element: Element, path = ''): XmlNode => {
    const attributes: Record<string, string> = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      attributes[attr.name] = attr.value;
    }

    const children: XmlNode[] = [];
    let textContent = '';

    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes[i];
      if (child.nodeType === Node.ELEMENT_NODE) {
        children.push(parseXmlToNode(child as Element, `${path}/${child.nodeName}`));
      } else if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent?.trim() || '';
        if (text) {
          textContent += text;
        }
      }
    }

    return {
      name: element.nodeName,
      attributes,
      children,
      textContent,
      path: path || element.nodeName
    };
  }, []);

  const calculateStats = useCallback((node: XmlNode, depth = 0): { elements: number; attributes: number; maxDepth: number; textNodes: number } => {
    let elements = 1;
    let attributes = Object.keys(node.attributes).length;
    let maxDepth = depth;
    let textNodes = node.textContent ? 1 : 0;

    for (const child of node.children) {
      const childStats = calculateStats(child, depth + 1);
      elements += childStats.elements;
      attributes += childStats.attributes;
      maxDepth = Math.max(maxDepth, childStats.maxDepth);
      textNodes += childStats.textNodes;
    }

    return { elements, attributes, maxDepth, textNodes };
  }, []);

  const parseXml = useCallback(() => {
    if (!xmlInput.trim()) {
      setError('');
      setIsValid(null);
      setParsedData(null);
      setStats({ size: 0, elements: 0, attributes: 0, depth: 0, textNodes: 0 });
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlInput, 'text/xml');

      const parserError = doc.getElementsByTagName('parsererror');
      if (parserError.length > 0) {
        throw new Error(parserError[0].textContent || 'XML parsing error');
      }

      if (!doc.documentElement) {
        throw new Error('No root element found');
      }

      const rootNode = parseXmlToNode(doc.documentElement);
      setParsedData(rootNode);
      setError('');
      setIsValid(true);

      const { elements, attributes, maxDepth, textNodes } = calculateStats(rootNode);
      setStats({
        size: new Blob([xmlInput]).size,
        elements,
        attributes,
        depth: maxDepth,
        textNodes
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid XML format');
      setIsValid(false);
      setParsedData(null);
      setStats({ size: 0, elements: 0, attributes: 0, depth: 0, textNodes: 0 });
    }
  }, [xmlInput, parseXmlToNode, calculateStats]);

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const renderXmlTree = (node: XmlNode, depth = 0): React.ReactElement => {
    const isExpanded = expandedNodes.has(node.path);
    const hasChildren = node.children.length > 0;
    const hasAttributes = Object.keys(node.attributes).length > 0;

    return (
      <div key={node.path} className="ml-4">
        <div className="flex items-start">
          {hasChildren && (
            <button
              onClick={() => toggleNode(node.path)}
              className="mr-1 mt-0.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          <div className="flex-1">
            <div className="flex items-center flex-wrap">
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                &lt;{node.name}
              </span>
              {hasAttributes && (
                <div className="ml-2 flex flex-wrap gap-2">
                  {Object.entries(node.attributes).map(([key, value]) => (
                    <span key={key} className="text-sm">
                      <span className="text-green-600 dark:text-green-400">{key}</span>
                      <span className="text-gray-500">=</span>
                      <span className="text-orange-600 dark:text-orange-400">&quot;{value}&quot;</span>
                    </span>
                  ))}
                </div>
              )}
              <span className="text-blue-600 dark:text-blue-400 font-medium">&gt;</span>
            </div>

            {node.textContent && (
              <div className="ml-4 mt-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
                {node.textContent}
              </div>
            )}

            {hasChildren && isExpanded && (
              <div className="mt-2 border-l border-gray-200 dark:border-gray-600 pl-2">
                {node.children.map((child) => renderXmlTree(child, depth + 1))}
              </div>
            )}

            <div className="mt-1">
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                &lt;/{node.name}&gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatXml = () => {
    if (isValid && xmlInput) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlInput, 'text/xml');
        const serializer = new XMLSerializer();
        let formatted = serializer.serializeToString(doc);

        formatted = formatted.replace(/></g, '>\n<');
        const lines = formatted.split('\n');
        let indentLevel = 0;
        const indentedLines = lines.map(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('</')) {
            indentLevel = Math.max(0, indentLevel - 1);
          }
          const indented = '  '.repeat(indentLevel) + trimmed;
          if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
            indentLevel++;
          }
          return indented;
        });

        setXmlInput(indentedLines.join('\n'));
      } catch (err) {
        console.error('Formatting error:', err);
      }
    }
  };

  const minifyXml = () => {
    if (isValid && xmlInput) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlInput, 'text/xml');
        const serializer = new XMLSerializer();
        const minified = serializer.serializeToString(doc);
        setXmlInput(minified);
      } catch (err) {
        console.error('Minifying error:', err);
      }
    }
  };

  const clearInput = () => {
    setXmlInput('');
    setParsedData(null);
    setError('');
    setIsValid(null);
    setStats({ size: 0, elements: 0, attributes: 0, depth: 0, textNodes: 0 });
    setExpandedNodes(new Set());
  };

  const expandAll = () => {
    const allPaths = new Set<string>();
    const collectPaths = (node: XmlNode) => {
      allPaths.add(node.path);
      node.children.forEach(collectPaths);
    };
    if (parsedData) {
      collectPaths(parsedData);
      setExpandedNodes(allPaths);
    }
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Input Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              XML Input
            </label>
            <div className="flex space-x-2">
              <button
                onClick={clearInput}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => copyToClipboard(xmlInput)}
                disabled={!xmlInput}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Copy
              </button>
            </div>
          </div>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{
              minHeight: '300px',
              height: Math.max(300, Math.min(500, (xmlInput.split('\n').length * 20) + 80)) + 'px'
            }}
            placeholder='Enter XML data here, e.g.:
<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book id="1" category="fiction">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <price currency="USD">12.99</price>
  </book>
</bookstore>'
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
          />

          {/* Parse Button */}
          <div className="mt-3 text-center">
            <button
              onClick={parseXml}
              disabled={!xmlInput.trim()}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Parse XML
            </button>
          </div>

          {/* Status Indicator */}
          {isValid !== null && (
            <div className={`mt-3 p-3 rounded-lg ${isValid ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}>
              <div className="flex items-center">
                <span className={`mr-2 ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isValid ? '✓' : '✗'}
                </span>
                <span className={`font-medium ${isValid ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                  {isValid ? 'Valid XML' : 'Invalid XML'}
                </span>
              </div>
              {error && (
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* XML Statistics */}
          {isValid && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">XML Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Size:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.size} bytes</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Elements:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.elements}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Attributes:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.attributes}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Depth:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.depth}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Text Nodes:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.textNodes}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tree View Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Interactive Tree View
            </label>
            {parsedData && (
              <div className="flex space-x-2">
                <button
                  onClick={expandAll}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition-colors"
                >
                  Collapse All
                </button>
              </div>
            )}
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 min-h-[300px] max-h-[500px] overflow-auto">
            {parsedData ? (
              <div className="font-mono text-sm">
                {renderXmlTree(parsedData)}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                {error ? 'Fix XML errors to see tree view' : 'Enter valid XML to see interactive tree view'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isValid && (
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <button
            onClick={formatXml}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Format XML
          </button>
          <button
            onClick={minifyXml}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Minify XML
          </button>
          <button
            onClick={() => copyToClipboard(xmlInput)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Copy XML
          </button>
        </div>
      )}
    </div>
  );
}
