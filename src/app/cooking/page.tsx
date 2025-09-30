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
      <div className="container mx-auto px-4 py-8">
        <main className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Cooking Unit Converter
            </h1>
            <div className="mb-6">
              <AdBanner position="top" />
            </div>
            <section className="mb-6">
              <Calculator
                title="Cooking Unit Converter"
                units={cookingUnits}
                conversionType="cooking"
                initialFromUnit={defaultFromUnit}
              />
              <div className="mt-6">
                <AdBanner position="inline" />
              </div>
            </section>
            {/* SEO Content Section */}
            <section className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-10 my-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                About Cooking Conversions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
                Cooking conversions are essential for following recipes from different countries and cultures. Whether you&apos;re baking a cake, preparing a traditional dish, or scaling recipes up or down, accurate measurements ensure consistent results.
              </p>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
                For example, when following European recipes, you might need to convert grams to cups for flour. American recipes often use cups and tablespoons, while European recipes prefer metric measurements. Professional chefs often use weight measurements for precision, while home cooks typically use volume measurements.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/weight" className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                  Weight Converter
                </a>
                <a href="/temperature" className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                  Temperature Converter
                </a>
                <a href="/fitness" className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                  Fitness Converter
                </a>
              </div>
            </section>

            <section>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Note: Gram (g) assumes water-equivalent density for volume-to-weight conversions.</p>
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
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">
                      How do I convert tablespoons to grams?
                    </dt>
                    <dd className="text-gray-600 dark:text-gray-300">
                      The conversion depends on the ingredient. For water, 1 tablespoon = 15 grams. For flour, 1 tablespoon = 8-9 grams. Use our converter for accurate measurements.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">
                      What&apos;s the difference between US and metric cups?
                    </dt>
                    <dd className="text-gray-600 dark:text-gray-300">
                      A US cup is 240ml, while a metric cup is 250ml. Our converter uses US measurements. For precise baking, always use the same measurement system throughout your recipe.
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
            
        </main>
      </div>
    </div>
  );
}
