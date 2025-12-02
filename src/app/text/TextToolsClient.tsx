'use client';

import { useState } from 'react';
import TabContainer from '@/components/shared/TabContainer';
import { TextCompareTool, RegexValidatorTool } from '@/components/text-tools';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

const tabs = [
  { id: 'compare', label: 'Text Compare', icon: '📝' },
  { id: 'regex', label: 'Regex Validator', icon: '🔍' },
];

export default function TextToolsClient() {
  const [activeTab, setActiveTab] = useState('compare');

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Text Processing Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Compare text documents, test regular expressions, and transform strings. Essential tools for developers and writers.
          </p>
        </header>

        {/* Main Tool */}
        <main className="max-w-[1600px] mx-auto">
          {/* Ad Banner - Top */}
          <div className="mb-4">
            <AdBanner position="top" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
            {/* Tab Navigation */}
            <TabContainer
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              accentColor="emerald"
            />

            {/* Tool Content */}
            <div className="mt-6">
              {activeTab === 'compare' && <TextCompareTool />}
              {activeTab === 'regex' && <RegexValidatorTool />}
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About Text Tools</h2>

            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Text Comparison</h3>
                <p>Compare two text documents and find differences instantly. Choose between line-by-line, word-by-word, or character-by-character comparison modes. Perfect for code review, document versioning, and content analysis.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Regex Validator</h3>
                <p>Test and validate regular expressions with real-time matching. Includes 20+ common patterns for email, phone, URL, and password validation. Browse the metacharacter reference and flag options to build complex patterns.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">String Helpers</h3>
                <p>Transform text with one click - trim whitespace, change case, reverse text, add line numbers, and more. Get instant character, word, and line counts for your text.</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <h3 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">Browser-Based Processing</h3>
              <p className="text-sm text-teal-700 dark:text-teal-400">
                All text processing happens entirely in your browser. Your data never leaves your device, ensuring complete privacy and security.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is the difference between line, word, and character comparison modes?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Line mode compares text line by line, ideal for code review and configuration files. Word mode compares individual words, best for documents and prose. Character mode compares letter by letter, useful for finding typos and precise text validation.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I compare two text files online?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Paste your first text in the left panel and second text in the right panel. Click &quot;Compare Text&quot; to see differences. Added lines show in green, removed lines in red. Use different comparison modes based on your needs.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is a regular expression (regex)?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">A regular expression is a pattern that describes a set of strings. It uses special characters like . (any character), * (zero or more), + (one or more), and character classes like \d (digits), \w (word characters) to match text patterns.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I validate an email address with regex?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Click on the &quot;Email&quot; pattern in our Common Patterns section. It loads the pattern automatically. The email regex matches the format: username@domain.extension with proper validation for each part.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What do regex flags g, i, m, and s mean?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">g (global) finds all matches, not just the first. i (case-insensitive) ignores uppercase/lowercase. m (multiline) makes ^ and $ match line starts/ends. s (dotall) makes . match newline characters too.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I match a phone number with regex?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Click &quot;Phone (US)&quot; in Common Patterns. It matches formats like (555) 123-4567, 555-123-4567, and +1 555 123 4567. The pattern handles optional country code, parentheses, dashes, and spaces.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is the difference between * and + in regex?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">* matches zero or more occurrences, while + matches one or more. For example, a* matches empty string, &quot;a&quot;, and &quot;aa&quot;, but a+ requires at least one &quot;a&quot; - it matches &quot;a&quot; and &quot;aa&quot; but not empty string.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I use regex to find URLs in text?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Click &quot;URL&quot; in Common Patterns. The pattern matches both http and https URLs, including optional www prefix, domain, and path. Enable global flag (g) to find all URLs in a text.</p>
              </div>
            </div>
          </div>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/text" />
        </main>
      </div>
    </div>
  );
}
