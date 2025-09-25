import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { weightUnits } from "@/utils/conversions";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Weight Converter - Convert Kilograms, Pounds, Ounces & More | Unit Converter",
  description: "Convert between different weight units including kilograms, pounds, ounces, grams, tons, and stones. Free online weight converter with instant results.",
  keywords: "weight converter, kg to lbs, pounds to kg, ounces to grams, tons to kg, mass converter",
  openGraph: {
    title: "Weight Converter - Convert Kilograms, Pounds, Ounces & More",
    description: "Convert between different weight units including kilograms, pounds, ounces, grams, tons, and stones.",
    type: "website",
  },
};

export default function WeightPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Weight Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between kilograms, pounds, ounces, grams, tons, stones, and more weight units with our free online converter.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6 items-start">
            <div className="hidden lg:block">
              <AdBanner position="side" />
            </div>
            <div>
              <Calculator
                title="Weight Conversion Tool"
                units={weightUnits}
                conversionType="weight"
              />

              {/* Inline Ad below calculator for additional placement if desired */}
              <div className="mt-6">
                <AdBanner position="inline" />
              </div>
            </div>
            <div className="hidden lg:block">
              <AdBanner position="side" />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Frequently Asked Questions - Weight Conversion
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert kilograms to pounds?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert kilograms to pounds, multiply the number of kilograms by 2.20462. For example, 70 kg = 70 × 2.20462 = 154.32 pounds.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What is the difference between weight and mass?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mass is a measure of the amount of matter in an object, while weight is the force exerted on that object by gravity. On Earth, they are often used interchangeably, but weight can vary with gravity.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How many ounces are in a pound?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  There are exactly 16 ounces in one pound. This is a standard conversion in the imperial system.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What is a stone in weight measurement?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A stone is a British imperial unit of weight equal to 14 pounds. It&apos;s commonly used in the UK and Ireland for measuring body weight.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert grams to ounces?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert grams to ounces, divide the number of grams by 28.3495. For example, 100 grams = 100 ÷ 28.3495 = 3.527 ounces.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
