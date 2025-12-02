'use client';

import { useState } from 'react';

const programmingLanguages = [
  {
    name: 'JavaScript', icon: '⚡', description: 'Web development powerhouse',
    syntax: { variables: 'let, const, var', functions: 'function name() {} or () => {}', loops: 'for, while, forEach, map', async: 'async/await, Promise' },
    patterns: ['Array destructuring: const [a, b] = array', 'Template literals: `Hello ${name}`', 'Spread operator: [...arr, newItem]', 'Optional chaining: obj?.prop']
  },
  {
    name: 'Python', icon: '🐍', description: 'AI and data science favorite',
    syntax: { variables: 'name = value', functions: 'def function_name():', loops: 'for item in iterable:', async: 'async def, await' },
    patterns: ['List comprehensions: [x*2 for x in range(10)]', 'F-strings: f"Hello {name}"', 'Context managers: with open(file) as f:', 'Lambda: lambda x: x * 2']
  },
  {
    name: 'TypeScript', icon: '🔷', description: 'JavaScript with superpowers',
    syntax: { variables: 'let name: string = "value"', functions: 'function name(param: type): returnType {}', loops: 'for, while, forEach, map', async: 'async/await, Promise<T>' },
    patterns: ['Interfaces: interface User { id: number }', 'Generics: function<T>(arg: T): T', 'Union types: string | number', 'Type guards: if (typeof x === "string")']
  },
  {
    name: 'Java', icon: '☕', description: 'Enterprise and Android',
    syntax: { variables: 'String name = "value";', functions: 'public void methodName() {}', loops: 'for, while, enhanced for', async: 'CompletableFuture, @Async' },
    patterns: ['Inheritance: class Child extends Parent', 'Generics: List<String> list', 'Lambda: list.stream().map(x -> x*2)', 'Optional: Optional<String> maybeValue']
  },
  {
    name: 'Go', icon: '🐹', description: 'Cloud-native development',
    syntax: { variables: 'var name string = "value"', functions: 'func functionName() {}', loops: 'for i := 0; i < 10; i++', async: 'goroutines, channels' },
    patterns: ['Short declaration: name := "value"', 'Multiple returns: func() (int, error)', 'Error handling: if err != nil {}', 'Goroutines: go functionName()']
  },
  {
    name: 'Rust', icon: '🦀', description: 'Memory-safe systems programming',
    syntax: { variables: 'let name: String = "value".to_string();', functions: 'fn function_name() {}', loops: 'for item in iterable', async: 'async/await, Future' },
    patterns: ['Ownership: let owned = value;', 'Borrowing: &value, &mut value', 'Result<T, E>: Ok(value), Err(error)', 'Closures: |x| x * 2']
  }
];

const aiTools = [
  { name: 'OpenAI GPT', description: 'GPT models, embeddings, fine-tuning', category: 'AI Development' },
  { name: 'Anthropic Claude', description: 'Advanced reasoning and code generation', category: 'AI Development' },
  { name: 'GitHub Copilot', description: 'AI pair programming', category: 'Dev Tools' },
  { name: 'Cursor', description: 'AI-powered code editor', category: 'Dev Tools' },
  { name: 'TensorFlow', description: 'End-to-end ML platform', category: 'Machine Learning' },
  { name: 'PyTorch', description: 'Dynamic neural networks', category: 'Machine Learning' },
];

export default function AiCheatSheetTool() {
  const [selectedLanguage, setSelectedLanguage] = useState(programmingLanguages[0]);
  const [activeTab, setActiveTab] = useState<'syntax' | 'patterns'>('syntax');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div>
      {/* Language Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Choose Programming Language
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {programmingLanguages.map((lang, index) => (
            <button
              key={index}
              onClick={() => setSelectedLanguage(lang)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedLanguage.name === lang.name
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
              }`}
            >
              <div className="text-2xl mb-1">{lang.icon}</div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">{lang.name}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{lang.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Language Details */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{selectedLanguage.icon}</span>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLanguage.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{selectedLanguage.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-4 border-b border-gray-200 dark:border-gray-600">
          <button
            onClick={() => setActiveTab('syntax')}
            className={`pb-2 px-1 font-medium ${
              activeTab === 'syntax'
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            Syntax Reference
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`pb-2 px-1 font-medium ${
              activeTab === 'patterns'
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            Common Patterns
          </button>
        </div>

        {activeTab === 'syntax' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(selectedLanguage.syntax).map(([key, value]) => (
              <div key={key} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 capitalize">{key}</h4>
                <code className="text-sm text-purple-600 dark:text-purple-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{value}</code>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-3">
            {selectedLanguage.patterns.map((pattern, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                <code className="text-sm text-purple-600 dark:text-purple-400">{pattern}</code>
                <button
                  onClick={() => copyToClipboard(pattern)}
                  className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 rounded px-2 py-1"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Tools Reference */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Essential AI Development Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiTools.map((tool, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="font-medium text-gray-900 dark:text-white">{tool.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">{tool.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
