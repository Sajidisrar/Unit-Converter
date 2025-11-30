'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Unit Converter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-ring rounded-md px-2 py-1"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-ring rounded-md px-2 py-1"
            >
              Blog
            </Link>
            
            {/* Most Frequently Used Tools - Quick Access */}
            <div className="flex items-center space-x-2 border-l border-gray-300 dark:border-gray-600 pl-6">
              <Link 
                href="/length" 
                className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium touch-target focus-ring flex items-center"
                title="Length Converter - Most Popular"
              >
                <span className="mr-1">📏</span>
                <span>Length</span>
              </Link>
              <Link 
                href="/weight" 
                className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors font-medium touch-target focus-ring flex items-center"
                title="Weight Converter - High Usage"
              >
                <span className="mr-1">⚖️</span>
                <span>Weight</span>
              </Link>
              <Link 
                href="/base64-encoder-decoder" 
                className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors font-medium touch-target focus-ring flex items-center"
                title="Base64 Encoder/Decoder - Developer Favorite"
              >
                <span className="mr-1">🔐</span>
                <span>Base64</span>
              </Link>
              <Link 
                href="/json-prettier" 
                className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors font-medium touch-target focus-ring flex items-center"
                title="JSON Formatter - Developer Tool"
              >
                <span className="mr-1">✨</span>
                <span>JSON</span>
              </Link>
              <Link 
                href="/temperature" 
                className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-2 rounded-full hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors font-medium touch-target focus-ring flex items-center"
                title="Temperature Converter - Frequently Used"
              >
                <span className="mr-1">🌡️</span>
                <span>Temp</span>
              </Link>
            </div>
            <div className="relative group">
              <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1">
                <span>All Calculators</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link 
                    href="/developer" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    🛠️ Developer Tools
                  </Link>
                  <Link 
                    href="/length" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    📏 Length Converter
                  </Link>
                  <Link 
                    href="/weight" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    ⚖️ Weight Converter
                  </Link>
                  <Link 
                    href="/temperature" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    🌡️ Temperature Converter
                  </Link>
                  <Link 
                    href="/area" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    📐 Area Converter
                  </Link>
                  <Link 
                    href="/speed" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    🚀 Speed Converter
                  </Link>
                  <Link 
                    href="/power" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    ⚡ Power Converter
                  </Link>
                  <Link 
                    href="/electricity-consumption" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    🔌 Electricity Consumption
                  </Link>
                  <Link 
                    href="/fitness" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    🏋️ Fitness Converter
                  </Link>
                  <Link 
                    href="/cooking" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    🍳 Cooking Converter
                  </Link>
                  <Link 
                    href="/fuel-economy" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    ⛽ Fuel Economy Converter
                  </Link>
                </div>
              </div>
            </div>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeSwitcher />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-target focus-ring"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
                <Link 
                  href="/" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/blog" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              
              {/* Most Frequently Used Tools for Mobile */}
              <div className="py-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Most Used Tools</div>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href="/length" 
                    className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">📏</span>
                    <span>Length</span>
                  </Link>
                  <Link 
                    href="/weight" 
                    className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">⚖️</span>
                    <span>Weight</span>
                  </Link>
                  <Link 
                    href="/base64-encoder-decoder" 
                    className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">🔐</span>
                    <span>Base64</span>
                  </Link>
                  <Link 
                    href="/json-prettier" 
                    className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">✨</span>
                    <span>JSON</span>
                  </Link>
                  <Link 
                    href="/temperature" 
                    className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">🌡️</span>
                    <span>Temp</span>
                  </Link>
                  <Link 
                    href="/jwt-decoder" 
                    className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">🔑</span>
                    <span>JWT</span>
                  </Link>
                </div>
              </div>
              <div className="space-y-1 pl-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">All Calculators</div>
                <Link 
                  href="/developer" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🛠️ Developer Tools
                </Link>
                <Link 
                  href="/length" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📏 Length Converter
                </Link>
                <Link 
                  href="/weight" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ⚖️ Weight Converter
                </Link>
                <Link 
                  href="/temperature" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🌡️ Temperature Converter
                </Link>
                <Link 
                  href="/area" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📐 Area Converter
                </Link>
                <Link 
                  href="/speed" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🚀 Speed Converter
                </Link>
                <Link 
                  href="/power" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ⚡ Power Converter
                </Link>
                <Link 
                  href="/electricity-consumption" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔌 Electricity Consumption
                </Link>
                <Link 
                  href="/fitness" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🏋️ Fitness Converter
                </Link>
                <Link 
                  href="/cooking" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🍳 Cooking Converter
                </Link>
                <Link 
                  href="/fuel-economy" 
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ⛽ Fuel Economy Converter
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
