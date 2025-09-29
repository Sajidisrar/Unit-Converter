import React from "react";
import { Metadata } from "next";
import { cookingUnits } from "@/utils/conversions";
import Calculator from "@/components/Calculator";
import AdBanner from "@/components/AdBanner";
export const metadata: Metadata = {
  title: "Cooking Unit Converter - Cups, Tablespoons, Grams, Ounces",
  description:
    "Convert cooking units easily with our Cooking Unit Converter. Convert between cups, tablespoons, grams, ounces, and more for accurate cooking measurements.",
  keywords:
    "cooking unit converter, cooking measurements, cups to grams, tablespoons to ounces, cooking conversion, kitchen measurements",
  openGraph: {
    title: "Cooking Unit Converter - Cups, Tablespoons, Grams, Ounces",
    description:
      "Convert cooking units easily with our Cooking Unit Converter. Convert between cups, tablespoons, grams, ounces, and more for accurate cooking measurements.",
  },
};

export default function CookingPage({ searchParams }: { searchParams: { from?: string } }) {
  const defaultFromUnit = searchParams.from || "cup";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">

          <main className="max-w-6xl mx-auto rounded-lg flex-row ">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Cooking Unit Converter
            </h1>
            <AdBanner position="top" className="col-span-2" />
            <section className="mb-6">
              <Calculator
                title="Cooking Unit Converter"
                units={cookingUnits}
                conversionType="cooking"
                initialFromUnit={defaultFromUnit}
              />
              <AdBanner position="top" className="mt-4" />
            </section>
            <section>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">
                      What is the difference between dry and liquid cooking measurements?
                    </dt>
                    <dd className="text-gray-600 dark:text-gray-300">
                      Dry measurements refer to the weight or volume of solid ingredients, while liquid measurements refer to the volume of liquids. Using the correct type ensures accurate recipes.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">
                      How do I convert cups to milliliters?
                    </dt>
                    <dd className="text-gray-600 dark:text-gray-300">
                      One cup is approximately 240 milliliters. Our converter provides precise conversions based on ingredient density.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">
                      Are kitchen unit conversions accurate?
                    </dt>
                    <dd className="text-gray-600 dark:text-gray-300">
                      Kitchen conversions provide approximate values suitable for most recipes. For precise baking or cooking, use a kitchen scale.
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
            
          </main>
          
        </div>
      </div>
    </div>
  );
}
