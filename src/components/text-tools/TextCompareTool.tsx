'use client';

import { useState } from 'react';

interface TextDiff {
  type: 'equal' | 'added' | 'removed';
  content: string;
  lineNumber?: number;
}

export default function TextCompareTool() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [differences, setDifferences] = useState<TextDiff[]>([]);
  const [compareMode, setCompareMode] = useState<'line' | 'word' | 'char'>('line');
  const [isEqual, setIsEqual] = useState<boolean | null>(null);
  const [stats, setStats] = useState<{ added: number; removed: number; equal: number }>({ added: 0, removed: 0, equal: 0 });

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
        diffs.push({ type: 'added', content: line2, lineNumber: i + 1 });
      } else if (line2 === undefined) {
        diffs.push({ type: 'removed', content: line1, lineNumber: i + 1 });
      } else if (line1 === line2) {
        diffs.push({ type: 'equal', content: line1, lineNumber: i + 1 });
      } else {
        diffs.push({ type: 'removed', content: line1, lineNumber: i + 1 });
        diffs.push({ type: 'added', content: line2, lineNumber: i + 1 });
      }
    }
    return diffs;
  };

  const longestCommonSubsequence = (arr1: string[], arr2: string[]): TextDiff[] => {
    const m = arr1.length;
    const n = arr2.length;
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (arr1[i - 1] === arr2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    const diffs: TextDiff[] = [];
    let i = m, j = n;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && arr1[i - 1] === arr2[j - 1]) {
        diffs.unshift({ type: 'equal', content: arr1[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        diffs.unshift({ type: 'added', content: arr2[j - 1] });
        j--;
      } else if (i > 0) {
        diffs.unshift({ type: 'removed', content: arr1[i - 1] });
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
        diffs = longestCommonSubsequence(
          leftText.split(/\s+/).filter(w => w.length > 0),
          rightText.split(/\s+/).filter(w => w.length > 0)
        );
        break;
      case 'char':
        diffs = longestCommonSubsequence(leftText.split(''), rightText.split(''));
        break;
    }

    setDifferences(diffs);
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

  // String helpers
  const trimText = () => setStringToolOutput(stringToolInput.trim());
  const removeExtraSpaces = () => setStringToolOutput(stringToolInput.replace(/\s+/g, ' ').trim());
  const toUpperCase = () => setStringToolOutput(stringToolInput.toUpperCase());
  const toLowerCase = () => setStringToolOutput(stringToolInput.toLowerCase());
  const toTitleCase = () => setStringToolOutput(stringToolInput.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
  const reverseText = () => setStringToolOutput(stringToolInput.split('').reverse().join(''));
  const removeLineBreaks = () => setStringToolOutput(stringToolInput.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
  const addLineNumbers = () => setStringToolOutput(stringToolInput.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n'));
  const removeEmptyLines = () => setStringToolOutput(stringToolInput.split('\n').filter(line => line.trim() !== '').join('\n'));
  const sortLines = () => setStringToolOutput(stringToolInput.split('\n').sort().join('\n'));

  const getTextStats = () => {
    const text = stringToolInput;
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, '').length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      lines: text.split('\n').length,
      paragraphs: text.split(/\n\s*\n/).filter(p => p.trim()).length
    };
  };

  const copyStringOutput = async () => {
    try {
      await navigator.clipboard.writeText(stringToolOutput);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div>
      {/* Compare Mode Selection */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 bg-gray-100 dark:bg-gray-700">
          {[
            { value: 'line', label: 'Line by Line' },
            { value: 'word', label: 'Word by Word' },
            { value: 'char', label: 'Character' }
          ].map((mode) => (
            <button
              key={mode.value}
              onClick={() => setCompareMode(mode.value as 'line' | 'word' | 'char')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                compareMode === mode.value
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
            style={{ minHeight: '200px' }}
            placeholder="Paste your first text here..."
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
            style={{ minHeight: '200px' }}
            placeholder="Paste your second text here..."
            value={rightText}
            onChange={(e) => setRightText(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button
          onClick={handleCompare}
          disabled={!leftText.trim() || !rightText.trim()}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
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
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Comparison Result</h3>
            <p className={`${isEqual ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
              {isEqual ? 'The texts are identical!' : `Found ${stats.added + stats.removed} difference(s)`}
            </p>
          </div>

          {differences.length > 0 && (
            <div className="mt-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-green-600 dark:text-green-400">Equal: {stats.equal}</span>
                  <span className="text-red-600 dark:text-red-400">Removed: {stats.removed}</span>
                  <span className="text-blue-600 dark:text-blue-400">Added: {stats.added}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 max-h-96 overflow-y-auto">
                <div className="font-mono text-sm space-y-1">
                  {differences.map((diff, index) => (
                    <div
                      key={index}
                      className={`px-2 py-1 rounded ${
                        diff.type === 'equal' ? 'bg-transparent' :
                        diff.type === 'added' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                      }`}
                    >
                      <span className="text-gray-400 dark:text-gray-500 mr-2">
                        {diff.type === 'equal' ? ' ' : diff.type === 'added' ? '+' : '-'}
                      </span>
                      {compareMode === 'line' && diff.lineNumber && (
                        <span className="text-gray-400 dark:text-gray-500 mr-2 text-xs">{diff.lineNumber}:</span>
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
          )}
        </div>
      )}

      {/* String Helper Tools */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">String Helper Tools</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
            <textarea
              className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-y"
              style={{ minHeight: '120px' }}
              placeholder="Enter text to process..."
              value={stringToolInput}
              onChange={(e) => setStringToolInput(e.target.value)}
            />
            {stringToolInput && (
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-600 dark:text-gray-400">
                <span>Chars: {getTextStats().characters}</span> |
                <span> Words: {getTextStats().words}</span> |
                <span> Lines: {getTextStats().lines}</span>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
              <button
                onClick={copyStringOutput}
                disabled={!stringToolOutput}
                className="px-3 py-1 bg-teal-600 text-white rounded text-sm hover:bg-teal-700 disabled:bg-gray-400"
              >
                Copy
              </button>
            </div>
            <textarea
              className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-y"
              style={{ minHeight: '120px' }}
              readOnly
              value={stringToolOutput}
              placeholder="Processed text will appear here..."
            />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Formatting</h4>
            <div className="flex flex-wrap gap-2">
              <button onClick={trimText} className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm hover:bg-blue-200">Trim</button>
              <button onClick={removeExtraSpaces} className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm hover:bg-blue-200">Remove Extra Spaces</button>
              <button onClick={removeLineBreaks} className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm hover:bg-blue-200">Remove Line Breaks</button>
              <button onClick={removeEmptyLines} className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm hover:bg-blue-200">Remove Empty Lines</button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Case</h4>
            <div className="flex flex-wrap gap-2">
              <button onClick={toUpperCase} className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm hover:bg-green-200">UPPERCASE</button>
              <button onClick={toLowerCase} className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm hover:bg-green-200">lowercase</button>
              <button onClick={toTitleCase} className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm hover:bg-green-200">Title Case</button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Transform</h4>
            <div className="flex flex-wrap gap-2">
              <button onClick={reverseText} className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-sm hover:bg-purple-200">Reverse</button>
              <button onClick={addLineNumbers} className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-sm hover:bg-purple-200">Add Line Numbers</button>
              <button onClick={sortLines} className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-sm hover:bg-purple-200">Sort Lines A-Z</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
