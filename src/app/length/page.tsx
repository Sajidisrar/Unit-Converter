import type { Metadata } from "next";
import ConverterPageClient from "@/components/ConverterPageClient";
import { lengthUnits } from "@/utils/conversions";
import StructuredData from "@/components/StructuredData";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Length Converter - Convert Meters, Feet, Inches & More | Unit Converter",
  description: "Convert between different length units including meters, feet, inches, yards, kilometers, and miles. Free online length converter with instant results.",
  keywords: "length converter, meters to feet, inches to cm, yards to meters, kilometers to miles, distance converter",
  alternates: {
    canonical: 'https://freeunitconvertor.com/length',
  },
  openGraph: {
    title: "Length Converter - Convert Meters, Feet, Inches & More",
    description: "Convert between different length units including meters, feet, inches, yards, kilometers, and miles.",
    type: "website",
  },
};

export default function LengthPage({ searchParams }: { searchParams: { from?: string } }) {
  const defaultFromUnit = searchParams.from || "m";

  const faqs = [
    {
      question: "How do I convert meters to feet?",
      answer: "To convert meters to feet, multiply the number of meters by 3.28084. For example, 5 meters = 5 × 3.28084 = 16.404 feet."
    },
    {
      question: "What is the difference between metric and imperial length units?",
      answer: "Metric units (meters, centimeters) are based on the decimal system and are used internationally. Imperial units (feet, inches) are primarily used in the United States and are based on historical measurements."
    },
    {
      question: "How many inches are in a foot?",
      answer: "There are exactly 12 inches in one foot. This is a standard conversion that never changes."
    },
    {
      question: "What is a nautical mile?",
      answer: "A nautical mile is a unit of measurement used in maritime and aviation contexts. It equals approximately 1.852 kilometers or 1.151 statute miles."
    },
    {
      question: "How do I convert kilometers to miles?",
      answer: "To convert kilometers to miles, multiply the number of kilometers by 0.621371. For example, 10 kilometers = 10 × 0.621371 = 6.21371 miles."
    }
  ];

  const seoContent = (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Length Conversion Insights</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Use our Length Converter to switch between meters, feet, inches, and miles with precision. Many users pair length calculations with related tools such as <a href="/area" className="text-blue-600 dark:text-blue-400 hover:underline">Unit converter area</a> and <a href="/weight" className="text-blue-600 dark:text-blue-400 hover:underline">Unit converter weight</a> for complete project planning.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Developers often work with <a href="/developer" className="text-blue-600 dark:text-blue-400 hover:underline">base64 encoding</a> and <a href="/developer" className="text-blue-600 dark:text-blue-400 hover:underline">json to csv</a> while building data pipelines. These topics are common in <b>AI artificial Intelligence</b> and <b>Data Science</b> workflows where measurement data needs to be transformed, validated, and visualized.
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Tip: For mapping, architecture, and engineering, convert distances and then calculate areas, volumes, and weights using our specialized converters.
      </p>
    </section>
  );

  const faqContent = (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Frequently Asked Questions - Length Conversion
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            How do I convert meters to feet?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            To convert meters to feet, multiply the number of meters by 3.28084. For example, 5 meters = 5 × 3.28084 = 16.404 feet.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            What is the difference between metric and imperial length units?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Metric units (meters, centimeters) are based on the decimal system and are used internationally. Imperial units (feet, inches) are primarily used in the United States and are based on historical measurements.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            How many inches are in a foot?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            There are exactly 12 inches in one foot. This is a standard conversion that never changes.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            What is a nautical mile?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            A nautical mile is a unit of measurement used in maritime and aviation contexts. It equals approximately 1.852 kilometers or 1.151 statute miles.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            How do I convert kilometers to miles?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            To convert kilometers to miles, multiply the number of kilometers by 0.621371. For example, 10 kilometers = 10 × 0.621371 = 6.21371 miles.
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
              "name": "Length Converter - Unit Converter",
              "url": "https://freeunitconvertor.com",
              "applicationCategory": "Calculator",
              "operatingSystem": "All"
            }),
          }}
        />
      </Head>
      <StructuredData faqs={faqs} />
      <ConverterPageClient
        title="Length Converter"
        subtitle="Convert between meters, feet, inches, yards, kilometers, miles, and more length units with our free online converter."
        units={lengthUnits}
        conversionType="length"
        defaultFromUnit={defaultFromUnit}
        seoContent={seoContent}
        faqContent={faqContent}
      />
    </>
  );
}
