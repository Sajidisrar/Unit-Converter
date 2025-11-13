'use client';

import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import Head from 'next/head';
import { useState } from 'react';

// Metadata removed from client component
interface XMLDiffResult {
  path: string;
  type: 'added' | 'removed' | 'changed' | 'attribute_added' | 'attribute_removed' | 'attribute_changed';
  oldValue?: string;
  newValue?: string;
  attribute?: string;
}

export default function XMLCompare() {
  const [leftXml, setLeftXml] = useState('');
  const [rightXml, setRightXml] = useState('');
  const [differences, setDifferences] = useState<XMLDiffResult[]>([]);
  const [error, setError] = useState('');
  const [isEqual, setIsEqual] = useState<boolean | null>(null);

  const parseXML = (xmlString: string): Document => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');
    
    // Check for parsing errors
    const parserError = doc.getElementsByTagName('parsererror');
    if (parserError.length > 0) {
      throw new Error('Invalid XML format');
    }
    
    return doc;
  };

  const getElementPath = (element: Element): string => {
    const path: string[] = [];
    let current: Element | null = element;
    
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      let selector = current.nodeName.toLowerCase();
      
      // Add index if there are siblings with the same name
      const siblings = Array.from(current.parentNode?.children || [])
        .filter(sibling => sibling.nodeName === current!.nodeName);
      
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        selector += `[${index}]`;
      }
      
      path.unshift(selector);
      current = current.parentElement;
    }
    
    return path.join(' > ');
  };

  const compareAttributes = (element1: Element, element2: Element, path: string): XMLDiffResult[] => {
    const diffs: XMLDiffResult[] = [];
    const attrs1 = Array.from(element1.attributes);
    const attrs2 = Array.from(element2.attributes);
    
    const allAttrNames = new Set([
      ...attrs1.map(attr => attr.name),
      ...attrs2.map(attr => attr.name)
    ]);
    
    for (const attrName of allAttrNames) {
      const attr1 = element1.getAttribute(attrName);
      const attr2 = element2.getAttribute(attrName);
      
      if (attr1 === null && attr2 !== null) {
        diffs.push({
          path,
          type: 'attribute_added',
          attribute: attrName,
          newValue: attr2
        });
      } else if (attr1 !== null && attr2 === null) {
        diffs.push({
          path,
          type: 'attribute_removed',
          attribute: attrName,
          oldValue: attr1
        });
      } else if (attr1 !== attr2) {
        diffs.push({
          path,
          type: 'attribute_changed',
          attribute: attrName,
          oldValue: attr1 || '',
          newValue: attr2 || ''
        });
      }
    }
    
    return diffs;
  };

  const compareElements = (element1: Element | null, element2: Element | null, path = ''): XMLDiffResult[] => {
    const diffs: XMLDiffResult[] = [];
    
    if (!element1 && !element2) return diffs;
    
    if (!element1 && element2) {
      diffs.push({
        path: path || getElementPath(element2),
        type: 'added',
        newValue: element2.outerHTML
      });
      return diffs;
    }
    
    if (element1 && !element2) {
      diffs.push({
        path: path || getElementPath(element1),
        type: 'removed',
        oldValue: element1.outerHTML
      });
      return diffs;
    }
    
    if (!element1 || !element2) return diffs;
    
    const currentPath = path || getElementPath(element1);
    
    // Compare tag names
    if (element1.nodeName !== element2.nodeName) {
      diffs.push({
        path: currentPath,
        type: 'changed',
        oldValue: element1.nodeName,
        newValue: element2.nodeName
      });
    }
    
    // Compare attributes
    diffs.push(...compareAttributes(element1, element2, currentPath));
    
    // Compare text content (only direct text, not nested elements)
    const text1 = Array.from(element1.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent?.trim())
      .filter(text => text)
      .join(' ');
    
    const text2 = Array.from(element2.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent?.trim())
      .filter(text => text)
      .join(' ');
    
    if (text1 !== text2) {
      diffs.push({
        path: `${currentPath} [text]`,
        type: 'changed',
        oldValue: text1,
        newValue: text2
      });
    }
    
    // Compare child elements
    const children1 = Array.from(element1.children);
    const children2 = Array.from(element2.children);
    
    const maxChildren = Math.max(children1.length, children2.length);
    
    for (let i = 0; i < maxChildren; i++) {
      const child1 = children1[i];
      const child2 = children2[i];
      
      if (child1 && child2 && child1.nodeName === child2.nodeName) {
        diffs.push(...compareElements(child1, child2));
      } else {
        if (child1 && !child2) {
          diffs.push(...compareElements(child1, null));
        } else if (!child1 && child2) {
          diffs.push(...compareElements(null, child2));
        } else if (child1 && child2) {
          // Different tag names - treat as removed and added
          diffs.push(...compareElements(child1, null));
          diffs.push(...compareElements(null, child2));
        }
      }
    }
    
    return diffs;
  };

  const handleCompare = () => {
    try {
      setError('');
      
      if (!leftXml.trim() || !rightXml.trim()) {
        setError('Please provide both XML inputs to compare.');
        return;
      }
      
      const doc1 = parseXML(leftXml);
      const doc2 = parseXML(rightXml);
      
      const root1 = doc1.documentElement;
      const root2 = doc2.documentElement;
      
      const diffs = compareElements(root1, root2);
      setDifferences(diffs);
      setIsEqual(diffs.length === 0);
      
    } catch {
      setError('Invalid XML format. Please check your XML syntax.');
      setDifferences([]);
      setIsEqual(null);
    }
  };

  const handleClear = () => {
    setLeftXml('');
    setRightXml('');
    setDifferences([]);
    setError('');
    setIsEqual(null);
  };

  const getDiffColor = (type: string) => {
    switch (type) {
      case 'added':
      case 'attribute_added':
        return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
      case 'removed':
      case 'attribute_removed':
        return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';
      case 'changed':
      case 'attribute_changed':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-700';
    }
  };

  const formatDiffType = (type: string) => {
    switch (type) {
      case 'attribute_added': return 'ATTRIBUTE ADDED';
      case 'attribute_removed': return 'ATTRIBUTE REMOVED';
      case 'attribute_changed': return 'ATTRIBUTE CHANGED';
      default: return type.toUpperCase();
    }
  };

  const renderHighlightedXml = (xmlString: string, side: 'left' | 'right') => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlString, 'text/xml');
      
      // Check for parsing errors
      const parserError = doc.getElementsByTagName('parsererror');
      if (parserError.length > 0) {
        return <span className="text-red-500">Invalid XML</span>;
      }
      
      const serializer = new XMLSerializer();
      const formatted = serializer.serializeToString(doc);
      const lines = formatted.split('\n');
      
      return lines.map((line, index) => {
        let hasChange = false;
        let changeType = '';
        
        // Check if this line has any differences
        for (const diff of differences) {
          const pathParts = diff.path.split(' > ');
          const lineContent = line.trim();
          
          // Simple heuristic to match lines with changes
          if (pathParts.some(part => {
            const tagName = part.replace(/\[\d+\]/, ''); // Remove array indices
            return lineContent.includes(`<${tagName}`) || lineContent.includes(`</${tagName}>`);
          })) {
            hasChange = true;
            if (side === 'left') {
              changeType = diff.type === 'removed' || diff.type === 'attribute_removed' ? 'removed' : 
                          diff.type === 'changed' || diff.type === 'attribute_changed' ? 'changed' : '';
            } else {
              changeType = diff.type === 'added' || diff.type === 'attribute_added' ? 'added' : 
                          diff.type === 'changed' || diff.type === 'attribute_changed' ? 'changed' : '';
            }
            break;
          }
        }
        
        const className = hasChange 
          ? changeType === 'removed' 
            ? 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200' 
            : changeType === 'added'
            ? 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200'
            : changeType === 'changed'
            ? side === 'left' 
              ? 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200'
              : 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200'
            : ''
          : '';
        
        return (
          <div key={index} className={`${className} ${hasChange ? 'px-1 rounded' : ''}`}>
            {line}
          </div>
        );
      });
    } catch {
      return <span className="text-red-500">Invalid XML</span>;
    }
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://freeunitconvertor.com/xml-compare" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              XML Compare Tool
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Compare two XML documents and find differences instantly. Perfect for configuration management, data validation, and debugging.
            </p>
          </div>

          <main className="max-w-7xl mx-auto">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    XML 1 (Left)
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(500, (leftXml.split('\n').length * 20) + 100)) + 'px'
                    }}
                    placeholder='Paste your first XML here...\n\nExample:\n<root>\n  <item id="1">\n    <name>Example</name>\n  </item>\n</root>'
                    value={leftXml}
                    onChange={(e) => setLeftXml(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    XML 2 (Right)
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(500, (rightXml.split('\n').length * 20) + 100)) + 'px'
                    }}
                    placeholder='Paste your second XML here...\n\nExample:\n<root>\n  <item id="2">\n    <name>Modified</name>\n  </item>\n</root>'
                    value={rightXml}
                    onChange={(e) => setRightXml(e.target.value)}
                  />
                </div>
              </div>

              {/* Visual Diff Display */}
              {isEqual !== null && differences.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Visual Comparison</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        XML 1 with Highlights
                      </label>
                      <div className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-mono text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-gray-900 dark:text-white">
                          {renderHighlightedXml(leftXml, 'left')}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        XML 2 with Highlights
                      </label>
                      <div className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-mono text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-gray-900 dark:text-white">
                          {renderHighlightedXml(rightXml, 'right')}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <button
                  onClick={handleCompare}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Compare XML
                </button>
                
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Results Section */}
              {isEqual !== null && (
                <div className="mt-6">
                  <div className={`p-4 rounded-lg border ${isEqual ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700' : 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700'}`}>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Comparison Result
                    </h3>
                    <p className={`${isEqual ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                      {isEqual ? '✅ The XML documents are identical!' : `❌ Found ${differences.length} difference(s)`}
                    </p>
                  </div>
                  
                  {differences.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Differences Found:</h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {differences.map((diff, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${getDiffColor(diff.type)}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-mono text-sm font-semibold text-gray-800 dark:text-white">
                                  {diff.path}
                                  {diff.attribute && <span className="text-blue-600 dark:text-blue-400"> @{diff.attribute}</span>}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                    diff.type.includes('added') ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' :
                                    diff.type.includes('removed') ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200' :
                                    'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                                  }`}>
                                    {formatDiffType(diff.type)}
                                  </span>
                                </div>
                                {(diff.type === 'changed' || diff.type === 'attribute_changed') && (
                                  <div className="mt-2 text-sm">
                                    <div className="text-red-600 dark:text-red-400">
                                      <span className="font-medium">Old:</span> {diff.oldValue}
                                    </div>
                                    <div className="text-green-600 dark:text-green-400">
                                      <span className="font-medium">New:</span> {diff.newValue}
                                    </div>
                                  </div>
                                )}
                                {(diff.type === 'added' || diff.type === 'attribute_added') && (
                                  <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                                    <span className="font-medium">Added:</span> {diff.newValue}
                                  </div>
                                )}
                                {(diff.type === 'removed' || diff.type === 'attribute_removed') && (
                                  <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                    <span className="font-medium">Removed:</span> {diff.oldValue}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-6">
              <AdBanner position="inline" />
            </div>

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">About XML Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">XML Compare Features</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our XML compare tool helps developers identify differences between XML documents, including elements, attributes, and text content. Essential for configuration management, data validation, and debugging in <strong>AI artificial Intelligence</strong> and <strong>Data Science</strong> applications that process XML data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Related Developer Tools</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Enhance your workflow with our <a href="/json-to-csv" className="text-indigo-600 dark:text-indigo-400 hover:underline">json to csv</a> converter and <a href="/base64-encoder-decoder" className="text-indigo-600 dark:text-indigo-400 hover:underline">base64 encoding</a> tools. Also useful alongside <a href="/area" className="text-indigo-600 dark:text-indigo-400 hover:underline">Unit converter area</a> and <a href="/weight" className="text-indigo-600 dark:text-indigo-400 hover:underline">Unit converter weight</a> for applications handling measurement data in XML format.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Pro Tip:</strong> Use XML compare to validate configuration changes, check data transformations, and ensure XML schema compliance across different environments.
                </p>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/xml-compare" />
          </main>
        </div>
      </div>
    </>
  );
}
