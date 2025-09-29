import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { temperatureUnits } from "@/utils/conversions";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Temperature Converter - Convert Celsius, Fahrenheit, Kelvin | Unit Converter",
  description: "Convert between Celsius, Fahrenheit, and Kelvin temperature scales. Free online temperature converter with instant results and conversion formulas.",
  keywords: "temperature converter, celsius to fahrenheit, fahrenheit to celsius, kelvin converter, temperature scale",
  openGraph: {
    title: "Temperature Converter - Convert Celsius, Fahrenheit, Kelvin",
    description: "Convert between Celsius, Fahrenheit, and Kelvin temperature scales with our free online converter.",
    type: "website",
  },
};

export default function TemperaturePage({ searchParams }: { searchParams: { from?: string } }) {
  const defaultFromUnit = searchParams.from || "c";

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Temperature Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between Celsius, Fahrenheit, and Kelvin temperature scales with our free online converter.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-6 items-start">
            <div className="">
              <AdBanner position="top" />
            </div>
            <div>
              <Calculator
                title="Temperature Conversion Tool"
                units={temperatureUnits}
                conversionType="temperature"
                initialFromUnit={defaultFromUnit}
              />

              <div className="mt-6">
                <AdBanner position="inline" />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Frequently Asked Questions - Temperature Conversion
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert Celsius to Fahrenheit?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert Celsius to Fahrenheit, multiply by 9/5 and add 32. Formula: °F = (°C × 9/5) + 32. For example, 25°C = (25 × 9/5) + 32 = 77°F.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert Fahrenheit to Celsius?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert Fahrenheit to Celsius, subtract 32 and multiply by 5/9. Formula: °C = (°F - 32) × 5/9. For example, 68°F = (68 - 32) × 5/9 = 20°C.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What is absolute zero?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Absolute zero is the lowest possible temperature, where all molecular motion stops. It&apos;s 0 Kelvin (-273.15°C or -459.67°F).
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How do I convert Celsius to Kelvin?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To convert Celsius to Kelvin, simply add 273.15. Formula: K = °C + 273.15. For example, 25°C = 25 + 273.15 = 298.15K.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What temperature is room temperature?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Room temperature is typically around 20-22°C (68-72°F). This is the comfortable temperature range for most indoor environments.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
