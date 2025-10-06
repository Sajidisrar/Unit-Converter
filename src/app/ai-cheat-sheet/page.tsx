'use client';

import { useState } from 'react';
import Head from 'next/head';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import AdBanner from '@/components/AdBanner';

const programmingLanguages = [
  {
    name: 'JavaScript',
    icon: '🟨',
    description: 'The web development powerhouse',
    syntax: {
      variables: 'let, const, var',
      functions: 'function name() {} or const name = () => {}',
      loops: 'for, while, forEach, map, filter',
      conditionals: 'if, else if, else, switch',
      objects: 'const obj = { key: value }',
      arrays: 'const arr = [1, 2, 3]',
      async: 'async/await, Promise, fetch()',
      classes: 'class Name { constructor() {} }'
    },
    commonPatterns: [
      'Array destructuring: const [a, b] = array',
      'Object destructuring: const { prop } = obj',
      'Template literals: `Hello ${name}`',
      'Arrow functions: arr.map(x => x * 2)',
      'Spread operator: [...arr, newItem]',
      'Optional chaining: obj?.prop?.nested'
    ]
  },
  {
    name: 'Python',
    icon: '🐍',
    description: 'AI and data science favorite',
    syntax: {
      variables: 'name = value',
      functions: 'def function_name():',
      loops: 'for item in iterable:',
      conditionals: 'if, elif, else',
      objects: 'class MyClass:',
      arrays: 'list = [1, 2, 3]',
      async: 'async def, await',
      classes: 'class Name: def __init__(self):'
    },
    commonPatterns: [
      'List comprehensions: [x*2 for x in range(10)]',
      'Dictionary comprehensions: {k: v for k, v in dict.items()}',
      'Lambda functions: lambda x: x * 2',
      'Context managers: with open(file) as f:',
      'F-strings: f"Hello {name}"',
      'Unpacking: a, b = tuple'
    ]
  },
  {
    name: 'TypeScript',
    icon: '🔷',
    description: 'JavaScript with superpowers',
    syntax: {
      variables: 'let name: string = "value"',
      functions: 'function name(param: type): returnType {}',
      loops: 'for, while, forEach, map',
      conditionals: 'if, else if, else, switch',
      objects: 'interface IName { prop: type }',
      arrays: 'const arr: number[] = [1, 2, 3]',
      async: 'async/await, Promise<T>',
      classes: 'class Name implements IName {}'
    },
    commonPatterns: [
      'Type annotations: const name: string',
      'Interfaces: interface User { id: number }',
      'Generics: function<T>(arg: T): T',
      'Union types: string | number',
      'Optional properties: { prop?: string }',
      'Type guards: if (typeof x === "string")'
    ]
  },
  {
    name: 'Java',
    icon: '☕',
    description: 'Enterprise and Android development',
    syntax: {
      variables: 'String name = "value";',
      functions: 'public void methodName() {}',
      loops: 'for, while, enhanced for',
      conditionals: 'if, else if, else, switch',
      objects: 'class MyClass { }',
      arrays: 'int[] arr = {1, 2, 3};',
      async: 'CompletableFuture, @Async',
      classes: 'public class Name { }'
    },
    commonPatterns: [
      'Method overloading: same name, different params',
      'Inheritance: class Child extends Parent',
      'Interfaces: class MyClass implements Interface',
      'Generics: List<String> list',
      'Lambda expressions: list.stream().map(x -> x*2)',
      'Optional: Optional<String> maybeValue'
    ]
  },
  {
    name: 'C#',
    icon: '🔵',
    description: 'Microsoft ecosystem development',
    syntax: {
      variables: 'string name = "value";',
      functions: 'public void MethodName() { }',
      loops: 'for, while, foreach',
      conditionals: 'if, else if, else, switch',
      objects: 'public class MyClass { }',
      arrays: 'int[] arr = {1, 2, 3};',
      async: 'async/await, Task<T>',
      classes: 'public class Name { }'
    },
    commonPatterns: [
      'LINQ: collection.Where(x => x > 5)',
      'Properties: public string Name { get; set; }',
      'Nullable types: int? nullableInt',
      'Pattern matching: switch expressions',
      'String interpolation: $"Hello {name}"',
      'Using statements: using (var resource) { }'
    ]
  },
  {
    name: 'Go',
    icon: '🐹',
    description: 'Cloud-native and microservices',
    syntax: {
      variables: 'var name string = "value"',
      functions: 'func functionName() {}',
      loops: 'for i := 0; i < 10; i++',
      conditionals: 'if, else if, else, switch',
      objects: 'type MyStruct struct {}',
      arrays: 'arr := []int{1, 2, 3}',
      async: 'goroutines, channels',
      classes: 'type Name struct {}'
    },
    commonPatterns: [
      'Short variable declaration: name := "value"',
      'Multiple return values: func() (int, error)',
      'Error handling: if err != nil { }',
      'Goroutines: go functionName()',
      'Channels: ch := make(chan int)',
      'Interfaces: implicit implementation'
    ]
  },
  {
    name: 'Rust',
    icon: '🦀',
    description: 'Systems programming with memory safety',
    syntax: {
      variables: 'let name: String = "value".to_string();',
      functions: 'fn function_name() {}',
      loops: 'for item in iterable',
      conditionals: 'if, else if, else, match',
      objects: 'struct MyStruct {}',
      arrays: 'let arr = [1, 2, 3];',
      async: 'async/await, Future',
      classes: 'struct Name {}'
    },
    commonPatterns: [
      'Ownership: let owned = value;',
      'Borrowing: &value, &mut value',
      'Pattern matching: match value {}',
      'Result<T, E>: Ok(value), Err(error)',
      'Option<T>: Some(value), None',
      'Closures: |x| x * 2'
    ]
  },
  {
    name: 'PHP',
    icon: '🐘',
    description: 'Web development and WordPress',
    syntax: {
      variables: '$name = "value";',
      functions: 'function functionName() {}',
      loops: 'for, while, foreach',
      conditionals: 'if, else if, else, switch',
      objects: 'class MyClass {}',
      arrays: '$arr = [1, 2, 3];',
      async: 'async/await, Promise',
      classes: 'class Name {}'
    },
    commonPatterns: [
      'Variable variables: $$varName',
      'Array syntax: $arr = [1, 2, 3]',
      'String interpolation: "Hello $name"',
      'Null coalescing: $value ?? "default"',
      'Arrow functions: fn($x) => $x * 2',
      'Namespaces: namespace MyNamespace;'
    ]
  },
  {
    name: 'Ruby',
    icon: '💎',
    description: 'Elegant and developer-friendly',
    syntax: {
      variables: 'name = "value"',
      functions: 'def method_name end',
      loops: 'for, while, each',
      conditionals: 'if, elsif, else, case',
      objects: 'class MyClass end',
      arrays: 'arr = [1, 2, 3]',
      async: 'async/await, Fiber',
      classes: 'class Name end'
    },
    commonPatterns: [
      'Method chaining: obj.method1.method2',
      'Blocks: arr.each { |item| puts item }',
      'Symbols: :symbol_name',
      'Hash syntax: { key: value }',
      'String interpolation: "Hello #{name}"',
      'Metaprogramming: define_method'
    ]
  },
  {
    name: 'Swift',
    icon: '🦉',
    description: 'iOS and macOS development',
    syntax: {
      variables: 'let name: String = "value"',
      functions: 'func functionName() {}',
      loops: 'for, while, for-in',
      conditionals: 'if, else if, else, switch',
      objects: 'class MyClass {}',
      arrays: 'let arr = [1, 2, 3]',
      async: 'async/await, Task',
      classes: 'class Name {}'
    },
    commonPatterns: [
      'Optionals: var name: String?',
      'Unwrapping: if let name = optionalName',
      'Guard statements: guard condition else { return }',
      'Closures: { (param) -> ReturnType in }',
      'Extensions: extension String {}',
      'Protocols: protocol MyProtocol {}'
    ]
  }
];

