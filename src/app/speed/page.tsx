import Head from "next/head";
import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { speedUnits } from "@/utils/conversions";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Speed Converter - Convert MPH, KPH, Knots & More | Unit Converter",
  description: "Convert between different speed units including miles per hour, kilometers per hour, knots, meters per second, and feet per second. Free online speed converter.",
  keywords: "speed converter, mph to kph, knots to mph, meters per second, speed calculator, velocity converter",
  openGraph: {
    title: "Speed Converter - Convert MPH, KPH, Knots & More",
    description: "Convert between different speed units including miles per hour, kilometers per hour, knots, and meters per second.",
    type: "website",
  },
};

export default function SpeedPage({ searchParams }: { searchParams: { from?: string } }) {
  const defaultFromUnit = searchParams.from || "m/s";

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Speed Converter",
              "url": "https://freeunitconvertor.com",
              "applicationCategory": "Calculator",
              "operatingSystem": "All",
            }),
          }}
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Speed Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between miles per hour, kilometers per hour, knots, meters per second, and more speed units with our free online converter.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-6 items-start">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>
            <div>
              <Calculator
                title="Speed Conversion Tool"
                units={speedUnits}
                conversionType="speed"
                initialFromUnit={defaultFromUnit}
              />

              <div className="mt-6">
                <AdBanner position="inline" />
              </div>
            </div>
          </div>

          {/* SEO Content Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Speed Conversion Insights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Convert MPH, KPH, knots, and m/s for travel, logistics, and engineering. For projects that require distance or time calculations, combine this tool with our <a href="/length" className="text-red-600 dark:text-red-400 hover:underline">Length Converter</a> and <a href="/area" className="text-red-600 dark:text-red-400 hover:underline">Unit converter area</a>.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              In <b>AI artificial Intelligence</b> and <b>Data Science</b>, telemetry pipelines often rely on <a href="/developer" className="text-red-600 dark:text-red-400 hover:underline">json to csv</a> and <a href="/developer" className="text-red-600 dark:text-red-400 hover:underline">base64 encoding</a> for efficient storage and transfer.
            </p>
          </section>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Frequently Asked Questions - Speed Conversion
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert miles per hour to kilometers per hour?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert MPH to KPH, multiply the speed in miles per hour by 1.60934. For example, 60 MPH = 60 × 1.60934 = 96.56 KPH.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What is a knot in speed measurement?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A knot is a unit of speed equal to one nautical mile per hour. It&apos;s commonly used in maritime and aviation contexts. 1 knot = 1.15078 MPH.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert meters per second to miles per hour?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert m/s to MPH, multiply by 2.23694. For example, 10 m/s = 10 × 2.23694 = 22.37 MPH.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What is Mach speed?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mach is a unit of speed relative to the speed of sound. Mach 1 equals the speed of sound (approximately 343 m/s or 767 MPH at sea level).
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How fast is the speed of light?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The speed of light is approximately 299,792,458 meters per second (about 186,282 miles per second or 670,616,629 MPH).
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
