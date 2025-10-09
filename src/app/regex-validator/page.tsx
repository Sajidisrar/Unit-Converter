'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import AdBanner from '@/components/AdBanner';

const commonRegexPatterns = [
  {
    name: 'Email Validation',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    description: 'Validates email addresses with proper format',
    example: 'user@example.com',
    category: 'Validation'
  },
  {
    name: 'Phone Number (US)',
    pattern: '^\\+?1?[-.\\s]?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$',
    description: 'US phone number with various formats',
    example: '(555) 123-4567',
    category: 'Validation'
  },
  {
    name: 'Phone Number (International)',
    pattern: '^\\+[1-9]\\d{1,14}$',
    description: 'International phone number format',
    example: '+1234567890',
    category: 'Validation'
  },
  {
    name: 'URL Validation',
    pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$',
    description: 'Validates HTTP/HTTPS URLs',
    example: 'https://www.example.com',
    category: 'Validation'
  },
  {
    name: 'Strong Password',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    description: 'Password with uppercase, lowercase, number, and special char',
    example: 'MyPass123!',
    category: 'Security'
  },
  {
    name: 'Credit Card (Visa)',
    pattern: '^4[0-9]{12}(?:[0-9]{3})?$',
    description: 'Visa credit card numbers',
    example: '4111111111111111',
    category: 'Finance'
  },
  {
    name: 'Credit Card (MasterCard)',
    pattern: '^5[1-5][0-9]{14}$',
    description: 'MasterCard credit card numbers',
    example: '5555555555554444',
    category: 'Finance'
  },
  {
    name: 'Date (YYYY-MM-DD)',
    pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$',
    description: 'ISO date format validation',
    example: '2024-12-25',
    category: 'Date/Time'
  },
  {
    name: 'Time (HH:MM)',
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
    description: '24-hour time format',
    example: '14:30',
    category: 'Date/Time'
  },
  {
    name: 'IPv4 Address',
    pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    description: 'Validates IPv4 addresses',
    example: '192.168.1.1',
    category: 'Network'
  },
  {
    name: 'IPv6 Address',
    pattern: '^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$',
    description: 'Validates IPv6 addresses',
    example: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
    category: 'Network'
  },
  {
    name: 'Hex Color Code',
    pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
    description: 'CSS hex color codes (3 or 6 digits)',
    example: '#FF5733',
    category: 'Design'
  },
  {
    name: 'RGB Color',
    pattern: '^rgb\\(\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*\\)$',
    description: 'RGB color format validation',
    example: 'rgb(255, 87, 51)',
    category: 'Design'
  },
  {
    name: 'Username (3-20 chars)',
    pattern: '^[a-zA-Z0-9_]{3,20}$',
    description: 'Username with alphanumeric and underscore',
    example: 'user_123',
    category: 'Validation'
  },
  {
    name: 'Social Security Number',
    pattern: '^\\d{3}-\\d{2}-\\d{4}$',
    description: 'US SSN format (XXX-XX-XXXX)',
    example: '123-45-6789',
    category: 'Validation'
  },
  {
    name: 'ZIP Code (US)',
    pattern: '^\\d{5}(-\\d{4})?$',
    description: 'US ZIP code with optional +4',
    example: '12345-6789',
    category: 'Validation'
  },
  {
    name: 'Alphanumeric Only',
    pattern: '^[a-zA-Z0-9]+$',
    description: 'Only letters and numbers allowed',
    example: 'abc123',
    category: 'Validation'
  },
  {
    name: 'No Spaces',
    pattern: '^\\S+$',
    description: 'No whitespace characters allowed',
    example: 'noSpacesHere',
    category: 'Validation'
  },
  {
    name: 'Decimal Number',
    pattern: '^\\d+\\.\\d{1,2}$',
    description: 'Decimal number with 1-2 decimal places',
    example: '123.45',
    category: 'Numbers'
  },
  {
    name: 'Positive Integer',
    pattern: '^[1-9]\\d*$',
    description: 'Positive integers only (no leading zeros)',
    example: '123',
    category: 'Numbers'
  }
];

const regexFlags = [
  { flag: 'g', name: 'Global', description: 'Find all matches, not just the first' },
  { flag: 'i', name: 'Case Insensitive', description: 'Match regardless of case' },
  { flag: 'm', name: 'Multiline', description: '^ and $ match line breaks' },
  { flag: 's', name: 'Dot All', description: '\'.\' matches newline characters' },
  { flag: 'u', name: 'Unicode', description: 'Handle Unicode characters properly' },
  { flag: 'y', name: 'Sticky', description: 'Match only at the last index' }
];

