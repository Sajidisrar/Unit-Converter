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
    <div className="page-ground">
      <div className={`mx-auto w-full px-4 ${showSideBanners ? 'max-w-6xl' : 'max-w-4xl'} ${className}`}>
        <div className={`grid gap-4 grid-cols-1 ${showSideBanners ? 'lg:grid-cols-[minmax(0,1fr)_minmax(auto,600px)]' : ''}`}>
          {showSideBanners && (
            <div className="hidden lg:block">
              <AdBanner position="side" />
            </div>
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

          <section className="card-panel p-6 mb-8">
            {children}
          </section>

          <AdBanner position="inline" />
        </main>
        </div>
      </div>
    </div>
  );
}
