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
  { 
    flag: 'g', 
    name: 'Global', 
    description: 'Find all matches, not just the first',
    explanation: 'Without the global flag, regex stops after finding the first match. With "g", it continues searching and returns all matches in the string. Essential for finding multiple occurrences.',
    example: 'Without g: "hello hello".match(/hello/) returns ["hello"]\nWith g: "hello hello".match(/hello/g) returns ["hello", "hello"]'
  },
  { 
    flag: 'i', 
    name: 'Case Insensitive', 
    description: 'Match regardless of case',
    explanation: 'The case-insensitive flag makes your pattern match both uppercase and lowercase letters. Without it, "Hello" won\'t match "hello". Perfect for user input validation.',
    example: '/hello/i matches "Hello", "HELLO", "hElLo"'
  },
  { 
    flag: 'm', 
    name: 'Multiline', 
    description: '^ and $ match line breaks',
    explanation: 'In multiline mode, ^ matches the start of each line (after newlines) and $ matches the end of each line (before newlines). Without it, ^ and $ only match the very beginning and end of the entire string.',
    example: '/^hello/m matches "hello" at the start of any line'
  },
  { 
    flag: 's', 
    name: 'Dot All', 
    description: '\'.\' matches newline characters',
    explanation: 'Normally, the dot (.) doesn\'t match newline characters. The "s" flag changes this behavior, making dots match everything including newlines. Useful for matching across multiple lines.',
    example: '/hello.world/s matches "hello\nworld" and "hello world"'
  },
  { 
    flag: 'u', 
    name: 'Unicode', 
    description: 'Handle Unicode characters properly',
    explanation: 'The Unicode flag enables proper handling of Unicode characters, including emojis and international characters. Without it, some Unicode characters might not match correctly.',
    example: '/\\p{L}/u matches any Unicode letter, including é, ñ, 中'
  },
  { 
    flag: 'y', 
    name: 'Sticky', 
    description: 'Match only at the last index',
    explanation: 'The sticky flag makes regex match only at the exact position where the last match ended. It\'s useful for parsing text sequentially and ensuring matches are consecutive.',
    example: 'Used with exec() to find matches one by one from a specific position'
  }
];

