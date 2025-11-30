'use client';

import { useState } from 'react';
import Head from 'next/head';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

interface TextDiff {
  type: 'equal' | 'added' | 'removed';
  content: string;
  lineNumber?: number;
}

export default function TextCompare() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [differences, setDifferences] = useState<TextDiff[]>([]);
  const [compareMode, setCompareMode] = useState<'line' | 'word' | 'char'>('line');
  const [isEqual, setIsEqual] = useState<boolean | null>(null);
  const [stats, setStats] = useState<{
    added: number;
    removed: number;
    equal: number;
  }>({ added: 0, removed: 0, equal: 0 });
  
  // String helper tools state
  const [stringToolInput, setStringToolInput] = useState('');
  const [stringToolOutput, setStringToolOutput] = useState('');

  const compareByLines = (text1: string, text2: string): TextDiff[] => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const diffs: TextDiff[] = [];
    
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];
      
      if (line1 === undefined) {
        diffs.push({
          type: 'added',
          content: line2,
          lineNumber: i + 1
        });
      } else if (line2 === undefined) {
        diffs.push({
          type: 'removed',
          content: line1,
          lineNumber: i + 1
        });
      } else if (line1 === line2) {
        diffs.push({
          type: 'equal',
          content: line1,
          lineNumber: i + 1
        });
      } else {
        diffs.push({
          type: 'removed',
          content: line1,
          lineNumber: i + 1
        });
        diffs.push({
          type: 'added',
          content: line2,
          lineNumber: i + 1
        });
      }
    }
    
    return diffs;
  };

  const compareByWords = (text1: string, text2: string): TextDiff[] => {
    const words1 = text1.split(/\s+/).filter(word => word.length > 0);
    const words2 = text2.split(/\s+/).filter(word => word.length > 0);
    
    return longestCommonSubsequence(words1, words2);
  };

  const compareByChars = (text1: string, text2: string): TextDiff[] => {
    const chars1 = text1.split('');
    const chars2 = text2.split('');
    
    return longestCommonSubsequence(chars1, chars2);
  };

  const longestCommonSubsequence = (arr1: string[], arr2: string[]): TextDiff[] => {
    const m = arr1.length;
    const n = arr2.length;
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Build LCS table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (arr1[i - 1] === arr2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    
    // Backtrack to find differences
    const diffs: TextDiff[] = [];
    let i = m, j = n;
    
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && arr1[i - 1] === arr2[j - 1]) {
        diffs.unshift({
          type: 'equal',
          content: arr1[i - 1]
        });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        diffs.unshift({
          type: 'added',
          content: arr2[j - 1]
        });
        j--;
      } else if (i > 0) {
        diffs.unshift({
          type: 'removed',
          content: arr1[i - 1]
        });
        i--;
      }
    }
    
    return diffs;
  };

  const handleCompare = () => {
    let diffs: TextDiff[] = [];
    
    switch (compareMode) {
      case 'line':
        diffs = compareByLines(leftText, rightText);
        break;
      case 'word':
        diffs = compareByWords(leftText, rightText);
        break;
      case 'char':
        diffs = compareByChars(leftText, rightText);
        break;
    }
    
    setDifferences(diffs);
    
    // Calculate statistics
    const added = diffs.filter(d => d.type === 'added').length;
    const removed = diffs.filter(d => d.type === 'removed').length;
    const equal = diffs.filter(d => d.type === 'equal').length;
    
    setStats({ added, removed, equal });
    setIsEqual(added === 0 && removed === 0);
  };

  const handleClear = () => {
    setLeftText('');
    setRightText('');
    setDifferences([]);
    setIsEqual(null);
    setStats({ added: 0, removed: 0, equal: 0 });
  };

  // String helper functions
  const trimText = () => {
    setStringToolOutput(stringToolInput.trim());
  };

  const removeExtraSpaces = () => {
    setStringToolOutput(stringToolInput.replace(/\s+/g, ' ').trim());
  };

  const toUpperCase = () => {
    setStringToolOutput(stringToolInput.toUpperCase());
  };

  const toLowerCase = () => {
    setStringToolOutput(stringToolInput.toLowerCase());
  };

  const toTitleCase = () => {
    setStringToolOutput(
      stringToolInput.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    );
  };

  const reverseText = () => {
    setStringToolOutput(stringToolInput.split('').reverse().join(''));
  };

  const removeLineBreaks = () => {
    setStringToolOutput(stringToolInput.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
  };

  const addLineNumbers = () => {
    const lines = stringToolInput.split('\n');
    const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`);
    setStringToolOutput(numberedLines.join('\n'));
  };

  const removeEmptyLines = () => {
    const lines = stringToolInput.split('\n').filter(line => line.trim() !== '');
    setStringToolOutput(lines.join('\n'));
  };

  const sortLines = () => {
    const lines = stringToolInput.split('\n').sort();
    setStringToolOutput(lines.join('\n'));
  };

  const getTextStats = () => {
    const text = stringToolInput;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    
    return { characters, charactersNoSpaces, words, lines, paragraphs };
  };

  const copyStringOutput = async () => {
    try {
      await navigator.clipboard.writeText(stringToolOutput);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderDifferences = () => {
    if (differences.length === 0) return null;
    
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Comparison Result ({compareMode} mode)
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-green-600 dark:text-green-400">
              ✅ Equal: {stats.equal}
            </span>
            <span className="text-red-600 dark:text-red-400">
              ❌ Removed: {stats.removed}
            </span>
            <span className="text-blue-600 dark:text-blue-400">
              ➕ Added: {stats.added}
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 max-h-96 overflow-y-auto">
          <div className="font-mono text-sm space-y-1">
            {differences.map((diff, index) => (
              <div
                key={index}
                className={`px-2 py-1 rounded ${
                  diff.type === 'equal'
                    ? 'bg-transparent'
                    : diff.type === 'added'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                }`}
              >
                <span className="text-gray-400 dark:text-gray-500 mr-2">
                  {diff.type === 'equal' ? ' ' : diff.type === 'added' ? '+' : '-'}
                </span>
                {compareMode === 'line' && diff.lineNumber && (
                  <span className="text-gray-400 dark:text-gray-500 mr-2 text-xs">
                    {diff.lineNumber}:
                  </span>
                )}
                <span className={compareMode === 'char' ? 'break-all' : ''}>
                  {diff.content}
                  {compareMode === 'word' && ' '}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Text Compare Tool - Free Online Text Diff Checker</title>
        <meta name="description" content="Free online text compare tool. Compare two text documents and find differences by lines, words, or characters. Perfect for code review, document comparison, and content analysis." />
        <meta name="keywords" content="text compare, text diff, text difference checker, compare text online, document comparison, code diff, text analysis" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/text-compare" />
        <meta property="og:title" content="Text Compare Tool - Free Online Text Diff Checker" />
        <meta property="og:description" content="Compare two text documents and find differences instantly with our free online text compare tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/text-compare" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Text Compare Tool
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Compare two text documents and find differences by lines, words, or characters. Perfect for code review, document comparison, and content analysis.
            </p>
          </div>

          <main className="max-w-[1600px] mx-auto">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
              {/* Compare Mode Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Comparison Mode
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'line', label: 'Line by Line' },
                    { value: 'word', label: 'Word by Word' },
                    { value: 'char', label: 'Character by Character' }
                  ].map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setCompareMode(mode.value as 'line' | 'word' | 'char')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        compareMode === mode.value
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text 1 (Left)
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(500, (leftText.split('\n').length * 20) + 100)) + 'px'
                    }}
                    placeholder='Paste your first text here...\n\nExample:\nHello World\nThis is a test\nLine 3'
                    value={leftText}
                    onChange={(e) => setLeftText(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text 2 (Right)
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(500, (rightText.split('\n').length * 20) + 100)) + 'px'
                    }}
                    placeholder='Paste your second text here...\n\nExample:\nHello Universe\nThis is a test\nLine 4'
                    value={rightText}
                    onChange={(e) => setRightText(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <button
                  onClick={handleCompare}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  Compare Text
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
                      {isEqual ? '✅ The texts are identical!' : `❌ Found ${stats.added + stats.removed} difference(s)`}
                    </p>
                  </div>
                  
                  {renderDifferences()}
                </div>
              )}
            </div>

            {/* String Helper Tools */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">String Helper Tools</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Input Text
                    </label>
                    <textarea
                      className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                      style={{ 
                        minHeight: '200px',
                        height: Math.max(200, Math.min(400, (stringToolInput.split('\n').length * 20) + 80)) + 'px'
                      }}
                      placeholder="Enter text to process with string tools..."
                      value={stringToolInput}
                      onChange={(e) => setStringToolInput(e.target.value)}
                    />
                    
                    {/* Text Statistics */}
                    {stringToolInput && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Text Statistics</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <div>Characters: {getTextStats().characters}</div>
                          <div>No Spaces: {getTextStats().charactersNoSpaces}</div>
                          <div>Words: {getTextStats().words}</div>
                          <div>Lines: {getTextStats().lines}</div>
                          <div>Paragraphs: {getTextStats().paragraphs}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Output
                      </label>
                      <button
                        onClick={copyStringOutput}
                        disabled={!stringToolOutput}
                        className="px-3 py-1 bg-teal-600 text-white rounded text-sm hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Copy
                      </button>
                    </div>
                    <textarea
                      className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                      style={{ 
                        minHeight: '200px',
                        height: Math.max(200, Math.min(400, (stringToolOutput.split('\n').length * 20) + 80)) + 'px'
                      }}
                      readOnly
                      value={stringToolOutput}
                      placeholder="Processed text will appear here..."
                    />
                  </div>
                </div>

                {/* String Tool Buttons */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Text Formatting</h4>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={trimText} className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                        Trim Whitespace
                      </button>
                      <button onClick={removeExtraSpaces} className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                        Remove Extra Spaces
                      </button>
                      <button onClick={removeLineBreaks} className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                        Remove Line Breaks
                      </button>
                      <button onClick={removeEmptyLines} className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                        Remove Empty Lines
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Case Conversion</h4>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={toUpperCase} className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                        UPPERCASE
                      </button>
                      <button onClick={toLowerCase} className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                        lowercase
                      </button>
                      <button onClick={toTitleCase} className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                        Title Case
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Text Manipulation</h4>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={reverseText} className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-sm hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                        Reverse Text
                      </button>
                      <button onClick={addLineNumbers} className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-sm hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                        Add Line Numbers
                      </button>
                      <button onClick={sortLines} className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-sm hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                        Sort Lines A-Z
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">About Text Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Text Compare Features</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our text compare tool helps developers, writers, and analysts identify differences between text documents with multiple comparison modes. Essential for code review, document versioning, and content analysis in <strong>AI artificial Intelligence</strong> and <strong>Data Science</strong> workflows that process textual data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Related Developer Tools</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Enhance your workflow with our <a href="/json-to-csv" className="text-teal-600 dark:text-teal-400 hover:underline">json to csv</a> converter and <a href="/base64-encoder-decoder" className="text-teal-600 dark:text-teal-400 hover:underline">base64 encoding</a> tools. Also useful alongside <a href="/area" className="text-teal-600 dark:text-teal-400 hover:underline">Unit converter area</a> and <a href="/weight" className="text-teal-600 dark:text-teal-400 hover:underline">Unit converter weight</a> for applications processing measurement data in text format.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Pro Tip:</strong> Use line mode for code and document comparison, word mode for content analysis, and character mode for precise text validation and debugging.
                </p>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/text-compare" />
          </main>
        </div>
      </div>
    </>
  );
}
