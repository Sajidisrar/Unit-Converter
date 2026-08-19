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
    <div className="page-ground">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Fitness Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your BMI, convert height between metric and imperial, and track your fitness measurements.
          </p>
        </header>

        <main>
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
