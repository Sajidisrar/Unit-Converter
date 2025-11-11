"use client";

import AdBanner from "@/components/AdBanner";
import { allTools } from "@/constants/tools";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import { memo } from "react";

function Home() {

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Analytics />
        {/* Developer Tools Navigation Link */}
        <div className="container mx-auto px-4 pt-6 flex justify-start">
        </div>
        <div className="container mx-auto px-4 py-8">
          {/* Enhanced Hero Section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Free Online Tools & Calculators 2025
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Comprehensive collection of <strong>free online tools</strong> for developers, engineers, students, and professionals. 
              Convert units, format data, encode/decode, and solve complex calculations instantly.
            </p>
          </header>

          {/* All Tools Grid - Moved to Top */}
          <main className="max-w-6xl mx-auto">
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 items-stretch">
                {allTools.map((tool, index) => (
                  <Link
                    key={index}
                    href={tool.url}
                    className="group card card-interactive p-4 h-full flex flex-col"
                  >
                    <div className="text-center flex flex-col h-full">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {tool.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
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

              {/* Additional Ad Banner */}
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
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <strong>Use cases:</strong> API testing, authentication debugging, data validation, code formatting
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/json-prettier" className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">JSON</Link>
                    <Link href="/base64-encoder-decoder" className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">Base64</Link>
                    <Link href="/jwt-decoder" className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">JWT</Link>
                    <Link href="/regex-validator" className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">Regex</Link>
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
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">⚡ Power & Energy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Calculate power consumption, convert energy units, estimate electricity costs, and analyze appliance efficiency for energy management.
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <strong>Use cases:</strong> Energy calculations, power conversions, cost estimation, efficiency analysis
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/power" className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors">Power</Link>
                    <Link href="/electricity-consumption" className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors">Electricity</Link>
                    <Link href="/temperature" className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors">Temperature</Link>
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

          {/* SEO Content Section */}
          <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Why Choose Our Free Online Tools?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Instant results with real-time calculations. No waiting, no delays.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Highly Accurate</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Precision calculations using industry-standard conversion factors.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🆓</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Completely Free</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">No registration required, no hidden fees, no limitations.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Mobile Friendly</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Responsive design that works perfectly on all devices.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Popular Tool Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">🔧 Unit Converters</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• <Link href="/length" className="text-blue-600 dark:text-blue-400 hover:underline">Length Converter</Link> - Convert meters, feet, inches, yards, miles</li>
                    <li>• <Link href="/weight" className="text-blue-600 dark:text-blue-400 hover:underline">Weight Converter</Link> - Convert kg, lbs, ounces, grams, tons</li>
                    <li>• <Link href="/temperature" className="text-blue-600 dark:text-blue-400 hover:underline">Temperature Converter</Link> - Convert Celsius, Fahrenheit, Kelvin</li>
                    <li>• <Link href="/area" className="text-blue-600 dark:text-blue-400 hover:underline">Area Converter</Link> - Convert square meters, acres, square feet</li>
                    <li>• <Link href="/power" className="text-blue-600 dark:text-blue-400 hover:underline">Power Converter</Link> - Convert watts, horsepower, BTU/h</li>
                    <li>• <Link href="/speed" className="text-blue-600 dark:text-blue-400 hover:underline">Speed Converter</Link> - Convert MPH, KPH, knots, m/s</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">💻 Developer Tools</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• <Link href="/json-prettier" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Formatter</Link> - Format and validate JSON data</li>
                    <li>• <Link href="/base64-encoder-decoder" className="text-blue-600 dark:text-blue-400 hover:underline">Base64 Encoder</Link> - Encode and decode Base64 strings</li>
                    <li>• <Link href="/jwt-decoder" className="text-blue-600 dark:text-blue-400 hover:underline">JWT Decoder</Link> - Decode JSON Web Tokens</li>
                    <li>• <Link href="/url-encoder-decoder" className="text-blue-600 dark:text-blue-400 hover:underline">URL Encoder</Link> - Encode and decode URLs</li>
                    <li>• <Link href="/regex-validator" className="text-blue-600 dark:text-blue-400 hover:underline">Regex Validator</Link> - Test regular expressions</li>
                    <li>• <Link href="/xml-formatter" className="text-blue-600 dark:text-blue-400 hover:underline">XML Formatter</Link> - Format and validate XML</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Ad Banner */}
          <div className="mt-12">
            <AdBanner position="inline" />
          </div>
        </div>
      </div>
        </>
      );
    }

export default memo(Home);
