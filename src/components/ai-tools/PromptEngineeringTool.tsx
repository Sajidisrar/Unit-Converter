'use client';

import { useState } from 'react';

const languages = ['JavaScript', 'Python', 'TypeScript', 'Java', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin'];

const promptCategories = [
  {
    name: 'Code Generation', icon: '⚡',
    prompts: [
      { title: 'Create a Function', template: 'Create a {language} function that {description}. Include proper error handling, documentation, and follow best practices.' },
      { title: 'Build a Class', template: 'Create a {language} class for {purpose}. Include constructor, getters, setters, and methods. Follow naming conventions.' },
      { title: 'API Endpoint', template: 'Write a {language} API endpoint that {description}. Include request validation and proper HTTP status codes.' },
    ]
  },
  {
    name: 'Code Review', icon: '🔍',
    prompts: [
      { title: 'Code Review', template: 'Review this {language} code for bugs, performance issues, and security vulnerabilities:\n\n{code}' },
      { title: 'Performance Optimization', template: 'Analyze this {language} code for performance bottlenecks and suggest optimizations:\n\n{code}' },
      { title: 'Security Audit', template: 'Perform a security audit of this {language} code. Check for common vulnerabilities:\n\n{code}' },
    ]
  },
  {
    name: 'Debugging', icon: '🐛',
    prompts: [
      { title: 'Debug Error', template: 'Help debug this {language} error: {error}\n\nCode:\n{code}\n\nProvide solutions.' },
      { title: 'Performance Debugging', template: 'This {language} application is running slowly. Identify performance bottlenecks:\n\n{code}' },
    ]
  },
  {
    name: 'Testing', icon: '🧪',
    prompts: [
      { title: 'Unit Tests', template: 'Write comprehensive unit tests for this {language} code. Include edge cases:\n\n{code}' },
      { title: 'Integration Tests', template: 'Create integration tests for this {language} API/service:\n\n{code}' },
    ]
  },
  {
    name: 'Documentation', icon: '📚',
    prompts: [
      { title: 'Code Documentation', template: 'Generate comprehensive documentation for this {language} code including function descriptions and usage examples:\n\n{code}' },
      { title: 'API Documentation', template: 'Create API documentation for this {language} service including endpoints and example requests:\n\n{code}' },
    ]
  }
];

export default function PromptEngineeringTool() {
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
  const [selectedCategory, setSelectedCategory] = useState(promptCategories[0]);
  const [selectedPrompt, setSelectedPrompt] = useState(promptCategories[0].prompts[0]);
  const [variables, setVariables] = useState<Record<string, string>>({ language: 'JavaScript' });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setVariables(prev => ({ ...prev, language: lang }));
  };

  const handleVariableChange = (key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  };

  const generatePrompt = () => {
    let prompt = selectedPrompt.template;
    Object.entries(variables).forEach(([key, value]) => {
      prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value || `[${key}]`);
    });
    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Extract variables from template
  const templateVariables = selectedPrompt.template.match(/{(\w+)}/g)?.map(v => v.slice(1, -1)) || [];

  return (
    <div>
      {/* Language Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Choose Programming Language
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLanguage === lang
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Selection */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Prompt Categories</h3>
          <div className="space-y-2">
            {promptCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedPrompt(category.prompts[0]);
                }}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedCategory.name === category.name
                    ? 'bg-pink-100 dark:bg-pink-900/20 border-pink-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } border`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Generator */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {selectedCategory.name} Prompts
            </h3>

            {/* Prompt Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Template
              </label>
              <select
                value={selectedPrompt.title}
                onChange={(e) => {
                  const prompt = selectedCategory.prompts.find(p => p.title === e.target.value);
                  if (prompt) setSelectedPrompt(prompt);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                {selectedCategory.prompts.map((prompt, index) => (
                  <option key={index} value={prompt.title}>{prompt.title}</option>
                ))}
              </select>
            </div>

            {/* Variable Inputs */}
            <div className="mb-4 space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Fill in Variables</h4>
              {templateVariables.map((variable) => (
                <div key={variable}>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 capitalize">
                    {variable.replace('_', ' ')}
                  </label>
                  {variable === 'code' ? (
                    <textarea
                      value={variables[variable] || ''}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      placeholder={`Enter ${variable}...`}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white font-mono text-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={variables[variable] || ''}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      placeholder={`Enter ${variable}...`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePrompt}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-4"
            >
              Generate Prompt
            </button>

            {/* Generated Prompt */}
            {generatedPrompt && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Generated Prompt</h4>
                  <button
                    onClick={copyToClipboard}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-3 rounded">
                  {generatedPrompt}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Prompt Engineering Tips</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>1. Be specific about language version and framework</li>
          <li>2. Provide context about your project requirements</li>
          <li>3. Ask AI to think step by step for complex problems</li>
          <li>4. Include examples of expected output format</li>
        </ul>
      </div>
    </div>
  );
}
