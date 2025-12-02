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
            
            {/* Quick Access Tools */}
            <div className="flex items-center space-x-2 border-l border-gray-300 dark:border-gray-600 pl-6">
              <Link
                href="/unit-converter"
                className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium touch-target focus-ring flex items-center"
                title="Unit Converter"
              >
                <span className="mr-1">📏</span>
                <span>Units</span>
              </Link>
              <Link
                href="/encoding"
                className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors font-medium touch-target focus-ring flex items-center"
                title="Encoding Tools"
              >
                <span className="mr-1">🔐</span>
                <span>Encoding</span>
              </Link>
              <Link
                href="/json"
                className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors font-medium touch-target focus-ring flex items-center"
                title="JSON Tools"
              >
                <span className="mr-1">📋</span>
                <span>JSON</span>
              </Link>
              <Link
                href="/text"
                className="text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-2 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors font-medium touch-target focus-ring flex items-center"
                title="Text Tools"
              >
                <span className="mr-1">📝</span>
                <span>Text</span>
              </Link>
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
              
              {/* Quick Access Tools for Mobile */}
              <div className="py-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Quick Access</div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/unit-converter"
                    className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">📏</span>
                    <span>Unit Converter</span>
                  </Link>
                  <Link
                    href="/encoding"
                    className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">🔐</span>
                    <span>Encoding</span>
                  </Link>
                  <Link
                    href="/json"
                    className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">📋</span>
                    <span>JSON</span>
                  </Link>
                  <Link
                    href="/text"
                    className="text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">📝</span>
                    <span>Text Tools</span>
                  </Link>
                  <Link
                    href="/ai-tools"
                    className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">🤖</span>
                    <span>AI Tools</span>
                  </Link>
                  <Link
                    href="/power"
                    className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-2 rounded-lg text-center font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">⚡</span>
                    <span>Power</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
