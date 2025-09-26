import Head from "next/head";
import AdBanner from "@/components/AdBanner";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Free Online Unit Converter Tools – Length, Weight, Temperature & More</title>
        <meta name="description" content="Instantly convert units of length, weight, temperature, area, speed, cooking measures, and more with our free online converter. Accurate and fast!" />
        <meta name="keywords" content="unit converter, length converter, weight converter, cooking converter, BMI calculator, temperature converter, speed converter, area converter" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Analytics />
      <div className="container mx-auto px-4 py-8">
        {/* Top Ad Banner */}
        <AdBanner position="top" />

        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Free Online Unit Converter Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Convert between different units of measurement instantly with our comprehensive collection of free online unit converters. 
            Fast, accurate, and user-friendly conversions for length, weight, temperature, area, speed, cooking, and more.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Most Popular Converters */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Most Popular Converters
            </h2>
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Meters, feet, inches, yards, kilometers, miles</p>
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Kilograms, pounds, ounces, grams, stones</p>
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Celsius, Fahrenheit, Kelvin</p>
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Square meters, acres, hectares</p>
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm">MPH, KPH, knots, m/s</p>
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Cups, tablespoons, teaspoons, grams</p>
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
        </main>
      </div>
    </div>
  );
}