const aiTools = [
  {
    category: 'AI Development',
    tools: [
      { name: 'OpenAI API', description: 'GPT models, embeddings, fine-tuning' },
      { name: 'Anthropic Claude', description: 'Advanced reasoning and code generation' },
      { name: 'Google Gemini', description: 'Multimodal AI capabilities' },
      { name: 'Hugging Face', description: 'Open-source models and datasets' },
      { name: 'LangChain', description: 'LLM application framework' },
      { name: 'Pinecone', description: 'Vector database for embeddings' }
    ]
  },
  {
    category: 'Machine Learning',
    tools: [
      { name: 'TensorFlow', description: 'End-to-end ML platform' },
      { name: 'PyTorch', description: 'Dynamic neural networks' },
      { name: 'Scikit-learn', description: 'Classical ML algorithms' },
      { name: 'Pandas', description: 'Data manipulation and analysis' },
      { name: 'NumPy', description: 'Numerical computing' },
      { name: 'Jupyter', description: 'Interactive notebooks' }
    ]
  },
  {
    category: 'Development Tools',
    tools: [
      { name: 'GitHub Copilot', description: 'AI pair programming' },
      { name: 'Cursor', description: 'AI-powered code editor' },
      { name: 'Tabnine', description: 'Code completion AI' },
      { name: 'Replit', description: 'Online IDE with AI' },
      { name: 'Codeium', description: 'Free AI code assistant' },
      { name: 'Amazon CodeWhisperer', description: 'AWS AI coding companion' }
    ]
  }
];

