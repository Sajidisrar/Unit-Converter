'use client';

import { useState } from 'react';
import Head from 'next/head';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import AdBanner from '@/components/AdBanner';

const programmingLanguages = [
  {
    name: 'JavaScript',
    icon: '⚡',
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
  },
  {
    name: 'Kotlin',
    icon: '🟣',
    description: 'Android and JVM development',
    syntax: {
      variables: 'val name: String = "value"',
      functions: 'fun functionName() {}',
      loops: 'for, while, forEach',
      conditionals: 'if, else if, else, when',
      objects: 'class MyClass {}',
      arrays: 'val arr = listOf(1, 2, 3)',
      async: 'suspend, coroutines',
      classes: 'class Name {}'
    },
    commonPatterns: [
      'Null safety: val name: String?',
      'Safe calls: obj?.method()',
      'Elvis operator: name ?: "default"',
      'Data classes: data class User(val name: String)',
      'Extension functions: fun String.customMethod()',
      'Lambda expressions: list.filter { it > 5 }'
    ]
  },
  {
    name: 'C++',
    icon: '⚙️',
    description: 'High-performance systems programming',
    color: 'text-blue-700',
    syntax: {
      variables: 'int name = 42;',
      functions: 'void functionName() {}',
      loops: 'for, while, do-while',
      conditionals: 'if, else if, else, switch',
      objects: 'class MyClass {}',
      arrays: 'int arr[] = {1, 2, 3};',
      async: 'std::async, std::future',
      classes: 'class Name {}'
    },
    commonPatterns: [
      'Pointers: int* ptr = &value;',
      'References: int& ref = value;',
      'Templates: template<typename T>',
      'RAII: Resource Acquisition Is Initialization',
      'Smart pointers: std::unique_ptr, std::shared_ptr',
      'STL containers: std::vector, std::map'
    ]
  },
  {
    name: 'C',
    icon: '🔧',
    description: 'The foundation of programming',
    color: 'text-gray-600',
    syntax: {
      variables: 'int name = 42;',
      functions: 'void functionName() {}',
      loops: 'for, while, do-while',
      conditionals: 'if, else if, else, switch',
      objects: 'struct MyStruct {}',
      arrays: 'int arr[] = {1, 2, 3};',
      async: 'pthreads, manual threading',
      classes: 'struct Name {}'
    },
    commonPatterns: [
      'Pointers: int* ptr = &value;',
      'Memory management: malloc, free',
      'Function pointers: int (*func)(int)',
      'Structs: struct Point { int x, y; };',
      'Preprocessor: #define, #include',
      'Bitwise operations: &, |, ^, ~'
    ]
  },
  {
    name: 'R',
    icon: '📊',
    description: 'Statistical computing and graphics',
    color: 'text-blue-400',
    syntax: {
      variables: 'name <- "value"',
      functions: 'function_name <- function() {}',
      loops: 'for, while, repeat',
      conditionals: 'if, else if, else, switch',
      objects: 'S3, S4 classes',
      arrays: 'arr <- c(1, 2, 3)',
      async: 'parallel processing',
      classes: 'setClass("Name")'
    },
    commonPatterns: [
      'Vectorization: x + y (element-wise)',
      'Data frames: data.frame()',
      'Piping: %>% operator',
      'Functional programming: lapply, sapply',
      'Statistical functions: mean, sd, cor',
      'Plotting: ggplot2, base R'
    ]
  },
  {
    name: 'MATLAB',
    icon: '🧮',
    description: 'Numerical computing and simulation',
    color: 'text-orange-400',
    syntax: {
      variables: 'name = "value";',
      functions: 'function function_name()',
      loops: 'for, while',
      conditionals: 'if, elseif, else, switch',
      objects: 'classdef MyClass',
      arrays: 'arr = [1, 2, 3];',
      async: 'parfor, parallel computing',
      classes: 'classdef Name'
    },
    commonPatterns: [
      'Matrix operations: A * B',
      'Array indexing: A(1:end)',
      'Cell arrays: {1, 2, 3}',
      'Function handles: @function_name',
      'Plotting: plot, surf, mesh',
      'Toolboxes: Signal Processing, Image Processing'
    ]
  },
  {
    name: 'Scala',
    icon: '🔺',
    description: 'Functional programming on JVM',
    color: 'text-red-400',
    syntax: {
      variables: 'val name = "value"',
      functions: 'def functionName(): Unit = {}',
      loops: 'for, while, foreach',
      conditionals: 'if, else if, else, match',
      objects: 'class MyClass {}',
      arrays: 'val arr = Array(1, 2, 3)',
      async: 'Future, Promise',
      classes: 'class Name {}'
    },
    commonPatterns: [
      'Immutability: val vs var',
      'Case classes: case class User(name: String)',
      'Pattern matching: match value {}',
      'Higher-order functions: map, filter, fold',
      'Implicits: implicit conversions',
      'Type inference: val x = 42'
    ]
  },
  {
    name: 'Haskell',
    icon: '🔷',
    description: 'Pure functional programming',
    color: 'text-purple-400',
    syntax: {
      variables: 'name = "value"',
      functions: 'functionName :: Type -> Type',
      loops: 'map, fold, recursion',
      conditionals: 'if, case, guards',
      objects: 'data MyType = Constructor',
      arrays: 'arr = [1, 2, 3]',
      async: 'IO monad, async',
      classes: 'data Name = Constructor'
    },
    commonPatterns: [
      'Pure functions: no side effects',
      'Type signatures: :: Type -> Type',
      'Pattern matching: case of',
      'Monads: Maybe, Either, IO',
      'Currying: partial application',
      'Lazy evaluation: infinite lists'
    ]
  },
  {
    name: 'Clojure',
    icon: '🟢',
    description: 'Lisp for the JVM',
    color: 'text-green-500',
    syntax: {
      variables: '(def name "value")',
      functions: '(defn function-name [] {})',
      loops: 'for, doseq, loop/recur',
      conditionals: 'if, when, cond',
      objects: 'defrecord, defprotocol',
      arrays: '[1 2 3]',
      async: 'core.async, channels',
      classes: 'defprotocol Name'
    },
    commonPatterns: [
      'S-expressions: (function arg1 arg2)',
      'Immutability: persistent data structures',
      'Macros: defmacro',
      'REPL-driven development',
      'Functional composition: ->, ->>',
      'Concurrency: atoms, refs, agents'
    ]
  },
  {
    name: 'Elixir',
    icon: '💧',
    description: 'Concurrent, fault-tolerant systems',
    color: 'text-purple-500',
    syntax: {
      variables: 'name = "value"',
      functions: 'def function_name do end',
      loops: 'for, while, recursion',
      conditionals: 'if, unless, case, cond',
      objects: 'defmodule MyModule',
      arrays: 'list = [1, 2, 3]',
      async: 'spawn, GenServer',
      classes: 'defmodule Name'
    },
    commonPatterns: [
      'Pattern matching: = operator',
      'Pipe operator: |>',
      'Processes: lightweight concurrency',
      'OTP: GenServer, Supervisor',
      'Atoms: :atom',
      'Function clauses: multiple definitions'
    ]
  },
  {
    name: 'Julia',
    icon: '🔬',
    description: 'High-performance scientific computing',
    color: 'text-purple-600',
    syntax: {
      variables: 'name = "value"',
      functions: 'function function_name() end',
      loops: 'for, while',
      conditionals: 'if, elseif, else',
      objects: 'struct MyStruct end',
      arrays: 'arr = [1, 2, 3]',
      async: 'Threads, Distributed',
      classes: 'struct Name end'
    },
    commonPatterns: [
      'Multiple dispatch: different methods',
      'Broadcasting: . operator',
      'Type annotations: :: Type',
      'Macros: @macro_name',
      'Packages: using PackageName',
      'Performance: JIT compilation'
    ]
  }
];

