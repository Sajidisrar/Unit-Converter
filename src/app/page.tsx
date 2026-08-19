import AdBanner from "@/components/AdBanner";
import { popularConversions, toolsByCategory } from "@/constants/tools";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Analytics />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Free Online Unit Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Convert <strong>length, weight, temperature, volume, energy, pressure</strong> and more.
            Accurate conversions with the working shown, free and without registration.
          </p>
        </header>

        <div className="max-w-[1600px] mx-auto mb-6">
          <AdBanner position="top" />
        </div>

        <main className="max-w-[1600px] mx-auto">
          {/* Tools, grouped by the registry so this can never drift from the nav */}
          {toolsByCategory.map((category) => (
            <section key={category.id} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {category.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.url}
                    href={tool.url}
                    className="group card card-interactive p-6 h-full flex flex-col"
                  >
                    <div className="text-4xl mb-3" aria-hidden="true">{tool.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* Popular conversion pairs. These point at the dedicated pages -- the
              anchor text and the destination now describe the same thing. */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Popular Conversions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Dedicated pages with the formula, a worked example and a reference table.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularConversions.map((pair) => (
                <li key={pair.url}>
                  <Link
                    href={pair.url}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span aria-hidden="true">→</span>
                    {pair.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2" aria-hidden="true">⚡</div>
                <h2 className="font-semibold text-gray-800 dark:text-white mb-1">Fast and free</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Results as you type, no registration
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2" aria-hidden="true">🎯</div>
                <h2 className="font-semibold text-gray-800 dark:text-white mb-1">Exact factors</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Definitional constants, unit tested
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2" aria-hidden="true">📱</div>
                <h2 className="font-semibold text-gray-800 dark:text-white mb-1">Works anywhere</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Mobile, tablet and desktop
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              About unit conversion
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 max-w-3xl">
              <p>
                Almost every conversion on this site works the same way: the value is converted
                into a base unit, then out again into the target unit. Length runs through metres,
                mass through kilograms, volume through litres. Doing it this way means each unit
                needs only one number defining it, and any pair of units can be converted without
                a separate rule for every combination.
              </p>
              <p>
                Temperature is the exception. Celsius and Fahrenheit have different zero points as
                well as different degree sizes, so converting between them needs an offset as well
                as a ratio. That is why{" "}
                <Link href="/celsius-to-fahrenheit" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Celsius to Fahrenheit
                </Link>{" "}
                is <code className="text-sm">°C × 9/5 + 32</code> rather than a single
                multiplication, and it is the most common mistake in hand conversions.
              </p>
              <p>
                Where a unit is defined exactly, this site uses the exact figure rather than a
                rounded one. A foot is precisely 0.3048 metres, a pound is precisely 0.45359237
                kilograms, and an inch is precisely 2.54 centimetres. Those definitions were fixed
                by international agreement in 1959, and using the rounded versions introduces
                error that compounds over repeated conversions.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