export default function AICheatSheetPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(programmingLanguages[0]);
  const [activeTab, setActiveTab] = useState('syntax');

  return (
    <>
      <Head>
        <title>Developer AI Cheat Sheet - Programming Languages & AI Tools 2025</title>
        <meta
          name="description"
          content="Complete developer AI cheat sheet for 10 main programming languages including JavaScript, Python, TypeScript, Java, C#, Go, Rust, PHP, Ruby, Swift. Plus AI tools, frameworks, and development resources for 2025."
        />
        <meta
          name="keywords"
          content="developer cheat sheet, programming languages cheat sheet, AI development tools, JavaScript cheat sheet, Python cheat sheet, TypeScript cheat sheet, Java cheat sheet, C# cheat sheet, Go cheat sheet, Rust cheat sheet, PHP cheat sheet, Ruby cheat sheet, Swift cheat sheet, AI programming tools, machine learning tools, developer resources, coding reference, programming syntax, AI frameworks, developer tools 2025"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/ai-cheat-sheet" />
        <meta property="og:title" content="Developer AI Cheat Sheet - Programming Languages & AI Tools" />
        <meta property="og:description" content="Complete reference for 10 main programming languages with syntax, patterns, and AI development tools for modern developers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/ai-cheat-sheet" />
      </Head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Developer AI Cheat Sheet",
        "description": "Complete developer reference for programming languages and AI tools",
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": programmingLanguages.map((lang, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": lang.name,
            "description": lang.description
          }))
        }
      })}} />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Developer AI Cheat Sheet
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Programming Languages & AI Tools Reference
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Master the syntax, patterns, and best practices for the top 10 programming languages. 
              Plus essential AI development tools, frameworks, and resources for modern developers in 2025.
            </p>
          </div>

          <div className="mb-8">
            <AdBanner position="top" />
          </div>

          {/* Language Selection */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Choose a Programming Language
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {programmingLanguages.map((lang, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedLanguage.name === lang.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="text-3xl mb-2">{lang.icon}</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {lang.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {lang.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Language Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">{selectedLanguage.icon}</span>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedLanguage.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedLanguage.description}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('syntax')}
                className={`pb-2 px-1 font-medium ${
                  activeTab === 'syntax'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Syntax Reference
              </button>
              <button
                onClick={() => setActiveTab('patterns')}
                className={`pb-2 px-1 font-medium ${
                  activeTab === 'patterns'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Common Patterns
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'syntax' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(selectedLanguage.syntax).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <code className="text-sm text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                      {value}
                    </code>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'patterns' && (
              <div className="space-y-4">
                {selectedLanguage.commonPatterns.map((pattern, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <code className="text-sm text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                      {pattern}
                    </code>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <AdBanner position="inline" />
          </div>

          {/* AI Tools Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Essential AI Development Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aiTools.map((category, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {category.category}
                  </h4>
                  <div className="space-y-3">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="border-l-4 border-blue-500 pl-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {tool.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {tool.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference Cards */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Quick Reference Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  🚀 Getting Started
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Choose your language based on project needs</li>
                  <li>• Set up development environment</li>
                  <li>• Learn basic syntax and patterns</li>
                  <li>• Practice with small projects</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                  🛠️ Best Practices
                </h4>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>• Write clean, readable code</li>
                  <li>• Use version control (Git)</li>
                  <li>• Write tests for your code</li>
                  <li>• Document your functions</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                  🤖 AI Integration
                </h4>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                  <li>• Use AI for code completion</li>
                  <li>• Leverage AI for debugging</li>
                  <li>• Integrate AI APIs in your apps</li>
                  <li>• Learn prompt engineering</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Developer Resources & Learning Paths
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Popular Programming Languages in 2025
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Based on developer surveys and job market trends, these programming languages 
                  are essential for modern development. <strong>JavaScript</strong> dominates web development, 
                  <strong>Python</strong> leads in AI and data science, while <strong>TypeScript</strong> 
                  provides type safety for large applications.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Java</strong> remains strong in enterprise development, <strong>C#</strong> 
                  powers Microsoft ecosystems, and <strong>Go</strong> excels in cloud-native applications. 
                  <strong>Rust</strong> is gaining popularity for systems programming, while <strong>Swift</strong> 
                  is essential for iOS development.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  AI Development Tools & Frameworks
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Modern development increasingly involves AI integration. <strong>OpenAI API</strong> 
                  and <strong>Anthropic Claude</strong> provide powerful language models, while 
                  <strong>TensorFlow</strong> and <strong>PyTorch</strong> enable machine learning development.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>GitHub Copilot</strong> and <strong>Cursor</strong> enhance coding productivity, 
                  while <strong>LangChain</strong> simplifies LLM application development. 
                  <strong>Hugging Face</strong> offers access to thousands of open-source models.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                💡 Pro Tips for Developers
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• <strong>Master one language deeply</strong> before learning multiple languages</li>
                <li>• <strong>Practice regularly</strong> with coding challenges and projects</li>
                <li>• <strong>Stay updated</strong> with language updates and new features</li>
                <li>• <strong>Use AI tools</strong> to accelerate learning and development</li>
                <li>• <strong>Join communities</strong> and contribute to open-source projects</li>
                <li>• <strong>Build projects</strong> that solve real-world problems</li>
              </ul>
            </div>
          </div>

          <DeveloperToolsNav currentPath="/ai-cheat-sheet" />
        </div>
      </div>
    </>
  );
}
