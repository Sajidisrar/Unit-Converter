import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Free Online Unit Converter & Developer Tools | Unit Converter",
  description: "Learn about our comprehensive collection of free online unit converters and developer tools. Serving engineers, developers, students, and professionals worldwide with accurate, fast, and user-friendly conversion tools.",
  keywords: "about unit converter, free online tools, developer tools, unit conversion, engineering tools, student tools, professional tools",
  openGraph: {
    title: "About Us - Free Online Unit Converter & Developer Tools",
    description: "Comprehensive collection of free online unit converters and developer tools for professionals, students, and developers worldwide.",
    type: "website",
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/about',
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Unit Converter",
      url: "https://freeunitconvertor.com/about",
      description: "Free online unit converter and developer tools for professionals, students, and developers worldwide.",
      mainEntity: {
        "@type": "WebApplication",
        name: "Unit Converter",
        applicationCategory: "UtilityApplication",
        operatingSystem: "All",
        description: "Comprehensive collection of free online unit converters and developer tools"
      }
    })
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            About Unit Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your comprehensive destination for free online unit conversion and developer tools, serving professionals, students, and developers worldwide.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We believe that accurate unit conversion and developer tools should be accessible to everyone, everywhere. Our mission is to provide fast, reliable, and completely free online tools that help professionals, students, and developers work more efficiently.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether you&apos;re an engineer converting measurements, a developer working with data formats, or a student learning about units, our tools are designed to make your work easier and more accurate.
            </p>
          </section>

          {/* Who We Serve */}
          <section className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Who We Serve
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Engineers */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Engineers & Technicians
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Convert between metric and imperial units, calculate power consumption, and work with electrical measurements. Essential for mechanical, electrical, and civil engineering projects.
                </p>
                <div className="mt-4">
                  <Link href="/power" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    ⚡ Power Converter
                  </Link>
                  <br />
                  <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    📏 Unit Converter
                  </Link>
                </div>
              </div>

              {/* Developers */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Software Developers
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Encode/decode data, format JSON/XML, validate regular expressions, and work with various data formats. Perfect for API development and data processing.
                </p>
                <div className="mt-4">
                  <Link href="/encoding" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    🔐 Encoding Tools
                  </Link>
                  <br />
                  <Link href="/json" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    📋 JSON Tools
                  </Link>
                </div>
              </div>

              {/* Students */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Students & Educators
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Learn unit conversions, understand different measurement systems, and practice with interactive tools. Great for science, math, and engineering education.
                </p>
                <div className="mt-4">
                  <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    📏 Unit Converter
                  </Link>
                  <br />
                  <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    ⚖️ Weight Converter
                  </Link>
                </div>
              </div>

              {/* Healthcare Professionals */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Healthcare Professionals
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Convert between different measurement units used in medical practice, from temperature scales to weight measurements for patient care.
                </p>
                <div className="mt-4">
                  <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    📏 Unit Converter
                  </Link>
                  <br />
                  <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    ⚖️ Weight Converter
                  </Link>
                </div>
              </div>

              {/* Construction & Real Estate */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Construction & Real Estate
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Convert area measurements, length units, and other dimensions essential for construction projects, property assessments, and architectural planning.
                </p>
                <div className="mt-4">
                  <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    📐 Area Converter
                  </Link>
                  <br />
                  <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    📏 Length Converter
                  </Link>
                </div>
              </div>

              {/* Homeowners */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Homeowners & DIYers
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Calculate electricity consumption, convert cooking measurements, and work with home improvement measurements for DIY projects and energy management.
                </p>
                <div className="mt-4">
                  <Link href="/electricity-consumption" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    🔌 Electricity Calculator
                  </Link>
                  <br />
                  <Link href="/cooking" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    👨‍🍳 Cooking Converter
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Why Choose Our Tools?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Instant conversions with real-time results. No waiting, no delays.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Highly Accurate
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Precision calculations using industry-standard conversion factors.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🆓</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Completely Free
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No registration required, no hidden fees, no limitations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Mobile Friendly
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Responsive design that works perfectly on all devices.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Privacy Focused
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All calculations happen locally. Your data never leaves your device.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Global Standards
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Support for international units and measurement systems.
                </p>
              </div>
            </div>
          </section>

          {/* Tools Overview */}
          <section className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Our Tool Categories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  🔧 Unit Converters
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Length, Weight, Temperature, Area, Speed</li>
                  <li>• Power & Energy Conversion</li>
                  <li>• Cooking & Volume Measurements</li>
                  <li>• Fuel Economy & Distance</li>
                  <li>• Fitness & Health Metrics</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  💻 Developer Tools
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• JSON/XML Formatters & Validators</li>
                  <li>• Base64 & URL Encoders/Decoders</li>
                  <li>• JWT Token Decoder</li>
                  <li>• Regular Expression Validator</li>
                  <li>• Text & Data Comparison Tools</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-blue-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Explore our comprehensive collection of free online tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse All Tools
              </Link>
              <Link 
                href="/developer" 
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                Developer Tools
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}