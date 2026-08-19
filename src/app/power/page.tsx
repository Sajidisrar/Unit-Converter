import ConverterPageClient from "@/components/ConverterPageClient";
import { powerUnits } from "@/utils/conversions";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Power Converter - Convert Watts, Horsepower, BTU/h & More | Unit Converter",
  description: "Convert between different power units including watts, kilowatts, horsepower, BTU per hour, and more. Free online power converter for electrical engineering, automotive, and energy calculations.",
  keywords: "power converter, watt to horsepower, kilowatt to watt, BTU per hour converter, power unit conversion, electrical power, energy conversion, horsepower calculator, watt calculator",
  openGraph: {
    title: "Power Converter - Convert Watts, Horsepower, BTU/h & More",
    description: "Convert between different power units including watts, kilowatts, horsepower, BTU per hour, and more. Perfect for electrical engineering and energy calculations.",
    type: "website",
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/power',
  },
  other: {
    'application/ld+json': [
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Power Converter - Free Online Unit Converter",
        url: "https://freeunitconvertor.com/power",
        applicationCategory: "Calculator",
        operatingSystem: "All",
      }),
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I convert watts to horsepower?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To convert watts to horsepower, divide the number of watts by 745.7. For example, 1000 watts = 1000 ÷ 745.7 = 1.34 horsepower."
            }
          },
          {
            "@type": "Question",
            name: "What is the difference between mechanical and metric horsepower?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mechanical horsepower (hp) equals 745.7 watts, while metric horsepower equals 735.5 watts. The metric version is slightly smaller and is commonly used in Europe."
            }
          }
        ]
      })
    ]
  }
};

export default function PowerPage() {
  const defaultFromUnit = "W";

  const seoContent = (
    <section className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-10 my-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
        About Power Conversion
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
        Power conversion is essential in electrical engineering, automotive industry, and energy management. Understanding different power units helps in designing electrical systems, calculating energy consumption, and comparing equipment specifications.
      </p>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
        Common power conversions include watts to horsepower for automotive applications, kilowatts to watts for electrical calculations, and BTU per hour for heating and cooling systems. Engineers often need to convert between metric and imperial power units when working with international equipment specifications.
      </p>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
        For example, when sizing electrical equipment, you might need to convert horsepower to watts to determine the correct wire gauge. In renewable energy projects, converting between kilowatts and megawatts helps in capacity planning. HVAC professionals frequently convert between watts and BTU per hour for heating and cooling calculations.
      </p>
      <div className="flex space-x-4">
        <Link href="/electricity-consumption" className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
          Electricity Consumption Calculator
        </Link>
        <Link href="/unit-converter" className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
          Unit Converter
        </Link>
      </div>
    </section>
  );

  const faqContent = (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Frequently Asked Questions - Power Conversion
      </h2>

      <div className="space-y-6">
        <details>
          <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            How do I convert watts to horsepower?
          </summary>
          <p className="text-gray-600 dark:text-gray-300">
            To convert watts to horsepower, divide the number of watts by 745.7. For example, 1000 watts = 1000 ÷ 745.7 = 1.34 horsepower.
          </p>
        </details>

        <details>
          <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            What is the difference between mechanical and metric horsepower?
          </summary>
          <p className="text-gray-600 dark:text-gray-300">
            Mechanical horsepower (hp) equals 745.7 watts, while metric horsepower equals 735.5 watts. The metric version is slightly smaller and is commonly used in Europe.
          </p>
        </details>

        <details>
          <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            How do I convert kilowatts to watts?
          </summary>
          <p className="text-gray-600 dark:text-gray-300">
            To convert kilowatts to watts, multiply the number of kilowatts by 1000. For example, 2.5 kW = 2.5 × 1000 = 2500 watts.
          </p>
        </details>

        <details>
          <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            What is BTU per hour used for?
          </summary>
          <p className="text-gray-600 dark:text-gray-300">
            BTU per hour is commonly used in heating, ventilation, and air conditioning (HVAC) systems to measure heating and cooling capacity. It&apos;s also used in energy efficiency ratings for appliances.
          </p>
        </details>

        <details>
          <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            How do I convert watts to BTU per hour?
          </summary>
          <p className="text-gray-600 dark:text-gray-300">
            To convert watts to BTU per hour, multiply the number of watts by 3.412. For example, 1000 watts = 1000 × 3.412 = 3412 BTU/h.
          </p>
        </details>

        <details>
          <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            What is the relationship between power and energy?
          </summary>
          <p className="text-gray-600 dark:text-gray-300">
            Power is the rate at which energy is transferred or consumed. Energy equals power multiplied by time. For example, 1 kilowatt-hour (kWh) equals 1 kilowatt of power used for 1 hour.
          </p>
        </details>
      </div>
    </div>
  );

  return (
    <ConverterPageClient
      title="Power Converter"
      subtitle="Convert between different power units such as watts to horsepower, kilowatts to watts, BTU per hour, and more. Essential for electrical engineering, automotive, and energy calculations."
      units={powerUnits}
      conversionType="power"
      defaultFromUnit={defaultFromUnit}
      seoContent={seoContent}
      faqContent={faqContent}
      toolUrl="/power"
    />
  );
}
