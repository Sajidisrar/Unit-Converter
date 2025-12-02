'use client';

import { useEffect, useState } from 'react';

const commonPatterns = [
  { name: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', example: 'user@example.com', category: 'Validation' },
  { name: 'Phone (US)', pattern: '^\\+?1?[-.\\s]?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$', example: '(555) 123-4567', category: 'Validation' },
  { name: 'URL', pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$', example: 'https://example.com', category: 'Validation' },
  { name: 'Strong Password', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', example: 'MyPass123!', category: 'Security' },
  { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$', example: '2024-12-25', category: 'Date/Time' },
  { name: 'IPv4 Address', pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', example: '192.168.1.1', category: 'Network' },
  { name: 'Hex Color', pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$', example: '#FF5733', category: 'Design' },
  { name: 'Username', pattern: '^[a-zA-Z0-9_]{3,20}$', example: 'user_123', category: 'Validation' },
  { name: 'ZIP Code (US)', pattern: '^\\d{5}(-\\d{4})?$', example: '12345-6789', category: 'Validation' },
  { name: 'Decimal Number', pattern: '^\\d+\\.\\d{1,2}$', example: '123.45', category: 'Numbers' },
];

const regexFlags = [
  { flag: 'g', name: 'Global', description: 'Find all matches' },
  { flag: 'i', name: 'Case Insensitive', description: 'Ignore case' },
  { flag: 'm', name: 'Multiline', description: '^ and $ match line breaks' },
  { flag: 's', name: 'Dot All', description: '. matches newlines' },
];

const metacharacters = [
  { char: '.', description: 'Any character except newline' },
  { char: '^', description: 'Start of string' },
  { char: '$', description: 'End of string' },
  { char: '*', description: '0 or more of preceding' },
  { char: '+', description: '1 or more of preceding' },
  { char: '?', description: '0 or 1 of preceding' },
  { char: '|', description: 'OR operator' },
  { char: '[]', description: 'Character class' },
  { char: '()', description: 'Capture group' },
  { char: '\\d', description: 'Any digit (0-9)' },
  { char: '\\w', description: 'Word character' },
  { char: '\\s', description: 'Whitespace' },
  { char: '\\b', description: 'Word boundary' },
];

export default function RegexValidatorTool() {
  const [regex, setRegex] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (regex.trim()) {
      try {
        const regexObj = new RegExp(regex, flags);
        const matchResults = testString.match(regexObj);
        setMatches(matchResults ? matchResults : []);
        setIsValid(true);
        setError('');
      } catch (err) {
        setIsValid(false);
        setError(err instanceof Error ? err.message : 'Invalid regex');
        setMatches([]);
      }
    } else {
      setMatches([]);
      setIsValid(true);
      setError('');
    }
  }, [regex, testString, flags]);

  const handlePatternSelect = (pattern: typeof commonPatterns[0]) => {
    setRegex(pattern.pattern);
    setTestString(pattern.example);
  };

  const clearAll = () => {
    setRegex('');
    setTestString('');
    setMatches([]);
    setError('');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const categories = ['All', ...new Set(commonPatterns.map(p => p.category))];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Regular Expression
            </label>
            <div className="relative">
              <input
                type="text"
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
                placeholder="Enter your regex pattern..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                  !isValid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Flags</label>
            <div className="flex flex-wrap gap-3">
              {regexFlags.map((flag) => (
                <label key={flag.flag} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={flags.includes(flag.flag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFlags(flags + flag.flag);
                      } else {
                        setFlags(flags.replace(flag.flag, ''));
                      }
                    }}
                    className="mr-1"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300" title={flag.description}>
                    {flag.flag} ({flag.name})
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test against your regex..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            onClick={clearAll}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Clear All
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pattern Status</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                isValid ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800'
              }`}>
                {isValid ? 'Valid' : 'Invalid'}
              </span>
            </div>
            {regex && (
              <code className="text-sm bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                /{regex}/{flags}
              </code>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Matches Found</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{matches.length}</span>
            </div>
            {matches.length > 0 ? (
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {matches.map((match, index) => (
                  <div key={index} className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    Match {index + 1}: &quot;{match}&quot;
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No matches found</p>
            )}
          </div>

          {/* Quick Reference */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 dark:text-white mb-3">Quick Reference</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {metacharacters.map((meta, i) => (
                <div key={i} className="flex justify-between">
                  <code className="text-blue-600 dark:text-blue-400">{meta.char}</code>
                  <span className="text-gray-600 dark:text-gray-400 truncate ml-2">{meta.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common Patterns */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Common Patterns</h3>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {commonPatterns
            .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
            .map((pattern, index) => (
            <div
              key={index}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-300 dark:hover:border-blue-600"
              onClick={() => handlePatternSelect(pattern)}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{pattern.name}</h4>
                <button
                  onClick={(e) => { e.stopPropagation(); copyToClipboard(pattern.pattern); }}
                  className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 rounded px-2 py-0.5"
                >
                  Copy
                </button>
              </div>
              <code className="text-xs text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded block truncate">
                {pattern.pattern}
              </code>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ex: {pattern.example}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