// Generate 20 prompts for each language dynamically
const generatePromptsForLanguage = (language: string) => {
  console.log(`Generating prompts for: ${language}`);
  const basePrompts = [
    {
      title: `Create a ${language} Function`,
      prompt: `Create a ${language} function that {description}. Include proper error handling, documentation, and best practices.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Class`,
      prompt: `Create a ${language} class that {description}. Include proper encapsulation, methods, and inheritance.`,
      category: 'General'
    },
    {
      title: `Create a ${language} API Endpoint`,
      prompt: `Create a ${language} API endpoint that {description}. Include proper routing, validation, and response handling.`,
      category: 'Backend'
    },
    {
      title: `Create a ${language} Data Structure`,
      prompt: `Create a ${language} data structure that {description}. Include proper operations and performance considerations.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Algorithm`,
      prompt: `Create a ${language} algorithm that {description}. Include proper complexity analysis and optimization.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Utility Function`,
      prompt: `Create a ${language} utility function that {description}. Include proper input validation and error handling.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Configuration`,
      prompt: `Create a ${language} configuration that {description}. Include proper settings management and validation.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Service`,
      prompt: `Create a ${language} service that {description}. Include proper dependency injection and business logic.`,
      category: 'Backend'
    },
    {
      title: `Create a ${language} Model`,
      prompt: `Create a ${language} model that {description}. Include proper validation, relationships, and serialization.`,
      category: 'Backend'
    },
    {
      title: `Create a ${language} Controller`,
      prompt: `Create a ${language} controller that {description}. Include proper request handling and response formatting.`,
      category: 'Backend'
    },
    {
      title: `Create a ${language} Middleware`,
      prompt: `Create a ${language} middleware that {description}. Include proper request/response processing and error handling.`,
      category: 'Backend'
    },
    {
      title: `Create a ${language} Validator`,
      prompt: `Create a ${language} validator that {description}. Include proper input validation and error reporting.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Parser`,
      prompt: `Create a ${language} parser that {description}. Include proper tokenization and syntax analysis.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Generator`,
      prompt: `Create a ${language} generator that {description}. Include proper code generation and template processing.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Transformer`,
      prompt: `Create a ${language} transformer that {description}. Include proper data transformation and mapping.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Handler`,
      prompt: `Create a ${language} handler that {description}. Include proper event processing and state management.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Processor`,
      prompt: `Create a ${language} processor that {description}. Include proper data processing and optimization.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Manager`,
      prompt: `Create a ${language} manager that {description}. Include proper resource management and lifecycle handling.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Factory`,
      prompt: `Create a ${language} factory that {description}. Include proper object creation and type safety.`,
      category: 'General'
    },
    {
      title: `Create a ${language} Builder`,
      prompt: `Create a ${language} builder that {description}. Include proper method chaining and validation.`,
      category: 'General'
    }
  ];

  console.log(`Generated ${basePrompts.length} prompts for ${language}`);
  return basePrompts;
};

