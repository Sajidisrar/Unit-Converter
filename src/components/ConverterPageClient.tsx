"use client";

import AdBanner from "@/components/AdBanner";
import Calculator from "@/components/Calculator";
import { ConversionType } from "@/types/conversions";
import { ReactNode, useEffect, useState } from "react";

interface Unit {
  label: string;
  value: string;
}

interface ConverterPageClientProps {
  title: string;
  subtitle: string;
  units: Unit[];
  conversionType: ConversionType;
  defaultFromUnit?: string;
  seoContent?: ReactNode;
  faqContent?: ReactNode;
}

export default function ConverterPageClient({
  title,
  subtitle,
  units,
  conversionType,
  defaultFromUnit,
  seoContent,
  faqContent,
}: ConverterPageClientProps) {
  // Resolve ?from= on the client. Reading it on the server would opt the whole
  // page out of static rendering for a parameter robots.txt already disallows.
  const [fromUnit, setFromUnit] = useState(defaultFromUnit);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('from');

    if (requested && units.some((unit) => unit.value === requested)) {
      setFromUnit(requested);
    }
  }, [units]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="mb-6">
            <AdBanner position="top" />
          </div>

          <Calculator
            title={`${title} Tool`}
            units={units}
            conversionType={conversionType}
            initialFromUnit={fromUnit || units[0]?.value}
          />

          <div className="mt-8">
            <AdBanner position="inline" />
          </div>

          {seoContent}
          {faqContent}
        </main>
      </div>
    </div>
  );
}
