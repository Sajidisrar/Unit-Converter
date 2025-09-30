import React from "react";
import { Metadata } from "next";
import { fuelEconomyUnits } from "@/utils/conversions";
import Calculator from "@/components/Calculator";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Fuel Economy Converter - MPG, L/100km, km/L",
  description:
    "Convert fuel economy units including MPG (US and UK), L/100km, and km/L with our easy-to-use Fuel Economy Converter.",
  keywords:
    "fuel economy converter, MPG to L/100km, L/100km to MPG, km/L to MPG, fuel consumption units, US MPG, UK MPG",
  openGraph: {
    title: "Fuel Economy Converter - MPG, L/100km, km/L",
    description:
      "Convert fuel economy units including MPG (US and UK), L/100km, and km/L with our easy-to-use Fuel Economy Converter.",
  },
};

export default function FuelEconomyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-[1fr_minmax(auto,600px)_1fr] gap-4">
        <AdBanner position="side" />
        <main>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Fuel Economy Converter
          </h1>
          <section>
            <Calculator
              title="Fuel Economy Converter"
              units={fuelEconomyUnits}
              conversionType="fuelEconomy"
            />
            <AdBanner position="inline" />
          </section>
          {/* SEO Content Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Fuel Economy Insights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Convert MPG (US/UK), L/100km, and km/L for vehicles and fleet analytics. Combine with <a href="/speed" className="text-indigo-600 dark:text-indigo-400 hover:underline">Speed Converter</a> and <a href="/length" className="text-indigo-600 dark:text-indigo-400 hover:underline">Length Converter</a> for route planning.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Telematics and fleet <b>Data Science</b> pipelines frequently export telemetry via <a href="/developer" className="text-indigo-600 dark:text-indigo-400 hover:underline">json to csv</a> and compress payloads with <a href="/developer" className="text-indigo-600 dark:text-indigo-400 hover:underline">base64 encoding</a> for <b>AI artificial Intelligence</b> models.
            </p>
          </section>
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <dl>
              <dt className="font-semibold text-gray-900 dark:text-white mt-4">
                What is the difference between US MPG and UK MPG?
              </dt>
              <dd className="text-gray-600 dark:text-gray-300 ml-2 mt-1">
                US MPG (miles per gallon) uses the US gallon (3.785 liters), while UK MPG uses the imperial gallon (4.546 liters). UK MPG values are generally higher for the same fuel consumption.
              </dd>
              <dt className="font-semibold text-gray-900 dark:text-white mt-4">
                How do I convert L/100km to MPG?
              </dt>
              <dd className="text-gray-600 dark:text-gray-300 ml-2 mt-1">
                To convert L/100km to MPG, divide 235.215 by the L/100km value for US MPG, or 282.481 by the L/100km value for UK MPG.
              </dd>
              <dt className="font-semibold text-gray-900 dark:text-white mt-4">
                What does km/L mean?
              </dt>
              <dd className="text-gray-600 dark:text-gray-300 ml-2 mt-1">
                Km/L stands for kilometers per liter, indicating how many kilometers a vehicle can travel on one liter of fuel.
              </dd>
            </dl>
          </section>
        </main>
        <AdBanner position="side" />
      </div>
    </div>
  );
}
