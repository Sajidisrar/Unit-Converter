import ConverterPageClient from "@/components/ConverterPageClient";
import { speedUnits } from "@/utils/conversions";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Speed Converter - Convert MPH to KPH, Knots | Free Online Tool",
  description: "Convert between miles per hour, kilometers per hour, knots, and meters per second. Free online speed converter for driving, aviation, and sports calculations.",
  keywords: "speed converter, mph to kph, knots to mph, meters per second, speed calculator, velocity converter",
  alternates: {
    canonical: 'https://freeunitconvertor.com/speed',
  },
  openGraph: {
    title: "Speed Converter - Convert MPH to KPH, Knots | Free Online Tool",
    description: "Convert between miles per hour, kilometers per hour, knots, and meters per second. Free online speed converter for driving, aviation, and sports calculations.",
    type: "website",
  },
};

export default function SpeedPage({ searchParams }: { searchParams: { from?: string } }) {
  const defaultFromUnit = searchParams.from || "m/s";

  const seoContent = (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Speed Unit Conversions</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Understanding speed conversions is essential for travel, logistics, and engineering applications. Use our converter above for instant results.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">Driving & Aviation Applications</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Convert MPH, KPH, knots, and m/s for travel, logistics, and engineering. For projects that require distance or time calculations, combine this tool with our <a href="/length" className="text-red-600 dark:text-red-400 hover:underline">Length Converter</a> and <a href="/area" className="text-red-600 dark:text-red-400 hover:underline">Unit converter area</a>.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">Sports & Fitness Calculations</h2>
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Examples:</strong> 60 mph = 96.6 kph, 1 knot = 1.15 mph, 1 m/s = 3.6 kph<br/>
          <strong>For driving:</strong> 70 mph = 112.7 kph, 100 kph = 62.1 mph<br/>
          <strong>For aviation:</strong> 500 knots = 575 mph, 200 m/s = 447 mph
        </p>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Convert MPH, KPH, knots, and m/s for travel, logistics, and engineering. For projects that require distance or time calculations, combine this tool with our <a href="/length" className="text-red-600 dark:text-red-400 hover:underline">Length Converter</a> and <a href="/area" className="text-red-600 dark:text-red-400 hover:underline">Unit converter area</a>.
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        In <b>AI artificial Intelligence</b> and <b>Data Science</b>, telemetry pipelines often rely on <a href="/developer" className="text-red-600 dark:text-red-400 hover:underline">json to csv</a> and <a href="/developer" className="text-red-600 dark:text-red-400 hover:underline">base64 encoding</a> for efficient storage and transfer.
      </p>
    </section>
  );

  const faqContent = (
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
  );

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
      <ConverterPageClient
        title="Speed Converter"
        subtitle="Convert between miles per hour, kilometers per hour, knots, meters per second, and more speed units with our free online converter."
        units={speedUnits}
        conversionType="speed"
        defaultFromUnit={defaultFromUnit}
        seoContent={seoContent}
        faqContent={faqContent}
      />
    </>
  );
}
