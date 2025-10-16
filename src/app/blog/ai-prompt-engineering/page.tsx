import AdBanner from "@/components/AdBanner";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Write Better AI Prompts: Complete Guide for Beginners | Unit Converter Blog",
  description: "Learn the basics of AI prompt engineering, best practices, and examples for generating accurate AI responses.",
  keywords: "AI prompt engineering, prompt writing, AI prompts, artificial intelligence, prompt optimization, AI best practices",
  openGraph: {
    title: "How to Write Better AI Prompts: Complete Guide for Beginners",
    description: "Learn the basics of AI prompt engineering, best practices, and examples for generating accurate AI responses.",
    type: "article",
  },
  alternates: {
    canonical: '/blog/ai-prompt-engineering',
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How to Write Better AI Prompts: Complete Guide for Beginners",
      description: "Learn the basics of AI prompt engineering, best practices, and examples for generating accurate AI responses.",
      author: {
        "@type": "Organization",
        name: "Unit Converter"
      },
      publisher: {
        "@type": "Organization",
        name: "Unit Converter",
        url: "https://freeunitconvertor.com"
      },
      datePublished: "2025-01-15",
      dateModified: "2025-01-15",
      url: "https://freeunitconvertor.com/blog/ai-prompt-engineering"
    })
  }
};

export default function AIPromptEngineeringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                AI & Development
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How to Write Better AI Prompts: Complete Guide for Beginners
            </h1>
            
            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400 mb-8">
              <span>🤖 AI & Development</span>
              <span>•</span>
              <span>5 min read</span>
              <span>•</span>
              <span>January 15, 2025</span>
            </div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              AI models are only as good as the instructions you give them. This guide explains how to write effective prompts that produce smarter, more useful responses.
            </p>
          </header>

          <div className="mb-8">
            <AdBanner position="top" />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">What Is Prompt Engineering?</h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Prompt engineering is the art of crafting inputs that help AI systems understand your intent. It&apos;s the key to unlocking creative, accurate, and efficient outputs from artificial intelligence models.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Key Insight</h3>
              <p className="text-blue-700 dark:text-blue-300">
                The quality of your AI output is directly proportional to the quality of your input prompt. Better prompts = better results.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Prompt Writing Tips</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">✅ Do This</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Be <strong>specific</strong> and <strong>contextual</strong></li>
                  <li>• Give <strong>examples</strong> of desired outputs</li>
                  <li>• Use step-by-step instructions for complex tasks</li>
                  <li>• Provide relevant background information</li>
                  <li>• Specify the format you want</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">❌ Avoid This</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Vague words like &quot;good&quot; or &quot;nice&quot;</li>
                  <li>• Ambiguous instructions</li>
                  <li>• Too many requirements at once</li>
                  <li>• Assuming the AI knows your context</li>
                  <li>• Unclear formatting requests</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Example: Good vs Bad Prompts</h3>
            
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-6 mb-4">
              <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">❌ Bad Prompt</h4>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm">
                &quot;Write about JSON.&quot;
              </div>
              <p className="text-red-700 dark:text-red-300 mt-2 text-sm">
                Too vague - the AI doesn&apos;t know what aspect of JSON you want, what level of detail, or what format.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-6 mb-8">
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">✅ Good Prompt</h4>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm">
                &quot;Explain what JSON is, why it&apos;s used in APIs, and show a simple example with proper formatting.&quot;
              </div>
              <p className="text-green-700 dark:text-green-300 mt-2 text-sm">
                Specific, contextual, and includes clear requirements for the output.
              </p>
            </div>

            <div className="mb-8">
              <AdBanner position="inline" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Advanced Techniques</h2>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🎭 Role Prompting</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Assign a specific role to the AI to get more targeted responses.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded font-mono text-sm">
                  &quot;Act as a software engineer with 10 years of experience. Explain the best practices for API design.&quot;
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🧠 Chain-of-Thought Prompting</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Ask the AI to show its reasoning process step by step.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded font-mono text-sm">
                  &quot;Solve this math problem step by step, showing your reasoning for each step.&quot;
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🔄 Iterative Refinement</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Continuously improve your prompts based on the AI&apos;s responses.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded font-mono text-sm">
                  &quot;That&apos;s good, but can you make it more technical and include code examples?&quot;
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Practical Examples</h2>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📝 Writing Tasks</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Blog Post</h4>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono">
                    &quot;Write a 500-word blog post about renewable energy for homeowners. Include 3 practical tips and use a conversational tone.&quot;
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Code Review</h4>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono">
                    &quot;Review this JavaScript function for performance issues and suggest improvements. Focus on optimization techniques.&quot;
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Common Mistakes to Avoid</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ Common Mistakes</h3>
                <ul className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                  <li>• Being too vague or generic</li>
                  <li>• Asking for too much at once</li>
                  <li>• Not providing enough context</li>
                  <li>• Ignoring the AI&apos;s capabilities</li>
                  <li>• Not iterating on prompts</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ Best Practices</h3>
                <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                  <li>• Start specific, then refine</li>
                  <li>• Break complex tasks into steps</li>
                  <li>• Provide examples when possible</li>
                  <li>• Test and iterate your prompts</li>
                  <li>• Use clear, direct language</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Conclusion</h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Prompt engineering is a skill that improves with practice. Start with simple, specific prompts and gradually add complexity. Remember that AI models are tools that work best when given clear, well-structured instructions.
            </p>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-3">Ready to Practice?</h3>
              <p className="mb-4">Want to experiment with prompt engineering? Try AI-powered tools and prompt templates at our developer tools section:</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/ai-cheat-sheet" className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
                  AI Cheat Sheet
                </Link>
                <Link href="/prompt-engineering" className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
                  Prompt Engineering
                </Link>
                <Link href="/developer" className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
                  Developer Tools
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/blog/json-to-csv" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Convert JSON to CSV</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Learn how to convert JSON data into CSV format for Excel and data analysis.</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/base64-encoder-decoder" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">🔐</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Base64 Encoder/Decoder</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Understand Base64 encoding, its use cases, and how to encode or decode data online.</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
