import { Metadata } from 'next';
import AiToolsClient from './AiToolsClient';

export const metadata: Metadata = {
  title: 'AI Development Tools - Cheat Sheet & Prompt Engineering | Free Developer Tools',
  description: 'Free AI development tools for programmers. Programming language cheat sheet for 6 languages with syntax and patterns. Prompt engineering templates for code generation, debugging, testing, and documentation.',
  keywords: [
    'ai cheat sheet', 'programming cheat sheet', 'developer cheat sheet',
    'prompt engineering', 'ai prompts', 'chatgpt prompts',
    'javascript cheat sheet', 'python cheat sheet', 'typescript cheat sheet',
    'ai coding assistant', 'github copilot prompts', 'claude prompts',
    'code generation prompts', 'debugging prompts'
  ],
  openGraph: {
    title: 'AI Development Tools - Cheat Sheet & Prompt Engineering',
    description: 'Programming language reference and AI prompt engineering templates for developers. Free tools for effective AI-assisted development.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Development Tools',
  description: 'Free AI development tools including programming language cheat sheets and prompt engineering templates.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Programming language syntax reference',
    'Common coding patterns for 6 languages',
    'AI tool reference guide',
    'Prompt templates for code generation',
    'Debugging and testing prompt templates',
    'Documentation generation prompts'
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is prompt engineering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prompt engineering is the practice of designing and optimizing inputs (prompts) to AI models like ChatGPT and Claude to get better, more accurate outputs. It involves structuring your requests with context, examples, and constraints to guide the AI toward the desired response.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I write effective prompts for ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Write effective prompts by: 1) Being specific about language and framework, 2) Providing context about your project, 3) Specifying output format, 4) Including examples when possible, 5) Breaking complex tasks into steps, 6) Asking AI to "think step by step" for complex problems.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between ChatGPT and GitHub Copilot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatGPT is a conversational AI for explanations, debugging, and code generation through chat. GitHub Copilot is an IDE extension providing real-time code suggestions as you type. Use ChatGPT for discussions and complex problems, Copilot for inline code completion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which AI tool is best for code review?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Claude (Anthropic) excels at code review with its strong analytical capabilities and large context window. It can analyze entire files, identify security issues, suggest improvements, and explain complex code patterns. ChatGPT is also effective for detailed code explanations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use AI to generate unit tests?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use our testing prompt template: provide the function code, specify the testing framework (Jest, pytest, etc.), and ask for comprehensive tests including edge cases, error conditions, and mock objects. Request both positive and negative test cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is chain-of-thought prompting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chain-of-thought prompting asks AI to "think step by step" before providing an answer. This technique improves accuracy for complex problems by making the AI show its reasoning process. Add "Let\'s think through this step by step" to your prompts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can AI help with debugging code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Share your code with the error message and ask AI to: 1) Identify the root cause, 2) Explain why the error occurs, 3) Suggest fixes, 4) Recommend preventive measures. Provide context about your environment and what you\'ve already tried.',
      },
    },
    {
      '@type': 'Question',
      name: 'What programming languages does AI coding assistance support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Major AI tools support all popular languages: JavaScript, Python, TypeScript, Java, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, and more. Our cheat sheet covers 6 languages with syntax reference and common patterns for quick reference.',
      },
    },
  ],
};

export default function AiToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AiToolsClient />
    </>
  );
}
