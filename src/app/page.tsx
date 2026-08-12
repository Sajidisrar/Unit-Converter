import AdBanner from "@/components/AdBanner";
import { allTools } from "@/constants/tools";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Analytics />
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Free Online Unit Converter
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Convert <strong>length, weight, temperature, area, speed, power, cooking measurements</strong> and more.
              Fast, accurate, and free unit conversion tools for engineers, students, and professionals.
            </p>
          </header>

          {/* Ad Banner - Top */}
          <div className="max-w-[1600px] mx-auto mb-6">
            <AdBanner position="top" />
          </div>

          {/* Converter Tools Grid */}
          <main className="max-w-[1600px] mx-auto">
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {allTools.map((tool, index) => (
                  <Link
                    key={index}
                    href={tool.url}
                    className="group card card-interactive p-6 h-full flex flex-col"
                  >
                    <div className="text-center flex flex-col h-full">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {tool.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Fast & Free</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Instant results, no registration</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Accurate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Industry-standard conversion factors</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📱</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Mobile Friendly</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Works on all devices</p>
                </div>
              </div>
            </section>

            {/* Use Cases */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Unit Conversions for Every Need
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🏭 Engineering</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Convert between metric and imperial units for mechanical, electrical, and civil engineering projects.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/unit-converter" className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">Length</Link>
                    <Link href="/unit-converter" className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">Weight</Link>
                    <Link href="/power" className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">Power</Link>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">⚡ Energy & Home</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Calculate electricity costs, convert power units, and estimate appliance energy consumption.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/power" className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-700 transition-colors">Power</Link>
                    <Link href="/electricity-consumption" className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-700 transition-colors">Electricity</Link>
                  </div>
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🍳 Cooking & Food</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Convert cups to grams, tablespoons to millilitres, and scale recipes between measurement systems.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/cooking" className="text-xs bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-1 rounded hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors">Cooking</Link>
                    <Link href="/unit-converter" className="text-xs bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-1 rounded hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors">Weight</Link>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">💪 Health & Fitness</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Calculate BMI, convert height and weight between metric and imperial systems.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/fitness" className="text-xs bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 px-2 py-1 rounded hover:bg-orange-200 dark:hover:bg-orange-700 transition-colors">BMI Calculator</Link>
                    <Link href="/unit-converter" className="text-xs bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 px-2 py-1 rounded hover:bg-orange-200 dark:hover:bg-orange-700 transition-colors">Weight</Link>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🚗 Automotive</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Convert fuel economy between MPG, L/100km, and km/L. Compare vehicle efficiency across regions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/fuel-economy" className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors">Fuel Economy</Link>
                    <Link href="/unit-converter" className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors">Speed</Link>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🎓 Education</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Learn unit conversions with instant results. Great for science, maths, and engineering students.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/unit-converter" className="text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors">Temperature</Link>
                    <Link href="/unit-converter" className="text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors">Speed</Link>
                    <Link href="/unit-converter" className="text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors">Area</Link>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* SEO Content */}
          <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Popular Unit Conversions
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">📏 Length & Distance</h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>&#8226; <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Metres to Feet</Link> - Convert m to ft and back</li>
                    <li>&#8226; <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Inches to Centimetres</Link> - Convert in to cm</li>
                    <li>&#8226; <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Kilometres to Miles</Link> - Convert km to mi</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">⚖️ Weight & Mass</h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>&#8226; <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Kilograms to Pounds</Link> - Convert kg to lbs</li>
                    <li>&#8226; <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Ounces to Grams</Link> - Convert oz to g</li>
                    <li>&#8226; <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Stones to Kilograms</Link> - Convert st to kg</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">🌡️ Temperature</h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>&#8226; <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Celsius to Fahrenheit</Link> - Convert C to F</li>
                    <li>&#8226; <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Fahrenheit to Celsius</Link> - Convert F to C</li>
                    <li>&#8226; <Link href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Kelvin Converter</Link> - Convert K to C/F</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">⚡ Power & Energy</h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>&#8226; <Link href="/power" className="text-blue-600 dark:text-blue-400 hover:underline">Watts to Horsepower</Link> - Convert W to HP</li>
                    <li>&#8226; <Link href="/power" className="text-blue-600 dark:text-blue-400 hover:underline">Kilowatts to Watts</Link> - Convert kW to W</li>
                    <li>&#8226; <Link href="/electricity-consumption" className="text-blue-600 dark:text-blue-400 hover:underline">Electricity Calculator</Link> - Estimate energy costs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
