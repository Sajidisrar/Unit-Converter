'use client';

import { useState } from 'react';
import Head from 'next/head';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import AdBanner from '@/components/AdBanner';

const programmingLanguages = [
  { name: 'JavaScript', icon: '🟨', extension: '.js' },
  { name: 'Python', icon: '🐍', extension: '.py' },
  { name: 'TypeScript', icon: '🔷', extension: '.ts' },
  { name: 'Java', icon: '☕', extension: '.java' },
  { name: 'C#', icon: '🔵', extension: '.cs' },
  { name: 'Go', icon: '🐹', extension: '.go' },
  { name: 'Rust', icon: '🦀', extension: '.rs' },
  { name: 'PHP', icon: '🐘', extension: '.php' },
  { name: 'Ruby', icon: '💎', extension: '.rb' },
  { name: 'Swift', icon: '🦉', extension: '.swift' }
];

const promptCategories = [
  {
    name: 'Code Generation',
    icon: '⚡',
    description: 'Generate new code from scratch',
    prompts: [
      {
        title: 'Create a Function',
        prompt: 'Create a {language} function that {description}. Include proper error handling, documentation, and follow {language} best practices.',
        variables: ['language', 'description']
      },
      {
        title: 'Build a Class',
        prompt: 'Create a {language} class for {class_purpose}. Include constructor, getters, setters, and at least 3 methods. Follow {language} naming conventions.',
        variables: ['language', 'class_purpose']
      },
      {
        title: 'API Endpoint',
        prompt: 'Write a {language} API endpoint that {endpoint_description}. Include request validation, error handling, and proper HTTP status codes.',
        variables: ['language', 'endpoint_description']
      },
      {
        title: 'Database Model',
        prompt: 'Create a {language} database model for {model_name} with fields: {fields}. Include relationships, validation, and migration if applicable.',
        variables: ['language', 'model_name', 'fields']
      }
    ]
  },
  {
    name: 'Code Review',
    icon: '🔍',
    description: 'Review and improve existing code',
    prompts: [
      {
        title: 'Code Review',
        prompt: 'Review this {language} code for bugs, performance issues, security vulnerabilities, and best practices. Provide specific suggestions:\n\n{code}',
        variables: ['language', 'code']
      },
      {
        title: 'Performance Optimization',
        prompt: 'Analyze this {language} code for performance bottlenecks and suggest optimizations. Focus on time complexity and memory usage:\n\n{code}',
        variables: ['language', 'code']
      },
      {
        title: 'Security Audit',
        prompt: 'Perform a security audit of this {language} code. Check for common vulnerabilities like injection attacks, XSS, CSRF, and insecure data handling:\n\n{code}',
        variables: ['language', 'code']
      },
      {
        title: 'Refactoring Suggestions',
        prompt: 'Suggest refactoring improvements for this {language} code to make it more maintainable, readable, and follow SOLID principles:\n\n{code}',
        variables: ['language', 'code']
      }
    ]
  },
  {
    name: 'Debugging',
    icon: '🐛',
    description: 'Find and fix bugs',
    prompts: [
      {
        title: 'Debug Error',
        prompt: 'Help debug this {language} error: {error_message}\n\nCode:\n{code}\n\nProvide step-by-step debugging approach and potential solutions.',
        variables: ['language', 'error_message', 'code']
      },
      {
        title: 'Log Analysis',
        prompt: 'Analyze these {language} application logs and identify the root cause of the issue:\n\n{logs}\n\nSuggest fixes and preventive measures.',
        variables: ['language', 'logs']
      },
      {
        title: 'Performance Debugging',
        prompt: 'This {language} application is running slowly. Analyze the code and identify performance bottlenecks:\n\n{code}\n\nProvide profiling suggestions and optimization strategies.',
        variables: ['language', 'code']
      },
      {
        title: 'Memory Leak Detection',
        prompt: 'Help identify potential memory leaks in this {language} code:\n\n{code}\n\nSuggest debugging tools and code improvements.',
        variables: ['language', 'code']
      }
    ]
  },
  {
    name: 'Testing',
    icon: '🧪',
    description: 'Write and improve tests',
    prompts: [
      {
        title: 'Unit Tests',
        prompt: 'Write comprehensive unit tests for this {language} {function_type}:\n\n{code}\n\nInclude edge cases, error conditions, and mock external dependencies.',
        variables: ['language', 'function_type', 'code']
      },
      {
        title: 'Integration Tests',
        prompt: 'Create integration tests for this {language} API/service. Test the complete flow including database interactions and external API calls:\n\n{code}',
        variables: ['language', 'code']
      },
      {
        title: 'Test Coverage',
        prompt: 'Analyze test coverage for this {language} code and suggest additional test cases:\n\nCode:\n{code}\n\nTests:\n{tests}',
        variables: ['language', 'code', 'tests']
      },
      {
        title: 'Mock Objects',
        prompt: 'Create mock objects and test doubles for this {language} code to enable isolated unit testing:\n\n{code}',
        variables: ['language', 'code']
      }
    ]
  },
  {
    name: 'Documentation',
    icon: '📚',
    description: 'Generate documentation',
    prompts: [
      {
        title: 'Code Documentation',
        prompt: 'Generate comprehensive documentation for this {language} code including function descriptions, parameters, return values, and usage examples:\n\n{code}',
        variables: ['language', 'code']
      },
      {
        title: 'API Documentation',
        prompt: 'Create API documentation for this {language} service including endpoints, request/response schemas, authentication, and example requests:\n\n{code}',
        variables: ['language', 'code']
      },
      {
        title: 'README Generation',
        prompt: 'Generate a README.md for this {language} project. Include installation instructions, usage examples, API reference, and contribution guidelines.',
        variables: ['language']
      },
      {
        title: 'Code Comments',
        prompt: 'Add meaningful comments to this {language} code explaining the logic, algorithms, and business rules:\n\n{code}',
        variables: ['language', 'code']
      }
    ]
  },
  {
    name: 'Architecture',
    icon: '🏗️',
    description: 'Design system architecture',
    prompts: [
      {
        title: 'System Design',
        prompt: 'Design a {system_type} system in {language}. Include architecture diagrams, component interactions, data flow, and scalability considerations.',
        variables: ['system_type', 'language']
      },
      {
        title: 'Database Design',
        prompt: 'Design a database schema for a {application_type} application. Include tables, relationships, indexes, and optimization strategies.',
        variables: ['application_type']
      },
      {
        title: 'Microservices Architecture',
        prompt: 'Design a microservices architecture for a {domain} application using {language}. Include service boundaries, communication patterns, and deployment strategies.',
        variables: ['domain', 'language']
      },
      {
        title: 'Code Organization',
        prompt: 'Suggest a folder structure and code organization for a large {language} {project_type} project. Include separation of concerns and modularity.',
        variables: ['language', 'project_type']
      }
    ]
  }
];

