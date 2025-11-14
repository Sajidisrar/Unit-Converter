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
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Left side ad */}
          <div className="hidden md:block">
            <AdBanner position="side" />
          </div>

          {/* Center content */}
          <div className="col-span-1 md:col-span-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Fitness Converter - Height, Weight &amp; BMI Calculator
            </h1>

            {/* BMI Calculator */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">BMI Calculator</h2>
              <Calculator title="BMI Calculator" units={[]} conversionType="bmi" />
            </section>

            {/* Height Converter */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Height Converter</h2>
              <Calculator title="Height Converter" units={heightUnits} conversionType="height" />
            </section>

            <AdBanner position="inline" />

            {/* SEO Content Section */}
            {seoContent}

            {/* FAQ Section */}
            {faqContent}
          </div>

          {/* Right side ad */}
          <div className="hidden md:block">
            <AdBanner position="side" />
          </div>
        </div>
      </div>
    </div>
  );
}
