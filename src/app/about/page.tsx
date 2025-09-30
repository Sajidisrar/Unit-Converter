

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Free Online Unit Converter & Developer Tools",
  description: "Learn about our free online unit converter and developer tools. We provide fast, accurate conversions for length, weight, temperature, area, speed, cooking, and developer utilities like Base64, JSON, URL, JWT tools.",
  keywords: "about unit converter, free online converter, developer tools, length converter, weight converter, temperature converter, Base64 encoder, JSON formatter",
  openGraph: {
    title: "About Us - Free Online Unit Converter & Developer Tools",
    description: "Learn about our free online unit converter and developer tools. Fast, accurate conversions for all your needs.",
    type: "website",
  },
  alternates: {
    canonical: "https://freeunitconvertor.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            About Our Unit Converter
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Welcome to our comprehensive unit converter platform! Our mission is to provide a simple, fast, and reliable platform for all your unit conversion needs. Whether you&apos;re a student, professional, developer, or everyday user, our site helps you convert between various units and access essential developer tools, all in one convenient place.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              We believe that accurate unit conversions should be accessible to everyone, regardless of their technical background or location. Our platform serves users worldwide, from students working on science projects to professionals in engineering, cooking, healthcare, and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">What We Offer</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Length & Distance Converters</li>
                <li>• Weight & Mass Converters</li>
                <li>• Temperature Converters</li>
                <li>• Area & Land Converters</li>
                <li>• Speed & Velocity Converters</li>
                <li>• Cooking & Kitchen Converters</li>
                <li>• Fuel Economy Converters</li>
                <li>• Fitness & Health Converters</li>
                <li>• Developer Tools & Utilities</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Why Choose Us</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• 100% Free to Use</li>
                <li>• Lightning Fast Conversions</li>
                <li>• Accurate Results</li>
                <li>• Mobile-Friendly Design</li>
                <li>• No Registration Required</li>
                <li>• Works Offline</li>
                <li>• Regular Updates</li>
                <li>• Comprehensive Coverage</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Fast & Accurate</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Instant conversions with precise calculations using official conversion rates</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Mobile Friendly</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Works perfectly on all devices and screen sizes</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Reliable</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Trusted by millions of users worldwide for accurate conversions</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Get Started Today</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
              Ready to start converting? Choose from our wide range of converters and developer tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/length" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Length Converter
              </a>
              <a href="/weight" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Weight Converter
              </a>
              <a href="/developer" className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Developer Tools
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freeunitconvertor.com/" },
              { "@type": "ListItem", "position": 2, "name": "About", "item": "https://freeunitconvertor.com/about" }
            ]
          })
        }}
      />
    </main>
  );
}