const aiTools = [
  {
    name: 'ChatGPT',
    description: 'OpenAI\'s conversational AI',
    bestFor: 'General coding, explanations, debugging',
    tips: 'Be specific about language version and framework'
  },
  {
    name: 'Claude',
    description: 'Anthropic\'s AI assistant',
    bestFor: 'Code analysis, complex reasoning, security',
    tips: 'Great for detailed code reviews and architecture'
  },
  {
    name: 'GitHub Copilot',
    description: 'AI pair programmer',
    bestFor: 'Real-time coding assistance',
    tips: 'Works best with clear function names and comments'
  },
  {
    name: 'Cursor',
    description: 'AI-powered code editor',
    bestFor: 'Code generation and editing',
    tips: 'Use @codebase to reference your project context'
  },
  {
    name: 'Codeium',
    description: 'Free AI code completion',
    bestFor: 'Code suggestions and completions',
    tips: 'Configure for your preferred coding style'
  }
];

export default function PromptEngineeringPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(programmingLanguages[0]);
  const [selectedCategory, setSelectedCategory] = useState(promptCategories[0]);
  const [selectedPrompt, setSelectedPrompt] = useState(promptCategories[0].prompts[0]);
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const generatePrompt = () => {
    let prompt = selectedPrompt.prompt;
    
    // Replace variables with custom values or defaults
    selectedPrompt.variables.forEach(variable => {
      const value = customVariables[variable] || `[${variable.replace('_', ' ')}]`;
      prompt = prompt.replace(new RegExp(`{${variable}}`, 'g'), value);
    });
    
    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleVariableChange = (variable: string, value: string) => {
    setCustomVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  // Auto-generate prompt when selections change
  useState(() => {
    generatePrompt();
  });

  return (
    <>
      <Head>
        <title>Prompt Engineering for Developers - AI Coding Prompts & Templates</title>
        <meta
          name="description"
          content="Master prompt engineering for developers with copyable AI prompts for 10 programming languages. Code generation, debugging, testing, documentation, and architecture prompts for ChatGPT, Claude, GitHub Copilot, and more."
        />
        <meta
          name="keywords"
          content="prompt engineering, AI coding prompts, developer prompts, ChatGPT prompts, Claude prompts, GitHub Copilot prompts, code generation prompts, debugging prompts, testing prompts, documentation prompts, programming language prompts, AI development, prompt templates, coding assistance, AI tools for developers"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/prompt-engineering" />
        <meta property="og:title" content="Prompt Engineering for Developers - AI Coding Prompts" />
        <meta property="og:description" content="Copy-ready AI prompts for 10 programming languages. Generate code, debug issues, write tests, and create documentation with optimized prompts for ChatGPT, Claude, and other AI tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/prompt-engineering" />
      </Head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Prompt Engineering for Developers",
        "description": "AI coding prompts and templates for developers",
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": programmingLanguages.map((lang, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": lang.name,
            "description": `AI prompts for ${lang.name} development`
          }))
        }
      })}} />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Prompt Engineering for Developers
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              AI Coding Prompts & Templates
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Master the art of prompt engineering for AI coding assistance. Get copy-ready prompts for 
              code generation, debugging, testing, documentation, and architecture across 10 programming languages.
            </p>
          </div>

          <div className="mb-8">
            <AdBanner position="top" />
          </div>

          {/* Language Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Choose Programming Language
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {programmingLanguages.map((lang, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedLanguage.name === lang.name
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <div className="text-3xl mb-2">{lang.icon}</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {lang.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {lang.extension}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Category Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Prompt Categories
                </h3>
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
                          ? 'bg-purple-100 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      } border`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {category.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {category.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Tools Reference */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  AI Tools & Tips
                </h3>
                <div className="space-y-4">
                  {aiTools.map((tool, index) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {tool.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {tool.description}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        <strong>Best for:</strong> {tool.bestFor}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        <strong>Tip:</strong> {tool.tips}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt Generator */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {selectedCategory.name} Prompts
                </h3>

                {/* Prompt Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Prompt Template
                  </label>
                  <select
                    value={selectedPrompt.title}
                    onChange={(e) => {
                      const prompt = selectedCategory.prompts.find(p => p.title === e.target.value);
                      if (prompt) setSelectedPrompt(prompt);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {selectedCategory.prompts.map((prompt, index) => (
                      <option key={index} value={prompt.title}>
                        {prompt.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Variable Inputs */}
                {selectedPrompt.variables.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Customize Variables
                    </h4>
                    <div className="space-y-4">
                      {selectedPrompt.variables.map((variable, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {variable.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </label>
                          <input
                            type="text"
                            value={customVariables[variable] || ''}
                            onChange={(e) => handleVariableChange(variable, e.target.value)}
                            placeholder={`Enter ${variable.replace('_', ' ')}...`}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generated Prompt */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Generated Prompt
                    </h4>
                    <button
                      onClick={() => copyToClipboard(generatedPrompt)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Copy Prompt
                    </button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {generatedPrompt}
                    </pre>
                  </div>
                </div>

                {/* Usage Instructions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 How to Use
                  </h4>
                  <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>1. Select your programming language and prompt category</li>
                    <li>2. Choose a specific prompt template</li>
                    <li>3. Fill in the variables with your specific requirements</li>
                    <li>4. Copy the generated prompt</li>
                    <li>5. Paste it into your AI tool (ChatGPT, Claude, etc.)</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <AdBanner position="inline" />
          </div>

          {/* SEO Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Prompt Engineering Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Effective Prompt Writing
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• <strong>Be specific:</strong> Include language version, framework, and requirements</li>
                  <li>• <strong>Provide context:</strong> Explain the problem domain and constraints</li>
                  <li>• <strong>Use examples:</strong> Show expected input/output when possible</li>
                  <li>• <strong>Specify format:</strong> Request code style, documentation, and structure</li>
                  <li>• <strong>Iterate and refine:</strong> Adjust prompts based on AI responses</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  AI Tool Optimization
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• <strong>ChatGPT:</strong> Great for explanations and step-by-step guidance</li>
                  <li>• <strong>Claude:</strong> Excellent for code analysis and security reviews</li>
                  <li>• <strong>GitHub Copilot:</strong> Best for real-time coding assistance</li>
                  <li>• <strong>Cursor:</strong> Ideal for codebase-aware generation</li>
                  <li>• <strong>Codeium:</strong> Good for free code completion</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🚀 Advanced Prompt Techniques
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-medium mb-2">Chain of Thought</h4>
                  <p>Ask AI to &quot;think step by step&quot; for complex problems</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Few-Shot Learning</h4>
                  <p>Provide examples to guide AI output format</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Role Playing</h4>
                  <p>Ask AI to act as a senior developer or architect</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Constraint Setting</h4>
                  <p>Specify performance, security, or style requirements</p>
                </div>
              </div>
            </div>
          </div>

          <DeveloperToolsNav currentPath="/prompt-engineering" />
        </div>
      </div>
    </>
  );
}
