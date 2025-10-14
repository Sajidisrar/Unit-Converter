"use client";

import Head from "next/head";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Tool data for search and filtering
  const allTools = [
    // Developer Tools
    { name: "AI Cheat Sheet", url: "/ai-cheat-sheet", icon: "🤖", category: "developer", description: "Comprehensive AI development reference" },
    { name: "Regex Validator", url: "/regex-validator", icon: "🔍", category: "developer", description: "Test and validate regular expressions" },
    { name: "Prompt Engineering", url: "/prompt-engineering", icon: "💬", category: "developer", description: "Learn effective prompt engineering" },
    { name: "Base64 Encoder/Decoder", url: "/base64-encoder-decoder", icon: "🔐", category: "developer", description: "Encode and decode Base64 data" },
    { name: "JSON to CSV", url: "/json-to-csv", icon: "📊", category: "developer", description: "Convert JSON to CSV format" },
    { name: "URL Encoder/Decoder", url: "/url-encoder-decoder", icon: "🌐", category: "developer", description: "Encode and decode URLs" },
    { name: "JWT Decoder", url: "/jwt-decoder", icon: "🔑", category: "developer", description: "Decode JSON Web Tokens" },
    { name: "JSON Prettier", url: "/json-prettier", icon: "✨", category: "developer", description: "Format and beautify JSON" },
    { name: "JSON Parser", url: "/json-parser", icon: "🔧", category: "developer", description: "Parse and validate JSON" },
    { name: "XML Formatter", url: "/xml-formatter", icon: "📄", category: "developer", description: "Format XML documents" },
    { name: "JSON Compare", url: "/json-compare", icon: "🔍", category: "developer", description: "Compare JSON objects" },
    { name: "Text Compare", url: "/text-compare", icon: "📝", category: "developer", description: "Compare text documents" },
    { name: "Color Converter", url: "/color-converter", icon: "🎨", category: "developer", description: "Convert color formats" },
    
    // Unit Converters
    { name: "Length Converter", url: "/length", icon: "📏", category: "converter", description: "Convert length units (meters, feet, inches)" },
    { name: "Weight Converter", url: "/weight", icon: "⚖️", category: "converter", description: "Convert weight units (kg, lbs, oz)" },
    { name: "Temperature Converter", url: "/temperature", icon: "🌡️", category: "converter", description: "Convert temperature (Celsius, Fahrenheit)" },
    { name: "Area Converter", url: "/area", icon: "📐", category: "converter", description: "Convert area units (sq meters, acres)" },
    { name: "Speed Converter", url: "/speed", icon: "🏃", category: "converter", description: "Convert speed (MPH, KPH, knots)" },
    { name: "Cooking Converter", url: "/cooking", icon: "👨‍🍳", category: "converter", description: "Convert cooking units (cups, tbsp)" }
  ];

  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Free Online Unit & Developer Tools 2025 | JSON, Base64, URL, JWT, XML Converters & Regex Validator</title>
        <meta
          name="description"
          content="Best free online developer tools and unit converters for 2025. Format JSON, encode Base64, decode JWT, validate regex, convert units instantly. Trusted by 100K+ developers worldwide. No registration required."
        />
        <meta
          name="keywords"
          content="free online developer tools, JSON formatter online, Base64 encoder decoder, URL encoder decoder, JWT token decoder, XML formatter, regex validator, unit converter online, length converter, weight converter, temperature converter, area converter, speed converter, cooking converter, JSON to CSV converter, developer utilities, web development tools, API testing tools, data conversion tools, programming tools, code formatter, text compare tool, color converter, AI cheat sheet, prompt engineering"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://freeunitconvertor.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Free Online Unit Converter",
              "url": "https://freeunitconvertor.com"
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freeunitconvertor.com/" }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is an online unit converter?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "An online unit converter lets you quickly change values between measurement systems such as length, weight, temperature, area, speed, and cooking units."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is this unit converter free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all our converters are completely free to use without any registration required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What developer tools are available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide free developer tools including JSON Formatter, JSON to CSV Converter, Base64 Encoder/Decoder, URL Encoder/Decoder, JWT Decoder, Unix Timestamp Converter, and Number Base Converter."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <Analytics />
      {/* Developer Tools Navigation Link */}
      <div className="container mx-auto px-4 pt-6 flex justify-start">
      </div>
      <div className="container mx-auto px-4 py-8">

        {/* Compact Hero Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Free Online Tools 2025
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Developer tools & unit converters. JSON, Base64, JWT, Regex, Length, Weight, Temperature & more.
          </p>
          
        </header>

        {/* All Tools Grid - Moved to Top */}
        <main className="max-w-6xl mx-auto">
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
              {allTools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.url}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 p-6 h-full flex flex-col"
                >
                  <div className="text-center flex flex-col h-full">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Ad Banner between tools */}
            <div className="my-8">
              <AdBanner position="inline" />
            </div>
          </section>




          {/* Compact Features */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Fast & Free</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Instant results, no registration</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Secure & Private</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">All processing in your browser</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Mobile Optimized</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Works on all devices</p>
              </div>
            </div>
          </section>

          {/* Practical Use Cases Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Tools for Different Fields
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">👨‍💻 Software Development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Debug APIs, format JSON responses, validate JWT tokens, and test regex patterns for authentication and data validation.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <strong>Use cases:</strong> API testing, authentication debugging, data validation, code formatting
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">📊 Data Science</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Convert measurement units, format datasets, compare data files, and process information for analysis and reporting.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <strong>Use cases:</strong> Unit conversions, data formatting, file comparison, measurement analysis
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/length" className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-700 transition-colors">Length</Link>
                  <Link href="/weight" className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-700 transition-colors">Weight</Link>
                  <Link href="/area" className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-700 transition-colors">Area</Link>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🌐 Web Development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Encode URLs, format XML/JSON, validate patterns, convert CSS units, and debug web applications.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <strong>Use cases:</strong> URL encoding, data formatting, pattern validation, CSS conversions
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🔬 Research & Academia</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Convert scientific units, format research data, validate measurements, and process experimental results.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <strong>Use cases:</strong> Unit conversions, data formatting, measurement validation, research analysis
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/temperature" className="text-xs bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 px-2 py-1 rounded hover:bg-orange-200 dark:hover:bg-orange-700 transition-colors">Temperature</Link>
                  <Link href="/speed" className="text-xs bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 px-2 py-1 rounded hover:bg-orange-200 dark:hover:bg-orange-700 transition-colors">Speed</Link>
                  <Link href="/area" className="text-xs bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 px-2 py-1 rounded hover:bg-orange-200 dark:hover:bg-orange-700 transition-colors">Area</Link>
                </div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🏭 Engineering</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Convert engineering units, calculate measurements, format technical data, and validate specifications.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <strong>Use cases:</strong> Unit conversions, measurement calculations, technical data formatting, specification validation
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/length" className="text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors">Length</Link>
                  <Link href="/weight" className="text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors">Weight</Link>
                  <Link href="/area" className="text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors">Area</Link>
                  <Link href="/speed" className="text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors">Speed</Link>
                </div>
              </div>
              
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🍳 Cooking & Food</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Convert cooking measurements, scale recipes, convert temperatures, and calculate nutritional values.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <strong>Use cases:</strong> Recipe scaling, measurement conversions, temperature conversions, cooking calculations
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/cooking" className="text-xs bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-1 rounded hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors">Cooking</Link>
                  <Link href="/weight" className="text-xs bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-1 rounded hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors">Weight</Link>
                  <Link href="/temperature" className="text-xs bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-1 rounded hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors">Temperature</Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Ad Banner */}
        <div className="mt-12">
          <AdBanner position="inline" />
        </div>
      </div>
    </div>
    </>
  );
}
