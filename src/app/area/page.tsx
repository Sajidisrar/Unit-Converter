import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { areaUnits } from "@/utils/conversions";
import AdBanner from "@/components/AdBanner";
import Head from "next/head";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Area Converter - Convert Square Meters, Square Feet, Acres & More | Unit Converter",
  description: "Convert between different area units including square meters, square feet, acres, hectares, square yards, and square kilometers. Free online area converter.",
  keywords: "area converter, square meters to square feet, acres to hectares, square yards, area calculator",
  openGraph: {
    title: "Area Converter - Convert Square Meters, Square Feet, Acres & More",
    description: "Convert between different area units including square meters, square feet, acres, hectares, and square yards.",
    type: "website",
  },
};

export default function AreaPage({ searchParams }: { searchParams: { from?: string } }) {
  const defaultFromUnit = searchParams.from || "m2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Area Converter - Free Online Unit Converter",
              url: "https://freeunitconvertor.com",
              applicationCategory: "Calculator",
              operatingSystem: "All",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Area Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between square meters, square feet, acres, hectares, square yards, and more area units with our free online converter.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6 items-start">
            <div className="hidden lg:block">
              <AdBanner position="side" />
            </div>
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
            <div className="hidden lg:block">
              <AdBanner position="side" />
            </div>
          </div>

          <section className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-10 my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              About Area Conversion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
              Area conversion is essential in many practical fields such as real estate, construction, farming, and education.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
              For example, when buying land, you might need to convert acres to square meters to understand the size better. In construction, converting between square feet and square yards helps in estimating materials. Farmers often convert hectares to acres for crop planning. Additionally, educators use area conversions to teach students about different measurement systems.
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
