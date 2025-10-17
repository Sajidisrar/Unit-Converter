'use client';

import AdBanner from '@/components/AdBanner';
import { ConversionType } from '@/types/conversions';
import { ReactNode } from 'react';

interface ConverterLayoutProps {
  title: string;
  children: ReactNode;
  conversionType: ConversionType;
  description?: string;
  showSideBanners?: boolean;
  className?: string;
}

export default function ConverterLayout({
  title,
  children,
  description,
  showSideBanners = true,
  className = ''
}: ConverterLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className={`max-w-5xl mx-auto px-4 grid gap-4 ${showSideBanners ? 'grid-cols-[1fr_minmax(auto,600px)_1fr]' : 'grid-cols-1 max-w-4xl'} ${className}`}>
        {showSideBanners && (
          <AdBanner position="side" />
        )}
        
        <main>
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </header>

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            {children}
          </section>

          <AdBanner position="inline" />
        </main>

        {showSideBanners && (
          <AdBanner position="side" />
        )}
      </div>
    </div>
  );
}
