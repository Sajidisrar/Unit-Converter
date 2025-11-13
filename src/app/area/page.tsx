import AdBanner from "@/components/AdBanner";
import Calculator from "@/components/Calculator";
import { areaUnits } from "@/utils/conversions";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Area Converter - Square Meters to Square Feet | Free Online Tool",
  description: "Convert between square meters, square feet, acres, hectares, and square yards. Free online area converter for real estate, construction, and land measurement.",
  keywords: "area converter, square meters to square feet, acres to hectares, square yards, area calculator, square meter to acre, square feet to acres, sq ft to sq m, land size conversion",
  openGraph: {
    title: "Area Converter - Square Meters to Square Feet | Free Online Tool",
    description: "Convert between square meters, square feet, acres, hectares, and square yards. Free online area converter for real estate, construction, and land measurement.",
    type: "website",
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/area',
  },
  other: {
    'application/ld+json': [
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Area Converter - Free Online Unit Converter",
        url: "https://freeunitconvertor.com/area",
        applicationCategory: "Calculator",
        operatingSystem: "All",
      }),
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I convert square meters to square feet?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To convert square meters to square feet, multiply the number of square meters by 10.764. For example, 100 m² = 100 × 10.764 = 1,076.4 ft²."
            }
          },
          {
            "@type": "Question",
            name: "How many acres are in a hectare?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "One hectare equals 2.471 acres. A hectare is a metric unit of area equal to 10,000 square meters."
            }
          }
        ]
      })
    ]
  }
};

export default function AreaPage({ searchParams }: { searchParams: { from?: string } }) {
  const defaultFromUnit = searchParams.from || "m2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Area Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Quickly convert between area units such as square meters to square feet, square meters to acres, square feet to acres, hectares to acres, square yards to square meters, and more. This free online area converter is perfect for real estate, land measurement, farming, construction, and education.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="mb-6">
            <AdBanner position="top" />
          </div>
          <div className="grid grid-cols-1 gap-6 items-start">
            <div>
              <Calculator
                title="Area Conversion Tool"
                units={areaUnits}
                conversionType="area"
                initialFromUnit={defaultFromUnit}
              />
              <div className="mt-6">
                <AdBanner position="inline" />
              </div>
            </div>
          </div>

          <section className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-10 my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Area Conversion Formulas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
              Understanding area conversion formulas is essential for real estate, construction, farming, and education. Use our converter above for instant results.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">Real Estate Applications</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
              Area conversion is essential in many practical fields such as real estate, construction, farming, and education.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">Construction & Land Measurement</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Real estate:</strong> 1 acre = 4,047 sq m, 1 hectare = 2.47 acres<br/>
                <strong>Example:</strong> 100 sq m = 1,076.4 sq ft, 1 acre = 43,560 sq ft<br/>
                <strong>For construction:</strong> 1 sq yard = 9 sq ft, 1 sq mile = 640 acres
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
              Area conversion is essential in many practical fields such as real estate, construction, farming, and education.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
              Area conversion is essential in daily life and professional fields. Home buyers often search for how to convert square feet to acres when evaluating land plots. Builders and architects convert square meters to square feet or square yards to estimate construction costs. Farmers use hectares to acres conversion to plan crops. Students use area conversions like square kilometers to square miles in geography and mathematics. Common queries include &quot;meter to acre&quot;, &quot;sq ft to sq m&quot;, and &quot;sq yards to acres&quot;, which this tool solves instantly.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
              For example, when buying land, you might need to convert acres to square meters to understand the size better. In construction, converting between square feet and square yards helps in estimating materials. Farmers often convert hectares to acres for crop planning. Additionally, educators use area conversions to teach students about different measurement systems.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
              Related tasks for technical users include <a href="/developer" className="text-purple-600 dark:text-purple-400 hover:underline">json to csv</a> formatting and <a href="/developer" className="text-purple-600 dark:text-purple-400 hover:underline">base64 encoding</a> when moving geospatial data between systems. These are common in <b>AI artificial Intelligence</b> mapping and <b>Data Science</b> workflows.
            </p>
            <div className="flex space-x-4">
              <Link href="/length" className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                Length Converter
              </Link>
              <Link href="/cooking" className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                Cooking Converter
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Frequently Asked Questions - Area Conversion
            </h2>
            
            <div className="space-y-6">
              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert square meters to square feet?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert square meters to square feet, multiply the number of square meters by 10.764. For example, 100 m² = 100 × 10.764 = 1,076.4 ft².
                </p>
              </details>
              
              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How many acres are in a hectare?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  One hectare equals 2.471 acres. A hectare is a metric unit of area equal to 10,000 square meters.
                </p>
              </details>
              
              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What is the difference between square feet and square yards?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  A square yard is 9 times larger than a square foot. To convert square feet to square yards, divide by 9. To convert square yards to square feet, multiply by 9.
                </p>
              </details>
              
              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How big is an acre?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  An acre is 43,560 square feet or 4,047 square meters. It&apos;s roughly the size of a football field (without the end zones).
                </p>
              </details>
              
              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert square kilometers to square miles?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert square kilometers to square miles, multiply by 0.386102. For example, 100 km² = 100 × 0.386102 = 38.61 square miles.
                </p>
              </details>

              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert square meters to acres?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert square meters to acres, divide the area value by 4,046.86. For example, 10,000 m² ÷ 4,046.86 ≈ 2.47 acres.
                </p>
              </details>

              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert square feet to acres?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert square feet to acres, divide the area value by 43,560. For example, 87,120 sq ft ÷ 43,560 = 2 acres.
                </p>
              </details>

              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert square feet to square meters?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert square feet to square meters, multiply the area value by 0.092903. For example, 500 sq ft × 0.092903 ≈ 46.45 m².
                </p>
              </details>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
