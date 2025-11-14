import FuelEconomyPageClient from "@/components/FuelEconomyPageClient";
import { fuelEconomyUnits } from "@/utils/conversions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Economy Converter - MPG to L/100km | Free Online Tool",
  description:
    "Convert MPG to L/100km, L/100km to MPG, km/L to MPG instantly. Free fuel economy converter for cars, trucks, and vehicles. Accurate calculations with real-world examples.",
  keywords:
    "fuel economy converter, MPG to L/100km, L/100km to MPG, km/L to MPG, fuel consumption units, US MPG, UK MPG",
  alternates: {
    canonical: 'https://freeunitconvertor.com/fuel-economy',
  },
  openGraph: {
    title: "Fuel Economy Converter - MPG to L/100km | Free Online Tool",
    description:
      "Convert MPG to L/100km, L/100km to MPG, km/L to MPG instantly. Free fuel economy converter for cars, trucks, and vehicles.",
  },
};

export default function FuelEconomyPage() {
  const content = (
    <>
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How to Convert MPG to L/100km</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Converting between MPG and L/100km is essential for comparing fuel efficiency across different regions. Use our converter above for instant results.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">Understanding Fuel Economy Units</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Different countries use different fuel economy measurements. Understanding these units helps you compare vehicles and plan fuel costs accurately.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">Real-World Examples</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Example: 10L per 100km to MPG</strong><br/>
                10L per 100km = 23.5 MPG (US) = 28.2 MPG (UK)<br/>
                6L per 100km = 39.2 MPG (US) = 47.1 MPG (UK)
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Convert MPG (US/UK), L/100km, and km/L for vehicles and fleet analytics. Combine with <a href="/speed" className="text-indigo-600 dark:text-indigo-400 hover:underline">Speed Converter</a> and <a href="/length" className="text-indigo-600 dark:text-indigo-400 hover:underline">Length Converter</a> for route planning.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Telematics and fleet <b>Data Science</b> pipelines frequently export telemetry via <a href="/developer" className="text-indigo-600 dark:text-indigo-400 hover:underline">json to csv</a> and compress payloads with <a href="/developer" className="text-indigo-600 dark:text-indigo-400 hover:underline">base64 encoding</a> for <b>AI artificial Intelligence</b> models.
            </p>
          </section>
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <dl>
              <dt className="font-semibold text-gray-900 dark:text-white mt-4">
                What is the difference between US MPG and UK MPG?
              </dt>
              <dd className="text-gray-600 dark:text-gray-300 ml-2 mt-1">
                US MPG (miles per gallon) uses the US gallon (3.785 liters), while UK MPG uses the imperial gallon (4.546 liters). UK MPG values are generally higher for the same fuel consumption.
              </dd>
              <dt className="font-semibold text-gray-900 dark:text-white mt-4">
                How do I convert L/100km to MPG?
              </dt>
              <dd className="text-gray-600 dark:text-gray-300 ml-2 mt-1">
                To convert L/100km to MPG, divide 235.215 by the L/100km value for US MPG, or 282.481 by the L/100km value for UK MPG.
              </dd>
              <dt className="font-semibold text-gray-900 dark:text-white mt-4">
                What does km/L mean?
              </dt>
              <dd className="text-gray-600 dark:text-gray-300 ml-2 mt-1">
                Km/L stands for kilometers per liter, indicating how many kilometers a vehicle can travel on one liter of fuel.
              </dd>
            </dl>
          </section>
    </>
  );

  return <FuelEconomyPageClient units={fuelEconomyUnits} content={content} />;
}
