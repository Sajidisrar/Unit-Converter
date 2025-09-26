import AdBanner from "@/components/AdBanner";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Analytics/>
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
            Fast, accurate, and user-friendly conversions for length, weight, temperature, area, speed, and more.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Most Common Converters */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Most Popular Converters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/length" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Length</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Meters, feet, inches, yards, kilometers, miles</p>
                </div>
              </a>

              <a href="/weight" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9m3-9l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M15 7l3 1m-3-1l-3 9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Weight</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Kilograms, pounds, ounces, grams, stones</p>
                </div>
              </a>

              <a href="/temperature" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Temperature</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Celsius, Fahrenheit, Kelvin</p>
                </div>
              </a>

            </div>
          </section>

          {/* Inline Ad Banner */}
          <AdBanner position="inline" />

          {/* All Converters Navigation Grid */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              All Unit Converters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/length" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Length Converter</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300">Meters, feet, inches, yards</p>
                  </div>
                </div>
              </a>

              <a href="/weight" className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-green-200 dark:border-green-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9m3-9l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M15 7l3 1m-3-1l-3 9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Weight Converter</h3>
                    <p className="text-sm text-green-600 dark:text-green-300">Kilograms, pounds, ounces</p>
                  </div>
                </div>
              </a>

              <a href="/temperature" className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Temperature Converter</h3>
                    <p className="text-sm text-yellow-600 dark:text-yellow-300">Celsius, Fahrenheit, Kelvin</p>
                  </div>
                </div>
              </a>

              <a href="/area" className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-purple-200 dark:border-purple-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Area Converter</h3>
                    <p className="text-sm text-purple-600 dark:text-purple-300">Square meters, acres, hectares</p>
                  </div>
                </div>
              </a>

              <a href="/speed" className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-red-200 dark:border-red-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Speed Converter</h3>
                    <p className="text-sm text-red-600 dark:text-red-300">MPH, KPH, knots, m/s</p>
                  </div>
                </div>
              </a>

              <a href="/cooking" className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-orange-200 dark:border-orange-700">
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a2 2 0 012 2v4h-4V4a2 2 0 012-2zm0 6h4v12H8V8h4z" />
      </svg>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">Cooking Converter</h3>
      <p className="text-sm text-orange-600 dark:text-orange-300">Cups, tablespoons, teaspoons, grams</p>
    </div>
  </div>
</a>
            </div>
          </section>

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
