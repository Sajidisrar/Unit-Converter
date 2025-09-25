import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { areaUnits } from "@/utils/conversions";
import AdBanner from "@/components/AdBanner";
import Head from "next/head";

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

export default function AreaPage() {
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
              url: "https://freeonlineconverters.vercel.app/area",
              applicationCategory: "Calculator",
              operatingSystem: "All",
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
              />

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
              Frequently Asked Questions - Area Conversion
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert square meters to square feet?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert square meters to square feet, multiply the number of square meters by 10.764. For example, 100 m² = 100 × 10.764 = 1,076.4 ft².
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How many acres are in a hectare?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  One hectare equals 2.471 acres. A hectare is a metric unit of area equal to 10,000 square meters.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What is the difference between square feet and square yards?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A square yard is 9 times larger than a square foot. To convert square feet to square yards, divide by 9. To convert square yards to square feet, multiply by 9.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How big is an acre?
                </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    An acre is 43,560 square feet or 4,047 square meters. It&apos;s roughly the size of a football field (without the end zones).
                  </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert square kilometers to square miles?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert square kilometers to square miles, multiply by 0.386102. For example, 100 km² = 100 × 0.386102 = 38.61 square miles.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
