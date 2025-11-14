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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(auto,600px)] gap-4">
        <div className="hidden lg:block">
          <AdBanner position="side" />
        </div>

        <main>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Fuel Economy Converter
          </h1>

          <section>
            <Calculator
              title="Fuel Economy Converter"
              units={units}
              conversionType="fuelEconomy"
            />
            <AdBanner position="inline" />
          </section>

          {content}
        </main>
      </div>
    </div>
  );
}
