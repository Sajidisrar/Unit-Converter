'use client';

import { useState } from 'react';
import TabContainer from '@/components/shared/TabContainer';
import { AiCheatSheetTool, PromptEngineeringTool } from '@/components/ai-tools';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

const tabs = [
  { id: 'cheatsheet', label: 'AI Cheat Sheet', icon: '🤖' },
  { id: 'prompts', label: 'Prompt Engineering', icon: '💬' },
];

export default function AiToolsClient() {
  const [activeTab, setActiveTab] = useState('cheatsheet');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            AI Development Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Programming language reference with syntax and patterns, plus AI prompt engineering templates for code generation, debugging, and more.
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
              accentColor="purple"
            />

            {/* Tool Content */}
            <div className="mt-6">
              {activeTab === 'cheatsheet' && <AiCheatSheetTool />}
              {activeTab === 'prompts' && <PromptEngineeringTool />}
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About AI Development Tools</h2>

            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">AI Cheat Sheet</h3>
                <p>Quick reference for 6 popular programming languages including JavaScript, Python, TypeScript, Java, Go, and Rust. Browse syntax guides and common patterns for each language, plus essential AI development tools.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Prompt Engineering</h3>
                <p>Generate effective prompts for AI coding assistants like ChatGPT, Claude, and GitHub Copilot. Choose from templates for code generation, code review, debugging, testing, and documentation across 10 programming languages.</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Master AI-Assisted Development</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Learn to write effective prompts that get better results from AI tools. Use the cheat sheet for quick syntax reference and the prompt generator for customized AI coding assistance.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is prompt engineering?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Prompt engineering is the practice of designing and optimizing inputs to AI models like ChatGPT and Claude to get better outputs. It involves structuring requests with context, examples, and constraints to guide the AI toward desired responses.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I write effective prompts for ChatGPT?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Be specific about language and framework, provide project context, specify output format, include examples when possible, break complex tasks into steps, and ask AI to &quot;think step by step&quot; for complex problems.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is the difference between ChatGPT and GitHub Copilot?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">ChatGPT is a conversational AI for explanations, debugging, and code generation through chat. GitHub Copilot is an IDE extension providing real-time code suggestions as you type. Use ChatGPT for discussions, Copilot for inline completion.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Which AI tool is best for code review?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Claude excels at code review with strong analytical capabilities and large context window. It can analyze entire files, identify security issues, and suggest improvements. ChatGPT is also effective for detailed code explanations.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I use AI to generate unit tests?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Use our testing prompt template: provide the function code, specify the testing framework (Jest, pytest, etc.), and ask for comprehensive tests including edge cases, error conditions, and mock objects.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is chain-of-thought prompting?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Chain-of-thought prompting asks AI to &quot;think step by step&quot; before answering. This improves accuracy for complex problems by making the AI show its reasoning process. Add &quot;Let&apos;s think through this step by step&quot; to your prompts.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How can AI help with debugging code?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Share your code with the error message and ask AI to identify the root cause, explain why the error occurs, suggest fixes, and recommend preventive measures. Provide context about your environment.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What programming languages does AI coding assistance support?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Major AI tools support all popular languages: JavaScript, Python, TypeScript, Java, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, and more. Our cheat sheet covers 6 languages with syntax and patterns.</p>
              </div>
            </div>
          </div>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/ai-tools" />
        </main>
      </div>
    </div>
  );
}
