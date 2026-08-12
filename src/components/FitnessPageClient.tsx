"use client";

import AdBanner from "@/components/AdBanner";
import Calculator from "@/components/Calculator";
import { ReactNode } from "react";

interface Unit {
  label: string;
  value: string;
}

interface FitnessPageClientProps {
  heightUnits: Unit[];
  seoContent: ReactNode;
  faqContent: ReactNode;
}

export default function FitnessPageClient({ heightUnits, seoContent, faqContent }: FitnessPageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Fitness Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your BMI, convert height between metric and imperial, and track your fitness measurements.
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="mb-6">
            <AdBanner position="top" />
          </div>

          {/* BMI Calculator */}
          <section className="mb-8">
            <Calculator title="BMI Calculator" units={[]} conversionType="bmi" />
          </section>

          {/* Height Converter */}
          <section className="mb-8">
            <Calculator title="Height Converter" units={heightUnits} conversionType="height" />
          </section>

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