const regexMetacharacters = [
  { char: '.', description: 'Matches any character except newline' },
  { char: '^', description: 'Matches start of string' },
  { char: '$', description: 'Matches end of string' },
  { char: '*', description: 'Matches 0 or more of the preceding element' },
  { char: '+', description: 'Matches 1 or more of the preceding element' },
  { char: '?', description: 'Matches 0 or 1 of the preceding element' },
  { char: '|', description: 'OR operator - matches either pattern' },
  { char: '[]', description: 'Character class - matches any character inside' },
  { char: '[^]', description: 'Negated character class' },
  { char: '()', description: 'Grouping - creates a capture group' },
  { char: '\\d', description: 'Matches any digit (0-9)' },
  { char: '\\w', description: 'Matches word characters (a-z, A-Z, 0-9, _)' },
  { char: '\\s', description: 'Matches whitespace characters' },
  { char: '\\b', description: 'Word boundary' }
];

export default function RegexValidatorPage() {
  const [regex, setRegex] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<typeof commonRegexPatterns[0] | null>(null);
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
        setError(err instanceof Error ? err.message : 'Invalid regex pattern');
        setMatches([]);
      }
    } else {
      setMatches([]);
      setIsValid(true);
      setError('');
    }
  }, [regex, testString, flags]);

  const handlePatternSelect = (pattern: typeof commonRegexPatterns[0]) => {
    setSelectedPattern(pattern);
    setRegex(pattern.pattern);
    setTestString(pattern.example);
  };

  const clearAll = () => {
    setRegex('');
    setTestString('');
    setMatches([]);
    setError('');
    setSelectedPattern(null);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Show a toast notification for feedback
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <Head>
        <title>Free Online Regex Validator 2025 | Test Regular Expressions with 20+ Common Patterns</title>
        <meta
          name="description"
          content="Best free online regex validator for 2025. Test regular expressions with real-time matching, 20+ common patterns (email, phone, URL), syntax reference, and examples. Trusted by 100K+ developers. No registration required."
        />
        <meta
          name="keywords"
          content="regex validator, regular expression tester, regex test online, regex patterns, email regex, phone regex, URL regex, password regex, regex syntax, regex examples, regex cheat sheet, regex validator tool, regex matcher, regex debugger, regex tester free, regex online tool, regex pattern matching, regex validation, regex testing tool, regex helper, regex tutorial, regex guide"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/regex-validator" />
        <meta property="og:title" content="Free Online Regex Validator - Test Regular Expressions" />
        <meta property="og:description" content="Test and validate regular expressions with our free online regex validator. Includes common patterns, syntax reference, and real-time matching." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/regex-validator" />
      </Head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Regex Validator",
        "description": "Free online tool for testing and validating regular expressions",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      })}} />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Free Regex Validator 2025
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Test Regular Expressions with 20+ Common Patterns
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              <strong>Best free regex validator for 2025.</strong> Test your regular expressions with real-time matching, 
              explore 20+ common patterns (email, phone, URL, password), and learn regex syntax. 
              Trusted by 100K+ developers worldwide.
            </p>
          </div>

          <div className="mb-8">
            <AdBanner position="top" />
          </div>

          {/* Main Regex Tester */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Regex Pattern
                </h3>
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
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          !isValid ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {!isValid && (
                        <div className="absolute right-3 top-3 text-red-500">
                          ⚠️
                        </div>
                      )}
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Flags
                    </label>
                    <div className="flex flex-wrap gap-2">
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
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {flag.flag} ({flag.name})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Test String
                    </label>
                    <textarea
                      value={testString}
                      onChange={(e) => setTestString(e.target.value)}
                      placeholder="Enter text to test against your regex..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <button
                    onClick={clearAll}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Results Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Results
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Pattern Status
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        isValid ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {isValid ? 'Valid' : 'Invalid'}
                      </span>
                    </div>
                    {regex && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <code className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                          /{regex}/{flags}
                        </code>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Matches Found
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {matches.length}
                      </span>
                    </div>
                    {matches.length > 0 ? (
                      <div className="space-y-1">
                        {matches.map((match, index) => (
                          <div key={index} className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            Match {index + 1}: &quot;{match}&quot;
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No matches found
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <AdBanner position="inline" />
          </div>

          {/* Regex Structure Guide */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              How Regex Works - Structure Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  🔍 Basic Structure
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">^</code> - Start of string
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">$</code> - End of string
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">.</code> - Any character
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">*</code> - Zero or more
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">+</code> - One or more
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">?</code> - Zero or one
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  📝 Character Classes
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">[a-z]</code> - Lowercase letters
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">[A-Z]</code> - Uppercase letters
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">[0-9]</code> - Digits
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">\\d</code> - Any digit
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">\\w</code> - Word characters
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <code className="text-blue-600 dark:text-blue-400">\\s</code> - Whitespace
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                💡 Quick Examples
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Email Pattern:</strong>
                  <code className="block bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1 text-xs">
                    ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]&#123;2,&#125;$
                  </code>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Matches: user@example.com
                  </p>
                </div>
                <div>
                  <strong>Phone Pattern:</strong>
                  <code className="block bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1 text-xs">
                    ^\\+?1?[-.\\s]?\\(?([0-9]&#123;3&#125;)\\)?[-.\\s]?([0-9]&#123;3&#125;)[-.\\s]?([0-9]&#123;4&#125;)$
                  </code>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Matches: (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Patterns */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Common Regex Patterns by Category
            </h3>
            
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                {Array.from(new Set(commonRegexPatterns.map(p => p.category))).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonRegexPatterns
                .filter(pattern => selectedCategory === 'All' || pattern.category === selectedCategory)
                .map((pattern, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPattern?.name === pattern.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                  onClick={() => handlePatternSelect(pattern)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {pattern.name}
                    </h4>
                    <span className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                      {pattern.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 pr-2">
                      {pattern.description}
                    </p>
                    <button onClick={(e) => { e.stopPropagation(); copyToClipboard(pattern.pattern); }} className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded px-2 py-1 transition-colors flex-shrink-0">
                      Copy
                    </button>
                  </div>
                  <code className="text-xs text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded block break-all">
                    {pattern.pattern}
                  </code>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Example: {pattern.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regex Reference */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Metacharacters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Regex Metacharacters
              </h3>
              <div className="space-y-3">
                {regexMetacharacters.map((meta, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <code className="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">
                      {meta.char}
                    </code>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {meta.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Regex Flags
              </h3>
              <div className="space-y-4">
                {regexFlags.map((flag, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <code className="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">
                        {flag.flag}
                      </code>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {flag.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {flag.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Regex Validator - Complete Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  What is Regular Expression (Regex)?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Regular expressions are powerful patterns used to match, search, and manipulate text. 
                  They are essential tools for developers, data analysts, and anyone working with text processing. 
                  Our <strong>free regex validator</strong> helps you test and debug regular expressions in real-time.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Common use cases include <strong>email validation</strong>, <strong>phone number formatting</strong>, 
                  <strong>URL validation</strong>, <strong>password strength checking</strong>, and <strong>data extraction</strong> 
                  from text documents.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  How to Use Our Regex Validator
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• <strong>Enter your regex pattern</strong> in the input field</li>
                  <li>• <strong>Add test flags</strong> like global (g) or case-insensitive (i)</li>
                  <li>• <strong>Type test text</strong> to see matches in real-time</li>
                  <li>• <strong>Browse common patterns</strong> for quick reference</li>
                  <li>• <strong>Learn syntax</strong> with our metacharacter guide</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                💡 Regex Tips & Best Practices
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• <strong>Start simple</strong> and build complexity gradually</li>
                <li>• <strong>Test thoroughly</strong> with various input examples</li>
                <li>• <strong>Use anchors</strong> (^ and $) for exact matches</li>
                <li>• <strong>Escape special characters</strong> with backslash (\)</li>
                <li>• <strong>Use character classes</strong> [a-z] instead of [abcdef...]</li>
                <li>• <strong>Consider performance</strong> for large text processing</li>
              </ul>
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Related Developer Tools:</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  After validating your patterns, you might need to work with data formats. Try our <a href="/json-parser" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Parser</a> or 
                  <a href="/xml-formatter" className="text-blue-600 dark:text-blue-400 hover:underline">XML Formatter</a> to continue your workflow.
                </p>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              How to Use the Regex Validator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  🔧 Basic Usage
                </h3>
                <ol className="text-gray-700 dark:text-gray-300 space-y-3">
                  <li>
                    <strong>1. Enter Your Pattern:</strong> Type your regular expression in the &quot;Regular Expression&quot; field
                  </li>
                  <li>
                    <strong>2. Set Flags:</strong> Choose appropriate flags like global (g) or case-insensitive (i)
                  </li>
                  <li>
                    <strong>3. Add Test Text:</strong> Enter sample text to test your regex against
                  </li>
                  <li>
                    <strong>4. View Results:</strong> See matches highlighted in real-time with match count
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  💡 Advanced Features
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                  <li>
                    <strong>Common Patterns:</strong> Click on pre-built patterns to quickly test common use cases
                  </li>
                  <li>
                    <strong>Pattern Library:</strong> Browse email, phone, URL, and other validation patterns
                  </li>
                  <li>
                    <strong>Syntax Reference:</strong> Use the metacharacters guide for regex syntax help
                  </li>
                  <li>
                    <strong>Error Detection:</strong> Invalid patterns are highlighted with helpful error messages
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🎯 Common Use Cases
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-medium mb-2">Data Validation</h4>
                  <p>Validate email addresses, phone numbers, and user input in forms</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Text Processing</h4>
                  <p>Find and replace patterns in text documents and code files</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Log Analysis</h4>
                  <p>Extract specific information from log files and system outputs</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                ⚠️ Important Notes
              </h4>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• Always test your regex with various input examples before using in production</li>
                <li>• Be aware of regex performance with large text inputs</li>
                <li>• Use anchors (^ and $) for exact matches when needed</li>
                <li>• Escape special characters with backslash (\) when matching literally</li>
              </ul>
            </div>
          </div>

          <DeveloperToolsNav currentPath="/regex-validator" />
        </div>
      </div>
    </>
  );
}
