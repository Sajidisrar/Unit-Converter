import Head from "next/head";
import AdBanner from "@/components/AdBanner";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Free Online Unit Converter | Length, Weight, Temperature, Area, Speed & Cooking Tools</title>
        <meta
          name="description"
          content="Use our free online unit converters for length, weight, temperature, area, speed, and cooking. Convert values instantly with accurate results. Also includes developer tools like JSON Formatter, Base64 Encoder, URL Encoder, JWT Decoder, and more."
        />
        <meta
          name="keywords"
          content="unit converter, free unit converter, length converter, weight converter, temperature converter, area converter, cooking converter, speed converter, online tools, developer tools, JSON formatter, Base64 encoder, URL encoder, JWT decoder"
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
        {/* Top Ad Banner */}
        <AdBanner position="top" />

        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Free Online Unit Converters & Developer Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Instantly convert units and use powerful developer utilities with our free online tools. Perform fast, accurate, and user-friendly conversions for length, weight, temperature, area, speed, cooking, and more. Developers can also access JSON Formatter, Base64 Encoder/Decoder, URL Encoder/Decoder, JWT Decoder, Unix Timestamp Converter, and Number Base Converter to streamline coding and data science tasks.
          </p>
        </header>

        

        <main className="max-w-6xl mx-auto">
          {/* Most Popular Converters */}
          <section className="mb-12">
            
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Most Popular Converters
            </h2>
            <div className="grid grid-cols-1 gap-6 mb-12">
              {/* Developer Tools */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Developer Tools</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Quick access to developer tools for encoding, formatting, and data conversion
                  </p>
                </div>
                
                {/* Most Frequently Used Tools - Top Row */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">Most Popular Tools</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <a href="/base64-encoder-decoder" className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg p-3 text-center transition-colors border-2 border-green-200 dark:border-green-800">
                      <div className="text-2xl mb-1">🔐</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">Base64</div>
                    </a>
                    
                    <a href="/json-to-csv" className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg p-3 text-center transition-colors border-2 border-blue-200 dark:border-blue-800">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">JSON to CSV</div>
                    </a>
                    
                    <a href="/color-converter" className="bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/40 rounded-lg p-3 text-center transition-colors border-2 border-pink-200 dark:border-pink-800">
                      <div className="text-2xl mb-1">🎨</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">Color Picker</div>
                    </a>
                    
                    <a href="/url-encoder-decoder" className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-lg p-3 text-center transition-colors border-2 border-purple-200 dark:border-purple-800">
                      <div className="text-2xl mb-1">🌐</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">URL Encoder</div>
                    </a>
                  </div>
                </div>

                {/* Additional Developer Tools */}
                <div>
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">More Developer Tools</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    <a href="/json-prettier" className="bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-lg p-2 text-center transition-colors">
                      <div className="text-xl mb-1">✨</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">JSON Pretty</div>
                    </a>
                    
                    <a href="/jwt-decoder" className="bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 rounded-lg p-2 text-center transition-colors">
                      <div className="text-xl mb-1">🔑</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">JWT Decoder</div>
                    </a>
                    
                    <a href="/xml-formatter" className="bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 rounded-lg p-2 text-center transition-colors">
                      <div className="text-xl mb-1">📄</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">XML Format</div>
                    </a>
                    
                    <a href="/json-compare" className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg p-2 text-center transition-colors">
                      <div className="text-xl mb-1">🔍</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">JSON Diff</div>
                    </a>
                    
                    <a href="/xml-compare" className="bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg p-2 text-center transition-colors">
                      <div className="text-xl mb-1">⚖️</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">XML Diff</div>
                    </a>
                    
                    <a href="/text-compare" className="bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/40 rounded-lg p-2 text-center transition-colors">
                      <div className="text-xl mb-1">📝</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">Text Diff</div>
                    </a>
                    
                    <a href="/json-parser" className="bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded-lg p-2 text-center transition-colors">
                      <div className="text-xl mb-1">🔧</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">JSON Parser</div>
                    </a>
                    
                    <a href="/xml-parser" className="bg-lime-50 dark:bg-lime-900/20 hover:bg-lime-100 dark:hover:bg-lime-900/40 rounded-lg p-2 text-center transition-colors">
                      <div className="text-xl mb-1">🛠️</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white">XML Parser</div>
                    </a>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <a href="/developer" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium">
                    View All Tools →
                  </a>
                </div>
              </div>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Length Converter */}
              <a href="/length" aria-label="Length Converter" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Length Converter</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="text-blue-600 dark:text-blue-400">Meters</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Feet</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Inches</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Miles</span>
                  </p>
                </div>
              </a>

              {/* Weight Converter */}
              <a href="/weight" aria-label="Weight Converter" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9m3-9l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M15 7l3 1m-3-1l-3 9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Weight Converter</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="text-blue-600 dark:text-blue-400">Kilograms</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Pounds</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Grams</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Ounces</span>
                  </p>
                </div>
              </a>

              {/* Temperature Converter */}
              <a href="/temperature" aria-label="Temperature Converter" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Temperature Converter</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="text-blue-600 dark:text-blue-400">Celsius</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Fahrenheit</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Kelvin</span>
                  </p>
                </div>
              </a>

              {/* Area Converter */}
              <a href="/area" aria-label="Area Converter" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Area Converter</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="text-blue-600 dark:text-blue-400">Square meters</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">acres</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">hectares</span>
                  </p>
                </div>
              </a>

             

              

              

              {/* Speed Converter */}
              <a href="/speed" aria-label="Speed Converter" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Speed Converter</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="text-blue-600 dark:text-blue-400">MPH</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">KPH</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Knots</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">m/s</span>
                  </p>
                </div>
              </a>

              {/* Cooking Converter */}
              <a href="/cooking" aria-label="Cooking Converter" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a2 2 0 012 2v4h-4V4a2 2 0 012-2zm0 6h4v12H8V8h4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Cooking Converter</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="text-blue-600 dark:text-blue-400">Cups</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Tablespoons</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Teaspoons</span>,{" "}
                    <span className="text-blue-600 dark:text-blue-400">Grams</span>
                  </p>
                </div>
              </a>
            </div>
          </section>

          {/* Inline Ad Banner */}
          <AdBanner position="inline" />

          {/* Features Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Why Use Our Free Online Unit Converters?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-300">Instant conversions with real-time calculations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">100&#37; Accurate</h3>
                <p className="text-gray-600 dark:text-gray-300">Precise calculations using official conversion rates</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Mobile Friendly</h3>
                <p className="text-gray-600 dark:text-gray-300">Works perfectly on all devices and screen sizes</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">What is a Unit Converter?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A unit converter is a free online tool that helps you quickly transform values from one measurement system to another. With our converters, you can easily switch between units of <b>Length</b> (meters to feet), <b>Weight</b> (kilograms to pounds), <b>Temperature</b> (Celsius to Fahrenheit), <b>Area</b> (acres to square meters), <b>Speed</b> (MPH to KPH), and <b>Cooking</b> (cups to grams).
              <br /><br />
              In addition, we provide a full suite of <b>Developer Tools</b> such as Base64 Encoder/Decoder, JSON Formatter/Minifier, JSON to CSV Converter, URL Encoder/Decoder, Unix Timestamp Converter, JWT Decoder, Number Base Converter, and Text to ASCII conversion. These tools are designed for programmers, AI practitioners, and data science professionals who need fast and accurate online utilities.
            </p>
          </section>

          {/* SEO Content Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Popular Unit Conversion Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Length & Distance</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Convert between meters, feet, inches, yards, kilometers, miles, and nautical miles. Perfect for construction, travel planning, and academic work.
                </p>
                <a href="/length" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  Try Length Converter →
                </a>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Weight & Mass</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Convert kilograms, pounds, ounces, grams, tons, and stones. Essential for cooking, shipping, and health monitoring.
                </p>
                <a href="/weight" className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium">
                  Try Weight Converter →
                </a>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Temperature</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Convert between Celsius, Fahrenheit, and Kelvin. Useful for weather, cooking, and scientific calculations.
                </p>
                <a href="/temperature" className="text-yellow-600 dark:text-yellow-400 hover:underline text-sm font-medium">
                  Try Temperature Converter →
                </a>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Area & Land</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Convert square meters, square feet, acres, hectares, and square yards. Ideal for real estate and agriculture.
                </p>
                <a href="/area" className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium">
                  Try Area Converter →
                </a>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Speed & Velocity</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Convert MPH, KPH, knots, meters per second, and feet per second. Great for automotive and aviation.
                </p>
                <a href="/speed" className="text-red-600 dark:text-red-400 hover:underline text-sm font-medium">
                  Try Speed Converter →
                </a>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Cooking & Kitchen</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Convert cups, tablespoons, teaspoons, grams, ounces, and milliliters. Perfect for baking and cooking.
                </p>
                <a href="/cooking" className="text-orange-600 dark:text-orange-400 hover:underline text-sm font-medium">
                  Try Cooking Converter →
                </a>
              </div>
            </div>
          </section>


        {/* FAQ Section for Engagement */}
        <section className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            <div>
              <h3 className="font-medium">What can I convert with this unit converter?</h3>
              <p>You can convert length, weight, temperature, area, speed, and cooking units. Our converters are designed to be fast and accurate.</p>
            </div>
            <div>
              <h3 className="font-medium">Do I need to install software to use it?</h3>
              <p>No, all converters run directly in your browser. Nothing to install or download.</p>
            </div>
            <div>
              <h3 className="font-medium">Are developer tools included?</h3>
              <p>Yes, we provide JSON, XML, Base64, URL, and JWT tools for developers and data scientists, accessible online for free.</p>
            </div>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}