const predefinedPrompts = {
  'JavaScript': [
    {
      title: 'Create a React Component',
      prompt: 'Create a React functional component in JavaScript that {description}. Include proper TypeScript types, hooks, and follow React best practices.',
      category: 'Frontend'
    },
    {
      title: 'Node.js API Endpoint',
      prompt: 'Create a Node.js Express API endpoint in JavaScript that {description}. Include error handling, validation, and proper HTTP status codes.',
      category: 'Backend'
    },
    {
      title: 'Async Function with Error Handling',
      prompt: 'Create an async JavaScript function that {description}. Include proper error handling with try-catch blocks and return appropriate responses.',
      category: 'General'
    },
    {
      title: 'Vue.js Component',
      prompt: 'Create a Vue.js component in JavaScript that {description}. Include proper props, emits, and composition API usage.',
      category: 'Frontend'
    },
    {
      title: 'Express Middleware',
      prompt: 'Create an Express.js middleware function in JavaScript that {description}. Include proper error handling and next() usage.',
      category: 'Backend'
    },
    {
      title: 'ES6 Class with Methods',
      prompt: 'Create an ES6 class in JavaScript that {description}. Include constructor, methods, and proper encapsulation.',
      category: 'General'
    },
    {
      title: 'Promise-based Function',
      prompt: 'Create a Promise-based function in JavaScript that {description}. Include proper resolve/reject handling and chaining.',
      category: 'General'
    },
    {
      title: 'Array Processing Function',
      prompt: 'Create a JavaScript function that processes arrays and {description}. Use modern array methods like map, filter, reduce.',
      category: 'General'
    },
    {
      title: 'Object Manipulation',
      prompt: 'Create a JavaScript function that manipulates objects and {description}. Include destructuring, spread operator, and Object methods.',
      category: 'General'
    },
    {
      title: 'Event Handler Function',
      prompt: 'Create a JavaScript event handler function that {description}. Include proper event object usage and DOM manipulation.',
      category: 'Frontend'
    },
    {
      title: 'Local Storage Utility',
      prompt: 'Create a JavaScript utility for localStorage that {description}. Include get, set, remove methods with error handling.',
      category: 'Frontend'
    },
    {
      title: 'Fetch API Wrapper',
      prompt: 'Create a JavaScript wrapper for the Fetch API that {description}. Include proper error handling and response processing.',
      category: 'General'
    },
    {
      title: 'Debounce Function',
      prompt: 'Create a debounce function in JavaScript that {description}. Include proper timer management and cleanup.',
      category: 'General'
    },
    {
      title: 'Form Validation',
      prompt: 'Create a JavaScript form validation function that {description}. Include field validation, error messages, and submission handling.',
      category: 'Frontend'
    },
    {
      title: 'Date/Time Utility',
      prompt: 'Create a JavaScript utility for date/time operations that {description}. Include formatting, parsing, and timezone handling.',
      category: 'General'
    },
    {
      title: 'String Processing',
      prompt: 'Create a JavaScript function for string processing that {description}. Include regex, manipulation, and formatting.',
      category: 'General'
    },
    {
      title: 'Number Calculations',
      prompt: 'Create a JavaScript function for number calculations that {description}. Include proper rounding, precision, and validation.',
      category: 'General'
    },
    {
      title: 'JSON Processing',
      prompt: 'Create a JavaScript function for JSON processing that {description}. Include parsing, stringifying, and validation.',
      category: 'General'
    },
    {
      title: 'URL Manipulation',
      prompt: 'Create a JavaScript function for URL manipulation that {description}. Include parsing, building, and parameter handling.',
      category: 'General'
    },
    {
      title: 'Cookie Management',
      prompt: 'Create a JavaScript utility for cookie management that {description}. Include get, set, delete operations with proper encoding.',
      category: 'Frontend'
    }
  ],
  'Python': [
    {
      title: 'Data Analysis Function',
      prompt: 'Create a Python function using pandas and numpy that {description}. Include data validation, error handling, and return processed results.',
      category: 'Data Science'
    },
    {
      title: 'FastAPI Endpoint',
      prompt: 'Create a FastAPI endpoint in Python that {description}. Include request/response models, validation, and proper documentation.',
      category: 'Backend'
    },
    {
      title: 'Machine Learning Pipeline',
      prompt: 'Create a Python machine learning pipeline using scikit-learn that {description}. Include data preprocessing, model training, and evaluation.',
      category: 'AI/ML'
    },
    {
      title: 'Django Model',
      prompt: 'Create a Django model in Python that {description}. Include proper fields, relationships, and meta options.',
      category: 'Backend'
    },
    {
      title: 'Flask Route',
      prompt: 'Create a Flask route in Python that {description}. Include proper request handling, validation, and response formatting.',
      category: 'Backend'
    },
    {
      title: 'Data Processing Function',
      prompt: 'Create a Python function for data processing that {description}. Include file I/O, data cleaning, and transformation.',
      category: 'Data Science'
    },
    {
      title: 'Class with Properties',
      prompt: 'Create a Python class that {description}. Include proper __init__, methods, and property decorators.',
      category: 'General'
    },
    {
      title: 'Context Manager',
      prompt: 'Create a Python context manager that {description}. Include proper __enter__ and __exit__ methods.',
      category: 'General'
    },
    {
      title: 'Decorator Function',
      prompt: 'Create a Python decorator that {description}. Include proper function wrapping and parameter handling.',
      category: 'General'
    },
    {
      title: 'Generator Function',
      prompt: 'Create a Python generator function that {description}. Include proper yield statements and iteration handling.',
      category: 'General'
    },
    {
      title: 'Exception Handling',
      prompt: 'Create a Python function with comprehensive exception handling that {description}. Include try/except/finally blocks.',
      category: 'General'
    },
    {
      title: 'File Processing',
      prompt: 'Create a Python function for file processing that {description}. Include reading, writing, and error handling.',
      category: 'General'
    },
    {
      title: 'Database Connection',
      prompt: 'Create a Python function for database operations that {description}. Include connection management and query execution.',
      category: 'Backend'
    },
    {
      title: 'API Client',
      prompt: 'Create a Python API client that {description}. Include HTTP requests, authentication, and response handling.',
      category: 'General'
    },
    {
      title: 'Configuration Management',
      prompt: 'Create a Python configuration management system that {description}. Include environment variables and settings.',
      category: 'General'
    },
    {
      title: 'Logging Setup',
      prompt: 'Create a Python logging configuration that {description}. Include different log levels and output formats.',
      category: 'General'
    },
    {
      title: 'Testing Function',
      prompt: 'Create a Python test function using pytest that {description}. Include proper assertions and test cases.',
      category: 'Testing'
    },
    {
      title: 'Async Function',
      prompt: 'Create an async Python function that {description}. Include proper async/await usage and error handling.',
      category: 'General'
    },
    {
      title: 'Data Validation',
      prompt: 'Create a Python data validation function that {description}. Include schema validation and error reporting.',
      category: 'General'
    },
    {
      title: 'Performance Optimization',
      prompt: 'Create a Python function optimized for performance that {description}. Include profiling and optimization techniques.',
      category: 'General'
    }
  ],
  'TypeScript': [
    {
      title: 'Type-Safe API Client',
      prompt: 'Create a TypeScript API client that {description}. Include proper type definitions, error handling, and generic types.',
      category: 'Frontend'
    },
    {
      title: 'Express Server with Types',
      prompt: 'Create a TypeScript Express server that {description}. Include proper interfaces, middleware, and type safety.',
      category: 'Backend'
    },
    {
      title: 'React Component with Types',
      prompt: 'Create a TypeScript React component that {description}. Include proper props interface, state types, and event handlers.',
      category: 'Frontend'
    },
    {
      title: 'Interface Definition',
      prompt: 'Create a TypeScript interface that {description}. Include proper property types, optional fields, and method signatures.',
      category: 'General'
    },
    {
      title: 'Generic Function',
      prompt: 'Create a TypeScript generic function that {description}. Include proper type constraints and return type inference.',
      category: 'General'
    },
    {
      title: 'Type Guard Function',
      prompt: 'Create a TypeScript type guard function that {description}. Include proper type narrowing and runtime checks.',
      category: 'General'
    },
    {
      title: 'Class with Generics',
      prompt: 'Create a TypeScript class with generics that {description}. Include proper type parameters and constraints.',
      category: 'General'
    },
    {
      title: 'Union Type Handler',
      prompt: 'Create a TypeScript function that handles union types and {description}. Include proper type discrimination.',
      category: 'General'
    },
    {
      title: 'Utility Types',
      prompt: 'Create TypeScript utility types that {description}. Include Pick, Omit, Partial, and custom mapped types.',
      category: 'General'
    },
    {
      title: 'Async Function with Types',
      prompt: 'Create an async TypeScript function that {description}. Include proper Promise types and error handling.',
      category: 'General'
    },
    {
      title: 'Enum Definition',
      prompt: 'Create a TypeScript enum that {description}. Include proper values and type safety.',
      category: 'General'
    },
    {
      title: 'Module Declaration',
      prompt: 'Create a TypeScript module declaration that {description}. Include proper ambient declarations.',
      category: 'General'
    },
    {
      title: 'Decorator Function',
      prompt: 'Create a TypeScript decorator that {description}. Include proper parameter and return type annotations.',
      category: 'General'
    },
    {
      title: 'Namespace Definition',
      prompt: 'Create a TypeScript namespace that {description}. Include proper organization and type exports.',
      category: 'General'
    },
    {
      title: 'Conditional Types',
      prompt: 'Create TypeScript conditional types that {description}. Include proper type inference and branching.',
      category: 'General'
    },
    {
      title: 'Mapped Types',
      prompt: 'Create TypeScript mapped types that {description}. Include proper key transformation and value mapping.',
      category: 'General'
    },
    {
      title: 'Template Literal Types',
      prompt: 'Create TypeScript template literal types that {description}. Include proper string manipulation and inference.',
      category: 'General'
    },
    {
      title: 'Discriminated Union',
      prompt: 'Create a TypeScript discriminated union that {description}. Include proper discriminant properties and type narrowing.',
      category: 'General'
    },
    {
      title: 'Function Overloads',
      prompt: 'Create TypeScript function overloads that {description}. Include proper signature variations and return types.',
      category: 'General'
    },
    {
      title: 'Type Assertion Helper',
      prompt: 'Create a TypeScript type assertion helper that {description}. Include proper type casting and validation.',
      category: 'General'
    }
  ],
  'Java': [
    {
      title: 'Spring Boot REST Controller',
      prompt: 'Create a Spring Boot REST controller in Java that {description}. Include proper annotations, exception handling, and DTOs.',
      category: 'Backend'
    },
    {
      title: 'Service Layer with Dependency Injection',
      prompt: 'Create a Java service class that {description}. Include dependency injection, proper error handling, and business logic.',
      category: 'Backend'
    },
    {
      title: 'JPA Entity Class',
      prompt: 'Create a JPA entity class in Java that {description}. Include proper annotations, relationships, and validation.',
      category: 'Backend'
    },
    {
      title: 'Repository Interface',
      prompt: 'Create a Spring Data JPA repository interface that {description}. Include custom query methods and specifications.',
      category: 'Backend'
    },
    {
      title: 'Configuration Class',
      prompt: 'Create a Spring configuration class that {description}. Include proper bean definitions and configuration properties.',
      category: 'Backend'
    },
    {
      title: 'Exception Handler',
      prompt: 'Create a global exception handler in Java that {description}. Include proper error responses and logging.',
      category: 'Backend'
    },
    {
      title: 'DTO Class',
      prompt: 'Create a Data Transfer Object (DTO) class in Java that {description}. Include proper validation and serialization.',
      category: 'Backend'
    },
    {
      title: 'Utility Class',
      prompt: 'Create a utility class in Java that {description}. Include static methods and proper documentation.',
      category: 'General'
    },
    {
      title: 'Builder Pattern',
      prompt: 'Create a Java class using the Builder pattern that {description}. Include proper method chaining and validation.',
      category: 'General'
    },
    {
      title: 'Singleton Pattern',
      prompt: 'Create a Java singleton class that {description}. Include thread-safe implementation and proper initialization.',
      category: 'General'
    },
    {
      title: 'Observer Pattern',
      prompt: 'Create a Java implementation of the Observer pattern that {description}. Include proper interfaces and notifications.',
      category: 'General'
    },
    {
      title: 'Factory Pattern',
      prompt: 'Create a Java factory class that {description}. Include proper object creation and type safety.',
      category: 'General'
    },
    {
      title: 'Strategy Pattern',
      prompt: 'Create a Java implementation of the Strategy pattern that {description}. Include proper interfaces and algorithms.',
      category: 'General'
    },
    {
      title: 'Command Pattern',
      prompt: 'Create a Java implementation of the Command pattern that {description}. Include proper encapsulation and execution.',
      category: 'General'
    },
    {
      title: 'Decorator Pattern',
      prompt: 'Create a Java implementation of the Decorator pattern that {description}. Include proper composition and inheritance.',
      category: 'General'
    },
    {
      title: 'Adapter Pattern',
      prompt: 'Create a Java implementation of the Adapter pattern that {description}. Include proper interface adaptation.',
      category: 'General'
    },
    {
      title: 'Facade Pattern',
      prompt: 'Create a Java implementation of the Facade pattern that {description}. Include proper subsystem simplification.',
      category: 'General'
    },
    {
      title: 'Proxy Pattern',
      prompt: 'Create a Java implementation of the Proxy pattern that {description}. Include proper access control and lazy loading.',
      category: 'General'
    },
    {
      title: 'Template Method Pattern',
      prompt: 'Create a Java implementation of the Template Method pattern that {description}. Include proper algorithm structure.',
      category: 'General'
    },
    {
      title: 'State Pattern',
      prompt: 'Create a Java implementation of the State pattern that {description}. Include proper state transitions and behavior.',
      category: 'General'
    }
  ],
  'C#': [
    {
      title: 'ASP.NET Core Web API',
      prompt: 'Create an ASP.NET Core Web API controller in C# that {description}. Include proper routing, model validation, and error handling.',
      category: 'Backend'
    },
    {
      title: 'Entity Framework Service',
      prompt: 'Create a C# service using Entity Framework that {description}. Include proper data access patterns and error handling.',
      category: 'Backend'
    }
  ],
  'Go': [
    {
      title: 'HTTP Handler Function',
      prompt: 'Create a Go HTTP handler function that {description}. Include proper error handling, JSON marshaling, and HTTP status codes.',
      category: 'Backend'
    },
    {
      title: 'Goroutine with Channel',
      prompt: 'Create a Go function using goroutines and channels that {description}. Include proper concurrency patterns and error handling.',
      category: 'Concurrency'
    }
  ],
  'Rust': [
    {
      title: 'Safe Memory Management',
      prompt: 'Create a Rust function that {description}. Include proper ownership, borrowing, and error handling with Result types.',
      category: 'Systems'
    },
    {
      title: 'Async Function with Tokio',
      prompt: 'Create an async Rust function using Tokio that {description}. Include proper async/await patterns and error handling.',
      category: 'Async'
    }
  ],
  'PHP': [
    {
      title: 'Laravel Controller',
      prompt: 'Create a Laravel controller in PHP that {description}. Include proper routing, validation, and Eloquent models.',
      category: 'Backend'
    },
    {
      title: 'API Service Class',
      prompt: 'Create a PHP service class that {description}. Include proper error handling, logging, and return appropriate responses.',
      category: 'Backend'
    }
  ],
  'Ruby': [
    {
      title: 'Rails Controller Action',
      prompt: 'Create a Rails controller action in Ruby that {description}. Include proper routing, strong parameters, and error handling.',
      category: 'Backend'
    },
    {
      title: 'Service Object',
      prompt: 'Create a Ruby service object that {description}. Include proper error handling, logging, and return appropriate responses.',
      category: 'Backend'
    }
  ],
  'Swift': [
    {
      title: 'iOS View Controller',
      prompt: 'Create a Swift UIViewController that {description}. Include proper lifecycle methods, data binding, and error handling.',
      category: 'Mobile'
    },
    {
      title: 'Async Function with Combine',
      prompt: 'Create a Swift async function using Combine that {description}. Include proper async patterns and error handling.',
      category: 'Async'
    }
  ],
  'Kotlin': [
    {
      title: 'Android Activity',
      prompt: 'Create a Kotlin Android Activity that {description}. Include proper lifecycle methods, data binding, and error handling.',
      category: 'Mobile'
    },
    {
      title: 'Coroutine Function',
      prompt: 'Create a Kotlin suspend function that {description}. Include proper coroutine patterns, error handling, and async operations.',
      category: 'Async'
    }
  ]
};

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
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [componentName, setComponentName] = useState('');
  const [componentDescription, setComponentDescription] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<{title: string, prompt: string, category: string} | null>(null);
  const [modalDescription, setModalDescription] = useState('');

  const copyToClipboard = async (text: string, promptTitle: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(promptTitle);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateCustomPrompt = () => {
    if (!componentName.trim() || !componentDescription.trim()) {
      return;
    }
    
    const basePrompt = `Create a ${selectedLanguage.name} ${componentName} that ${componentDescription}. Include proper error handling, documentation, and best practices.`;
    setCustomPrompt(basePrompt);
  };

  const copyCustomPrompt = async () => {
    if (customPrompt) {
      await copyToClipboard(customPrompt, 'Custom Prompt');
    }
  };

  const openModal = (prompt: {title: string, prompt: string, category: string}) => {
    setSelectedPrompt(prompt);
    setModalDescription('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrompt(null);
    setModalDescription('');
  };

  const generateModalPrompt = () => {
    if (!selectedPrompt || !modalDescription.trim()) return '';
    return selectedPrompt.prompt.replace('{description}', modalDescription);
  };

  const copyModalPrompt = async () => {
    const prompt = generateModalPrompt();
    if (prompt) {
      await copyToClipboard(prompt, selectedPrompt?.title || 'Generated Prompt');
    }
  };

  return (
    <>
      <Head>
        <title>Developer AI Cheat Sheet 2025 | 11 Programming Languages & AI Tools Reference</title>
        <meta
          name="description"
          content="Best free developer AI cheat sheet for 2025. Complete reference for 11 programming languages (JavaScript, Python, TypeScript, Java, C#, Go, Rust, PHP, Ruby, Swift, Kotlin) plus AI tools, frameworks, and syntax examples. Trusted by 100K+ developers."
        />
        <meta
          name="keywords"
          content="developer cheat sheet, programming languages cheat sheet, AI development tools, JavaScript cheat sheet, Python cheat sheet, TypeScript cheat sheet, Java cheat sheet, C# cheat sheet, Go cheat sheet, Rust cheat sheet, PHP cheat sheet, Ruby cheat sheet, Swift cheat sheet, Kotlin cheat sheet, AI programming tools, machine learning tools, developer resources, coding reference, programming syntax, AI frameworks, developer tools 2025, programming reference, code examples, syntax guide"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/ai-cheat-sheet" />
        <meta property="og:title" content="Developer AI Cheat Sheet - Programming Languages & AI Tools" />
        <meta property="og:description" content="Complete reference for 11 main programming languages with syntax, patterns, and AI development tools for modern developers." />
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

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex">
          {/* Left Sidebar - Language Selection */}
          <div className="w-80 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                AI Cheat Sheet 2025
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                20 Programming Languages & AI Tools
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Choose Language
              </h3>
              {programmingLanguages.map((lang, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedLanguage.name === lang.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${lang.color || 'text-gray-500'}`}>
                      {lang.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {lang.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {lang.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              {/* Top Ad Banner */}
              <div className="mb-8">
                <AdBanner position="top" />
              </div>

          {/* Predefined Prompts Section - MOVED TO TOP */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              🚀 Ready-to-Use AI Prompts for {selectedLanguage.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Click any prompt below to copy it instantly. Customize the {`{description}`} placeholder with your specific requirements.
            </p>
            <div className="text-center mb-4">
              <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {(() => {
                  const hasPredefined = predefinedPrompts[selectedLanguage.name as keyof typeof predefinedPrompts];
                  const languagePrompts = (hasPredefined && hasPredefined.length >= 10) ? hasPredefined : generatePromptsForLanguage(selectedLanguage.name);
                  return `${languagePrompts.length} prompts available`;
                })()}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(() => {
                const hasPredefined = predefinedPrompts[selectedLanguage.name as keyof typeof predefinedPrompts];
                console.log(`Has predefined prompts for ${selectedLanguage.name}:`, !!hasPredefined);
                // Use predefined prompts only if they have 10+ prompts, otherwise use dynamic generation
                const languagePrompts = (hasPredefined && hasPredefined.length >= 10) ? hasPredefined : generatePromptsForLanguage(selectedLanguage.name);
                console.log(`Language: ${selectedLanguage.name}, Prompts count: ${languagePrompts.length}`);
                return languagePrompts.length > 0 ? (
                  languagePrompts.map((prompt, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer" onClick={() => openModal(prompt)}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {prompt.title}
                        </h4>
                        <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
                          {prompt.category}
                        </span>
                      </div>
                      <div className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {prompt.prompt}
                    </p>
                    <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Click to customize and copy →
                    </div>
                  </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No predefined prompts available for {selectedLanguage.name} yet.
                    </p>
                  </div>
                );
              })()}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 How to Use These Prompts
              </h4>
              <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>1. Click &quot;Copy&quot; on any prompt above</li>
                <li>2. Replace {`{description}`} with your specific requirements</li>
                <li>3. Paste into ChatGPT, Claude, or your preferred AI tool</li>
                <li>4. Get instant, language-specific code generation!</li>
              </ol>
            </div>
          </div>

          {/* Custom Prompt Generator Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              🛠️ Custom Prompt Generator for {selectedLanguage.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Create personalized AI prompts by specifying your component name and description. Perfect for technical users who need specific functionality.
            </p>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="componentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Component/Function Name
                  </label>
                  <input
                    id="componentName"
                    type="text"
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    placeholder="e.g., UserService, DataProcessor, APIHandler"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label htmlFor="componentDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description/Functionality
                  </label>
                  <input
                    id="componentDescription"
                    type="text"
                    value={componentDescription}
                    onChange={(e) => setComponentDescription(e.target.value)}
                    placeholder="e.g., handles user authentication, processes CSV files, manages database connections"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={generateCustomPrompt}
                  disabled={!componentName.trim() || !componentDescription.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Custom Prompt
                </button>
                
                {customPrompt && (
                  <button
                    onClick={copyCustomPrompt}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copiedPrompt === 'Custom Prompt' ? '✓ Copied!' : 'Copy Prompt'}
                  </button>
                )}
              </div>
              
              {customPrompt && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generated Custom Prompt
                  </h4>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <code className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {customPrompt}
                    </code>
                  </div>
                </div>
              )}
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  💡 Pro Tips for Technical Users
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• <strong>Be specific:</strong> Use descriptive names like &quot;UserAuthenticationService&quot; instead of &quot;Service&quot;</li>
                  <li>• <strong>Include context:</strong> Mention frameworks, libraries, or specific requirements in your description</li>
                  <li>• <strong>Add constraints:</strong> Specify performance requirements, security needs, or integration points</li>
                  <li>• <strong>Example:</strong> &quot;UserService that handles JWT authentication with Redis caching and rate limiting&quot;</li>
                </ul>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                  🚀 Quick Examples for {selectedLanguage.name}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-green-800 dark:text-green-200">Component Name:</strong>
                    <div className="text-green-700 dark:text-green-300 mt-1 space-y-1">
                      <div>• DataValidator</div>
                      <div>• EmailService</div>
                      <div>• CacheManager</div>
                      <div>• FileProcessor</div>
                    </div>
                  </div>
                  <div>
                    <strong className="text-green-800 dark:text-green-200">Description:</strong>
                    <div className="text-green-700 dark:text-green-300 mt-1 space-y-1">
                      <div>• validates user input with custom rules</div>
                      <div>• sends transactional emails via SMTP</div>
                      <div>• manages Redis cache with TTL</div>
                      <div>• processes CSV files with error handling</div>
                    </div>
                  </div>
                </div>
              </div>
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

          {/* How to Use Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              How to Use the AI Cheat Sheet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  🚀 Getting Started
                </h3>
                <ol className="text-gray-700 dark:text-gray-300 space-y-3">
                  <li>
                    <strong>1. Select a Language:</strong> Click on any of the 10 programming languages to see syntax and patterns
                  </li>
                  <li>
                    <strong>2. Explore Syntax:</strong> Use the &quot;Syntax Reference&quot; tab to see basic language constructs
                  </li>
                  <li>
                    <strong>3. Learn Patterns:</strong> Switch to &quot;Common Patterns&quot; tab for advanced techniques
                  </li>
                  <li>
                    <strong>4. Reference AI Tools:</strong> Check the AI development tools section for modern frameworks
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  💡 Pro Tips
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                  <li>
                    <strong>Quick Reference:</strong> Bookmark this page for instant syntax lookup during coding
                  </li>
                  <li>
                    <strong>Language Comparison:</strong> Switch between languages to compare syntax differences
                  </li>
                  <li>
                    <strong>AI Integration:</strong> Use the AI tools section to enhance your development workflow
                  </li>
                  <li>
                    <strong>Best Practices:</strong> Follow the patterns shown for clean, maintainable code
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🎯 Use Cases
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-medium mb-2">Learning New Languages</h4>
                  <p>Perfect for developers switching between languages or learning new frameworks</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Code Reviews</h4>
                  <p>Quick reference during code reviews to ensure best practices and proper syntax</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Interview Prep</h4>
                  <p>Brush up on syntax and patterns before technical interviews and coding assessments</p>
                </div>
              </div>
            </div>
          </div>

              <DeveloperToolsNav currentPath="/ai-cheat-sheet" />
            </div>
          </div>
        </div>

        {/* Modal for Customizing Prompts */}
        {showModal && selectedPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Customize Prompt
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {selectedPrompt.title}
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedPrompt.prompt}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="modalDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter your specific description:
                  </label>
                  <textarea
                    id="modalDescription"
                    value={modalDescription}
                    onChange={(e) => setModalDescription(e.target.value)}
                    placeholder="e.g., handles user authentication with JWT tokens and Redis caching"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    rows={3}
                  />
                </div>

                {modalDescription.trim() && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Generated Prompt:
                    </h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <code className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {generateModalPrompt()}
                      </code>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={copyModalPrompt}
                    disabled={!modalDescription.trim()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copiedPrompt === selectedPrompt.title ? '✓ Copied!' : 'Copy Prompt'}
                  </button>
                  
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
