import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { weightUnits } from "@/utils/conversions";
import AdBanner from "@/components/AdBanner";
import StructuredData from "@/components/StructuredData";
import Head from "next/head";

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

export default function WeightPage({ searchParams }: { searchParams: { from?: string } }) {
  const defaultFromUnit = searchParams.from || "kg";

  const faqs = [
    {
      question: "How do I convert kilograms to pounds?",
      answer: "To convert kilograms to pounds, multiply the number of kilograms by 2.20462. For example, 70 kg = 70 × 2.20462 = 154.32 pounds."
    },
    {
      question: "What is the difference between weight and mass?",
      answer: "Mass is a measure of the amount of matter in an object, while weight is the force exerted on that object by gravity. On Earth, they are often used interchangeably, but weight can vary with gravity."
    },
    {
      question: "How many ounces are in a pound?",
      answer: "There are exactly 16 ounces in one pound. This is a standard conversion in the imperial system."
    },
    {
      question: "What is a stone in weight measurement?",
      answer: "A stone is a British imperial unit of weight equal to 14 pounds. It&apos;s commonly used in the UK and Ireland for measuring body weight."
    },
    {
      question: "How do I convert grams to ounces?",
      answer: "To convert grams to ounces, divide the number of grams by 28.3495. For example, 100 grams = 100 ÷ 28.3495 = 3.527 ounces."
    }
  ];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Weight Converter - Free Online Unit Converter",
              "url": "https://freeunitconvertor.com/weight",
              "applicationCategory": "Calculator",
              "operatingSystem": "All",
            }),
          }}
        />
      </Head>
      <StructuredData faqs={faqs} />
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
          <div className="grid grid-cols-1 gap-6 items-start">
            <div className="lg:block">
              <AdBanner position="top" />
            </div>
            <div>
              <Calculator
                title="Weight Conversion Tool"
                units={weightUnits}
                conversionType="weight"
                initialFromUnit={defaultFromUnit}
              />

              {/* Inline Ad below calculator for additional placement if desired */}
              <div className="mt-6">
                <AdBanner position="inline" />
              </div>
            </div>
          </div>

          {/* SEO Content Section */}
          <section className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-10 my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              About Weight Conversion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
              Weight conversion is essential in many practical applications including cooking, shipping, health monitoring, and international trade. Understanding different weight units helps ensure accuracy in recipes, package shipping, and medical measurements.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
              For example, when cooking, you might need to convert grams to ounces for international recipes. In shipping, converting between kilograms and pounds helps determine shipping costs. Healthcare professionals often convert between metric and imperial units for patient records. Additionally, fitness enthusiasts track their weight in different units depending on their location and preference.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/cooking" className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Cooking Converter
              </a>
              <a href="/fitness" className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Fitness Converter
              </a>
              <a href="/temperature" className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Temperature Converter
              </a>
            </div>
          </section>

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

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What is the metric ton vs imperial ton?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A metric ton (tonne) equals 1,000 kilograms, while an imperial ton equals 2,000 pounds (approximately 907.18 kg). The metric ton is used internationally, while the imperial ton is used in the US.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How accurate are weight conversions?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our weight conversions use precise conversion factors and are accurate to multiple decimal places. For most practical purposes, the conversions are exact, but for scientific applications, always verify the specific conversion factors needed.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
