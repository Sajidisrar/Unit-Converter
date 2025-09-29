import Head from "next/head";
import AdBanner from "@/components/AdBanner";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Free Online Unit Converter & Developer Tools</title>
        <meta name="description" content="Free Online Unit Converter and Developer Tools – Quickly convert length, weight, temperature, area, speed, cooking measures, and more. Includes Base64, JSON, URL, JWT, and Number Base converters for developers." />
        <meta name="keywords" content="unit converter, developer tools, length converter, weight converter, temperature converter, area converter, speed converter, cooking converter, Base64 encoder, JSON formatter, URL encoder, JWT decoder, number base converter" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            Free Online Unit Converter Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Instantly convert units and access powerful developer tools with our free online converters. Fast, accurate, and user-friendly conversions for length, weight, temperature, area, speed, cooking, and more, plus Base64, JSON, URL, JWT, and Number Base converters for developers.
          </p>
        </header>

        

        <main className="max-w-6xl mx-auto">
          {/* Most Popular Converters */}
          <section className="mb-12">
            
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Most Popular Converters
            </h2>
            <div className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-1 gap-6 mb-12">
              {/* Developer Tools */}
              <a href="/developer" aria-label="Developer Tools" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Developer Tools</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    Quick access to developer tools: Base64 Encoder/Decoder, JSON Formatter/Minifier, URL Encoder/Decoder, Unix Timestamp Converter, JWT Decoder, Number Base Converter, and Text ↔ ASCII.
                  </p>
                </div>
              </a>
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
                    <a href="/length?from=m" className="text-blue-600 dark:text-blue-400 hover:underline">Meters</a>,{" "}
                    <a href="/length?from=ft" className="text-blue-600 dark:text-blue-400 hover:underline">Feet</a>,{" "}
                    <a href="/length?from=in" className="text-blue-600 dark:text-blue-400 hover:underline">Inches</a>,{" "}
                    <a href="/length?from=mi" className="text-blue-600 dark:text-blue-400 hover:underline">Miles</a>
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
                    <a href="/weight?from=kg" className="text-blue-600 dark:text-blue-400 hover:underline">Kilograms</a>,{" "}
                    <a href="/weight?from=lb" className="text-blue-600 dark:text-blue-400 hover:underline">Pounds</a>,{" "}
                    <a href="/weight?from=g" className="text-blue-600 dark:text-blue-400 hover:underline">Grams</a>,{" "}
                    <a href="/weight?from=oz" className="text-blue-600 dark:text-blue-400 hover:underline">Ounces</a>
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
                    <a href="/temperature?from=c" className="text-blue-600 dark:text-blue-400 hover:underline">Celsius</a>,{" "}
                    <a href="/temperature?from=f" className="text-blue-600 dark:text-blue-400 hover:underline">Fahrenheit</a>,{" "}
                    <a href="/temperature?from=k" className="text-blue-600 dark:text-blue-400 hover:underline">Kelvin</a>
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
                    <a href="/area?from=m2" className="text-blue-600 dark:text-blue-400 hover:underline">Square meters</a>,{" "}
                    <a href="/area?from=ac" className="text-blue-600 dark:text-blue-400 hover:underline">acres</a>,{" "}
                    <a href="/area?from=ha" className="text-blue-600 dark:text-blue-400 hover:underline">hectares</a>
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
                    <a href="/speed?from=mph" className="text-blue-600 dark:text-blue-400 hover:underline">MPH</a>,{" "}
                    <a href="/speed?from=km/h" className="text-blue-600 dark:text-blue-400 hover:underline">KPH</a>,{" "}
                    <a href="/speed?from=knot" className="text-blue-600 dark:text-blue-400 hover:underline">Knots</a>,{" "}
                    <a href="/speed?from=ms" className="text-blue-600 dark:text-blue-400 hover:underline">m/s</a>
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
                    <a href="/cooking?from=cup" className="text-blue-600 dark:text-blue-400 hover:underline">Cups</a>,{" "}
                    <a href="/cooking?from=tbsp" className="text-blue-600 dark:text-blue-400 hover:underline">Tablespoons</a>,{" "}
                    <a href="/cooking?from=tsp" className="text-blue-600 dark:text-blue-400 hover:underline">Teaspoons</a>,{" "}
                    <a href="/cooking?from=g" className="text-blue-600 dark:text-blue-400 hover:underline">Grams</a>
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
              Why Choose Our Unit Converters?
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
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">100% Accurate</h3>
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
              A unit converter is a tool that allows you to quickly and accurately transform values from one measurement unit to another across a wide variety of categories. On this site, you can convert between units for <b>Length</b> (meters to feet), <b>Weight</b> (kilograms to pounds), <b>Temperature</b> (Celsius to Fahrenheit), <b>Area</b> (acres to square meters), <b>Volume</b> (liters to gallons), <b>Speed</b> (MPH to KPH), <b>Cooking</b> (cups to grams), and <b>Currency</b> (USD to EUR). 
              <br /><br />
              For developers and technical users, we also offer handy <b>Developer Tools</b> including Base64 Encoder/Decoder, JSON Formatter/Minifier, URL Encoder/Decoder, Unix Timestamp Converter, JWT Decoder, Number Base Converter, and Text to ASCII conversion. These tools are essential for software development, API testing, data processing, and debugging, providing fast and accurate results for technical workflows.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
}
