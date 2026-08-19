"use client";

import AdBanner from "@/components/AdBanner";
import Calculator from "@/components/Calculator";
import { ReactNode } from "react";

interface Unit {
  label: string;
  value: string;
}

interface FuelEconomyPageClientProps {
  units: Unit[];
  content: ReactNode;
}

export default function FuelEconomyPageClient({ units, content }: FuelEconomyPageClientProps) {
  return (
    <div className="page-ground">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Fuel Economy Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between MPG (US/UK), L/100km, and km/L. Compare vehicle fuel efficiency across different measurement systems.
          </p>
        </header>

        <main>
          <div className="mb-6">
            <AdBanner position="top" />
          </div>

          <Calculator
            title="Fuel Economy Converter"
            units={units}
            conversionType="fuelEconomy"
          />

          <div className="mt-8">
            <AdBanner position="inline" />
          </div>

          {content}
        </main>
      </div>
    </div>
  );
}