const regexMetacharacters = [
  { 
    char: '.', 
    description: 'Matches any character except newline',
    explanation: 'The dot is a wildcard that matches any single character. Use it when you need to match any character in a specific position. For example, &quot;c.t&quot; matches &quot;cat&quot;, &quot;cut&quot;, &quot;c1t&quot;, etc.',
    example: 'c.t matches &quot;cat&quot;, &quot;cut&quot;, &quot;c1t&quot;'
  },
  { 
    char: '^', 
    description: 'Matches start of string',
    explanation: 'The caret ensures your pattern matches only at the beginning of the string. Without it, your pattern could match anywhere in the text. Essential for validation patterns.',
    example: '^Hello matches &quot;Hello world&quot; but not &quot;Say Hello&quot;'
  },
  { 
    char: '$', 
    description: 'Matches end of string',
    explanation: 'The dollar sign ensures your pattern matches only at the end of the string. Combined with ^, it creates exact matches. Perfect for validating complete strings.',
    example: 'world$ matches &quot;Hello world&quot; but not &quot;world peace&quot;'
  },
  { 
    char: '*', 
    description: 'Matches 0 or more of the preceding element',
    explanation: 'The asterisk means &quot;zero or more&quot; of whatever comes before it. It&apos;s greedy by default, matching as much as possible. Use when the preceding character might not exist.',
    example: 'ab*c matches &quot;ac&quot;, &quot;abc&quot;, &quot;abbc&quot;, &quot;abbbc&quot;'
  },
  { 
    char: '+', 
    description: 'Matches 1 or more of the preceding element',
    explanation: 'The plus means &quot;one or more&quot; of whatever comes before it. Unlike *, it requires at least one occurrence. Use when you need the preceding character to exist.',
    example: 'ab+c matches &quot;abc&quot;, &quot;abbc&quot; but not &quot;ac&quot;'
  },
  { 
    char: '?', 
    description: 'Matches 0 or 1 of the preceding element',
    explanation: 'The question mark makes the preceding character optional. It matches either zero or one occurrence. Perfect for optional characters like hyphens in phone numbers.',
    example: 'colou?r matches both &quot;color&quot; and &quot;colour&quot;'
  },
  { 
    char: '|', 
    description: 'OR operator - matches either pattern',
    explanation: 'The pipe creates an OR condition, matching either the pattern before or after it. Use parentheses to group complex OR conditions. Great for multiple valid formats.',
    example: '(cat|dog) matches &quot;cat&quot; or &quot;dog&quot;'
  },
  { 
    char: '[]', 
    description: 'Character class - matches any character inside',
    explanation: 'Square brackets create a character class that matches any single character inside them. Use ranges like [a-z] for efficiency. Perfect for defining allowed characters.',
    example: '[aeiou] matches any vowel: &quot;a&quot;, &quot;e&quot;, &quot;i&quot;, &quot;o&quot;, &quot;u&quot;'
  },
  { 
    char: '[^]', 
    description: 'Negated character class',
    explanation: 'The caret inside brackets negates the character class, matching any character NOT inside. Use it to exclude specific characters from your pattern.',
    example: '[^0-9] matches any non-digit character'
  },
  { 
    char: '()', 
    description: 'Grouping - creates a capture group',
    explanation: 'Parentheses group parts of your pattern and create capture groups that you can reference later. Essential for extracting specific parts of matches.',
    example: '(\\d{3})-(\\d{3}) captures area code and number separately'
  },
  { 
    char: '\\d', 
    description: 'Matches any digit (0-9)',
    explanation: 'The \\d shorthand matches any single digit from 0 to 9. Much more readable than [0-9]. Use it when you need to match numbers in your pattern.',
    example: '\\d{3} matches "123", "456", "789"'
  },
  { 
    char: '\\w', 
    description: 'Matches word characters (a-z, A-Z, 0-9, _)',
    explanation: 'The \\w shorthand matches word characters including letters, digits, and underscores. Perfect for usernames, identifiers, and word boundaries.',
    example: '\\w+ matches "hello", "user123", "my_name"'
  },
  { 
    char: '\\s', 
    description: 'Matches whitespace characters',
    explanation: 'The \\s shorthand matches any whitespace character including spaces, tabs, and newlines. Use it to match or skip whitespace in your patterns.',
    example: 'hello\\s+world matches &quot;hello world&quot;, &quot;hello  world&quot;'
  },
  { 
    char: '\\b', 
    description: 'Word boundary',
    explanation: 'The \\b matches word boundaries - positions between word characters and non-word characters. Use it to match whole words, not parts of words.',
    example: '\\bcat\\b matches &quot;cat&quot; but not &quot;category&quot; or &quot;scat&quot;'
  }
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
  const [activeTab, setActiveTab] = useState('validator');
  const [guidedPattern, setGuidedPattern] = useState('');
  const [guidedOptions, setGuidedOptions] = useState({
    type: '',
    length: '',
    characters: '',
    format: ''
  });
  const [smartInput, setSmartInput] = useState('');
  const [generatedRegex, setGeneratedRegex] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{
    type: string;
    patterns: Array<{name: string, regex: string, description: string}>;
    suggestions: string[];
    confidence: number;
  } | null>(null);

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

  const generateGuidedPattern = () => {
    let pattern = '';
    
    switch (guidedOptions.type) {
      case 'email':
        pattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
        break;
      case 'phone':
        pattern = '^\\+?1?[-.\\s]?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$';
        break;
      case 'url':
        pattern = '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$';
        break;
      case 'password':
        if (guidedOptions.length === 'strong') {
          pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
        } else {
          pattern = '^.{6,}$';
        }
        break;
      case 'username':
        if (guidedOptions.length === 'short') {
          pattern = '^[a-zA-Z0-9_]{3,10}$';
        } else {
          pattern = '^[a-zA-Z0-9_]{3,20}$';
        }
        break;
      case 'number':
        if (guidedOptions.format === 'decimal') {
          pattern = '^\\d+\\.\\d{1,2}$';
        } else if (guidedOptions.format === 'integer') {
          pattern = '^[1-9]\\d*$';
        } else {
          pattern = '^\\d+$';
        }
        break;
      case 'custom':
        if (guidedOptions.characters === 'letters') {
          pattern = '^[a-zA-Z]+$';
        } else if (guidedOptions.characters === 'numbers') {
          pattern = '^[0-9]+$';
        } else if (guidedOptions.characters === 'alphanumeric') {
          pattern = '^[a-zA-Z0-9]+$';
        } else if (guidedOptions.characters === 'no-spaces') {
          pattern = '^\\S+$';
        }
        break;
    }
    
    setGuidedPattern(pattern);
    setRegex(pattern);
  };

  const analyzeInput = (input: string) => {
    if (!input.trim()) return null;

    const analysis = {
      type: '',
      patterns: [],
      suggestions: [],
      confidence: 0
    };

    // Email analysis
    if (input.includes('@') && input.includes('.')) {
      analysis.type = 'email';
      analysis.patterns.push({
        name: 'Email Pattern',
        regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        description: 'Standard email validation'
      });
      analysis.confidence = 90;
    }

    // Phone number analysis
    else if (/[\d\s\-\(\)\+]/.test(input) && /\d{3,}/.test(input)) {
      analysis.type = 'phone';
      analysis.patterns.push({
        name: 'US Phone Pattern',
        regex: '^\\+?1?[-.\\s]?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$',
        description: 'US phone number with various formats'
      });
      analysis.patterns.push({
        name: 'International Phone',
        regex: '^\\+[1-9]\\d{1,14}$',
        description: 'International phone number'
      });
      analysis.confidence = 85;
    }

    // URL analysis
    else if (input.startsWith('http') || input.includes('www.') || input.includes('.com')) {
      analysis.type = 'url';
      analysis.patterns.push({
        name: 'URL Pattern',
        regex: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$',
        description: 'HTTP/HTTPS URL validation'
      });
      analysis.confidence = 80;
    }

    // Number analysis
    else if (/^\d+$/.test(input)) {
      analysis.type = 'number';
      analysis.patterns.push({
        name: 'Positive Integer',
        regex: '^[1-9]\\d*$',
        description: 'Positive integers only'
      });
      analysis.patterns.push({
        name: 'Any Number',
        regex: '^\\d+$',
        description: 'Any sequence of digits'
      });
      analysis.confidence = 95;
    }

    // Decimal number analysis
    else if (/^\d+\.\d+$/.test(input)) {
      analysis.type = 'decimal';
      analysis.patterns.push({
        name: 'Decimal Number',
        regex: '^\\d+\\.\\d{1,2}$',
        description: 'Decimal number with 1-2 decimal places'
      });
      analysis.patterns.push({
        name: 'Any Decimal',
        regex: '^\\d+\\.\\d+$',
        description: 'Any decimal number'
      });
      analysis.confidence = 90;
    }

    // Date analysis
    else if (/\d{4}-\d{2}-\d{2}/.test(input) || /\d{2}\/\d{2}\/\d{4}/.test(input)) {
      analysis.type = 'date';
      analysis.patterns.push({
        name: 'ISO Date (YYYY-MM-DD)',
        regex: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$',
        description: 'ISO date format validation'
      });
      analysis.patterns.push({
        name: 'US Date (MM/DD/YYYY)',
        regex: '^(0[1-9]|1[0-2])\\/(0[1-9]|[12][0-9]|3[01])\\/\\d{4}$',
        description: 'US date format validation'
      });
      analysis.confidence = 85;
    }

    // Username analysis
    else if (/^[a-zA-Z0-9_]+$/.test(input) && input.length >= 3 && input.length <= 20) {
      analysis.type = 'username';
      analysis.patterns.push({
        name: 'Username Pattern',
        regex: '^[a-zA-Z0-9_]{3,20}$',
        description: 'Username with alphanumeric and underscore'
      });
      analysis.confidence = 80;
    }

    // Password analysis
    else if (input.length >= 6) {
      analysis.type = 'password';
      if (/[A-Z]/.test(input) && /[a-z]/.test(input) && /\d/.test(input) && /[!@#$%^&*]/.test(input)) {
        analysis.patterns.push({
          name: 'Strong Password',
          regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
          description: 'Strong password with uppercase, lowercase, number, and special character'
        });
        analysis.confidence = 90;
      } else {
        analysis.patterns.push({
          name: 'Basic Password',
          regex: '^.{6,}$',
          description: 'Basic password with minimum length'
        });
        analysis.confidence = 70;
      }
    }

    // Mixed content analysis
    else {
      analysis.type = 'mixed';
      const hasLetters = /[a-zA-Z]/.test(input);
      const hasNumbers = /\d/.test(input);
      // const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input);
      const hasSpaces = /\s/.test(input);

      if (hasLetters && hasNumbers && !hasSpaces) {
        analysis.patterns.push({
          name: 'Alphanumeric (no spaces)',
          regex: '^[a-zA-Z0-9]+$',
          description: 'Letters and numbers only'
        });
      } else if (hasLetters && !hasNumbers && !hasSpaces) {
        analysis.patterns.push({
          name: 'Letters Only',
          regex: '^[a-zA-Z]+$',
          description: 'Letters only'
        });
      } else if (!hasLetters && hasNumbers && !hasSpaces) {
        analysis.patterns.push({
          name: 'Numbers Only',
          regex: '^\\d+$',
          description: 'Numbers only'
        });
      } else if (hasSpaces) {
        analysis.patterns.push({
          name: 'Text with Spaces',
          regex: '^.+$',
          description: 'Any text including spaces'
        });
      } else {
        analysis.patterns.push({
          name: 'Custom Pattern',
          regex: '^' + input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$',
          description: 'Exact match for your input'
        });
      }
      analysis.confidence = 60;
    }

    return analysis;
  };

  const generateSmartRegex = () => {
    const analysis = analyzeInput(smartInput);
    if (analysis) {
      setAnalysisResult(analysis);
      // Don't automatically set the regex - let user choose
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

          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('validator')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'validator'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🔧 Regex Validator
              </button>
              <button
                onClick={() => setActiveTab('builder')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'builder'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🛠️ Guided Builder
              </button>
              <button
                onClick={() => setActiveTab('smart')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'smart'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🤖 Smart Generator
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'guide'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                📚 Regex Guide
              </button>
            </div>
          </div>

          {/* Main Regex Tester */}
          {activeTab === 'validator' && (
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
          )}

          {/* Guided Regex Builder */}
          {activeTab === 'builder' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              🛠️ Guided Regex Builder
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
              Don't know regex? No problem! Use our guided builder to create patterns step by step.
            </p>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Builder Options */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      What do you want to validate?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'email', label: '📧 Email', desc: 'Email addresses' },
                        { value: 'phone', label: '📞 Phone', desc: 'Phone numbers' },
                        { value: 'url', label: '🌐 URL', desc: 'Web addresses' },
                        { value: 'password', label: '🔒 Password', desc: 'Password strength' },
                        { value: 'username', label: '👤 Username', desc: 'User names' },
                        { value: 'number', label: '🔢 Number', desc: 'Numbers' },
                        { value: 'custom', label: '⚙️ Custom', desc: 'Other text' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setGuidedOptions({...guidedOptions, type: option.value})}
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            guidedOptions.type === option.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                          }`}
                        >
                          <div className="font-medium text-sm text-gray-900 dark:text-white">
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {option.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Options based on type */}
                  {guidedOptions.type === 'password' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Password Strength
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'basic', label: 'Basic (6+ characters)', desc: 'Minimum length only' },
                          { value: 'strong', label: 'Strong (Complex)', desc: 'Uppercase, lowercase, numbers, symbols' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setGuidedOptions({...guidedOptions, length: option.value})}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                              guidedOptions.length === option.value
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                          >
                            <div className="font-medium text-sm text-gray-900 dark:text-white">
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {option.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {guidedOptions.type === 'username' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Username Length
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'short', label: 'Short (3-10 chars)', desc: 'For usernames' },
                          { value: 'long', label: 'Long (3-20 chars)', desc: 'For display names' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setGuidedOptions({...guidedOptions, length: option.value})}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                              guidedOptions.length === option.value
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                          >
                            <div className="font-medium text-sm text-gray-900 dark:text-white">
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {option.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {guidedOptions.type === 'number' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Number Format
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'any', label: 'Any Number', desc: '123, 456, 789' },
                          { value: 'integer', label: 'Positive Integer', desc: '1, 2, 3 (no decimals)' },
                          { value: 'decimal', label: 'Decimal Number', desc: '123.45, 67.89' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setGuidedOptions({...guidedOptions, format: option.value})}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                              guidedOptions.format === option.value
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                          >
                            <div className="font-medium text-sm text-gray-900 dark:text-white">
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {option.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {guidedOptions.type === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Allowed Characters
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'letters', label: 'Letters Only', desc: 'a-z, A-Z' },
                          { value: 'numbers', label: 'Numbers Only', desc: '0-9' },
                          { value: 'alphanumeric', label: 'Letters & Numbers', desc: 'a-z, A-Z, 0-9' },
                          { value: 'no-spaces', label: 'No Spaces', desc: 'Any character except spaces' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setGuidedOptions({...guidedOptions, characters: option.value})}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                              guidedOptions.characters === option.value
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                          >
                            <div className="font-medium text-sm text-gray-900 dark:text-white">
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {option.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={generateGuidedPattern}
                    disabled={!guidedOptions.type}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Generate Regex Pattern
                  </button>
                </div>

                {/* Generated Pattern */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      Generated Pattern
                    </h4>
                    {guidedPattern ? (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <code className="text-sm text-blue-600 dark:text-blue-400 break-all">
                          {guidedPattern}
                        </code>
                        <button
                          onClick={() => copyToClipboard(guidedPattern)}
                          className="mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                        >
                          Copy Pattern
                        </button>
                      </div>
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400">
                        Select options above to generate a pattern
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      Test Your Pattern
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Test String
                        </label>
                        <input
                          type="text"
                          value={testString}
                          onChange={(e) => setTestString(e.target.value)}
                          placeholder="Enter text to test..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      {guidedPattern && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Pattern Status: <span className={`font-medium ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                              {isValid ? 'Valid' : 'Invalid'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            Matches Found: <span className="font-medium text-blue-600">{matches.length}</span>
                          </div>
                          {matches.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {matches.map((match, index) => (
                                <div key={index} className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                  Match {index + 1}: "{match}"
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Smart Regex Generator */}
          {activeTab === 'smart' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              🤖 Smart Regex Generator
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
              Just enter your sample text and we'll analyze it to generate the perfect regex pattern for you!
            </p>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Enter your sample text:
                    </label>
                    <textarea
                      value={smartInput}
                      onChange={(e) => setSmartInput(e.target.value)}
                      placeholder="Enter sample text like: user@example.com, (555) 123-4567, https://example.com, 123.45, etc."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>

                  <button
                    onClick={generateSmartRegex}
                    disabled={!smartInput.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Analyze & Generate Regex
                  </button>

                  {analysisResult && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Analysis Results
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Detected Type:</span> 
                          <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                            {analysisResult.type}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Confidence:</span> 
                          <span className="ml-2 text-green-600 dark:text-green-400">
                            {analysisResult.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Generated Patterns */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      Generated Patterns
                    </h4>
                    {analysisResult && analysisResult.patterns.length > 0 ? (
                      <div className="space-y-3">
                        {analysisResult.patterns.map((pattern: {name: string, regex: string, description: string}, index: number) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                                {pattern.name}
                              </h5>
                              <button
                                onClick={() => {
                                  setGeneratedRegex(pattern.regex);
                                  setRegex(pattern.regex);
                                }}
                                className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                              >
                                Use This
                              </button>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {pattern.description}
                            </p>
                            <code className="text-xs text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded block break-all">
                              {pattern.regex}
                            </code>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400">
                        Enter sample text above to generate patterns
                      </div>
                    )}
                  </div>

                  {generatedRegex && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        Test Your Pattern
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Test String
                          </label>
                          <input
                            type="text"
                            value={testString}
                            onChange={(e) => setTestString(e.target.value)}
                            placeholder="Enter text to test against the generated pattern..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Pattern Status: <span className={`font-medium ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                              {isValid ? 'Valid' : 'Invalid'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Matches Found: <span className="font-medium text-blue-600">{matches.length}</span>
                          </div>
                          {matches.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {matches.map((match, index) => (
                                <div key={index} className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                  Match {index + 1}: "{match}"
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Examples Section */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  💡 Try These Examples
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900 dark:text-white">Email Examples:</h5>
                    <div className="space-y-1 text-gray-700 dark:text-gray-300">
                      <div className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded" onClick={() => setSmartInput('user@example.com')}>
                        user@example.com
                      </div>
                      <div className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded" onClick={() => setSmartInput('admin@company.org')}>
                        admin@company.org
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900 dark:text-white">Phone Examples:</h5>
                    <div className="space-y-1 text-gray-700 dark:text-gray-300">
                      <div className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded" onClick={() => setSmartInput('(555) 123-4567')}>
                        (555) 123-4567
                      </div>
                      <div className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded" onClick={() => setSmartInput('+1-555-123-4567')}>
                        +1-555-123-4567
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900 dark:text-white">Other Examples:</h5>
                    <div className="space-y-1 text-gray-700 dark:text-gray-300">
                      <div className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded" onClick={() => setSmartInput('https://example.com')}>
                        https://example.com
                      </div>
                      <div className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded" onClick={() => setSmartInput('123.45')}>
                        123.45
                      </div>
                      <div className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded" onClick={() => setSmartInput('user123')}>
                        user123
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}


          {/* Regex Structure Guide */}
          {activeTab === 'guide' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              📚 Complete Regex Guide - Learn Regular Expressions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
              Master regular expressions with our comprehensive guide. Perfect for beginners and reference for experts.
            </p>

            {/* Getting Started Section */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-8 mb-8">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🚀 Getting Started with Regex
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">What is Regex?</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Regular expressions (regex) are powerful patterns used to match, search, and manipulate text. 
                    Think of them as a super-powered "Find and Replace" tool that can find complex patterns in text.
                  </p>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Why Use Regex?</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Data Validation:</strong> Check if emails, phones, or IDs are properly formatted</li>
                    <li>• <strong>Text Processing:</strong> Find and extract specific information from documents</li>
                    <li>• <strong>Search & Replace:</strong> Make complex changes across multiple files</li>
                    <li>• <strong>Log Analysis:</strong> Parse log files to find errors or patterns</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Basic Concepts</h5>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                      <strong>Pattern:</strong> The regex expression you write (like <code className="text-blue-600">\d{3}</code>)
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                      <strong>Match:</strong> Text that fits your pattern (like "123" for <code className="text-blue-600">\d{3}</code>)
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                      <strong>Flags:</strong> Options that change how regex works (like case-insensitive)
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
          )}

          {/* Common Patterns - Only show in validator tab */}
          {activeTab === 'validator' && (
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
          )}

          {/* Regex Reference - Only show in guide tab */}
          {activeTab === 'guide' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Metacharacters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Regex Metacharacters
              </h3>
              <div className="space-y-4">
                {regexMetacharacters.map((meta, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <code className="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded text-sm font-mono font-bold">
                        {meta.char}
                      </code>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {meta.description}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                      {meta.explanation}
                    </p>
                    <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded font-mono">
                      Example: {meta.example}
                    </div>
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
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex items-center space-x-3 mb-2">
                      <code className="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded text-sm font-mono font-bold">
                        {flag.flag}
                      </code>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {flag.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {flag.description}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                      {flag.explanation}
                    </p>
                    <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded font-mono whitespace-pre-line">
                      {flag.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* SEO Content - Only show in guide tab */}
          {activeTab === 'guide' && (
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
          )}

          {/* How to Use Section - Only show in guide tab */}
          {activeTab === 'guide' && (
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
          )}

          <DeveloperToolsNav currentPath="/regex-validator" />
        </div>
      </div>
    </>
  );
}
