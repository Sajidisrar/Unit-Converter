import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold">Unit Converter</span>
            </div>
            <p className="text-gray-400 text-sm">
              Free online unit conversion tools for length, weight, temperature, area, and speed. 
              Fast, accurate, and user-friendly conversions.
            </p>
          </div>

          {/* Converters */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Converters</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/unit-converter" className="text-gray-400 hover:text-white transition-colors">
                  📏 Unit Converter
                </Link>
              </li>
              <li>
                <Link href="/power" className="text-gray-400 hover:text-white transition-colors">
                  ⚡ Power Converter
                </Link>
              </li>
              <li>
                <Link href="/electricity-consumption" className="text-gray-400 hover:text-white transition-colors">
                  🔌 Electricity Calculator
                </Link>
              </li>
              <li>
                <Link href="/cooking" className="text-gray-400 hover:text-white transition-colors">
                  👨‍🍳 Cooking Converter
                </Link>
              </li>
              <li>
                <Link href="/fitness" className="text-gray-400 hover:text-white transition-colors">
                  💪 Fitness Converter
                </Link>
              </li>
              <li>
                <Link href="/fuel-economy" className="text-gray-400 hover:text-white transition-colors">
                  ⛽ Fuel Economy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✅ Free to use</li>
              <li>✅ No registration required</li>
              <li>✅ Mobile friendly</li>
              <li>✅ Instant results</li>
              <li>✅ Accurate conversions</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 Unit Converter. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
