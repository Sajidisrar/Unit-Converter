import AdBanner from "@/components/AdBanner";
import HeroConverter from "@/components/HeroConverter";
import { popularConversions, toolsByCategory } from "@/constants/tools";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page-ground">
      <div className="container mx-auto px-4 py-10 sm:py-16">
        {/* Split hero: the converter is usable above the fold rather than being
            one more link on a directory page. */}
        <section className="grid lg:grid-cols-[1.05fr_minmax(0,26rem)] gap-10 lg:gap-14 items-start mb-16">
          <div>
            <p className="inline-flex items-center rounded-full border border-[var(--border-subtle)] px-4 py-1.5 text-sm text-gray-600 dark:text-gray-300 mb-6">
              Metric and imperial conversions without the clutter
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-gray-900 dark:text-white mb-6">
              Every conversion you need, with the working shown.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mb-8">
              Twelve converters and a set of dedicated pages for the conversions people
              actually look up. Exact definitional factors, unit tested, and no sign-up.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#converters" className="btn-accent px-6 py-3">
                Browse converters
              </a>
              <Link href="/unit-converter" className="btn-ghost-outline px-6 py-3">
                Open the unit converter
              </Link>
            </div>

            <dl className="grid grid-cols-3 gap-4 mt-10 max-w-lg">
              <div className="card-nested p-4">
                <dt className="eyebrow mb-1">Converters</dt>
                <dd className="text-2xl font-bold text-gray-900 dark:text-white">12</dd>
              </div>
              <div className="card-nested p-4">
                <dt className="eyebrow mb-1">Guides</dt>
                <dd className="text-2xl font-bold text-gray-900 dark:text-white">10</dd>
              </div>
              <div className="card-nested p-4">
                <dt className="eyebrow mb-1">Sign-up</dt>
                <dd className="text-2xl font-bold text-gray-900 dark:text-white">None</dd>
              </div>
            </dl>
          </div>

          <HeroConverter />
        </section>

        <AdBanner position="top" />

        {/* Every tool in one dense grid. Four of the six categories hold a
            single tool, so a section each left large empty rows. */}
        <section id="converters" className="card-panel p-6 sm:p-10 my-12 scroll-mt-24">
          <p className="eyebrow mb-2">All tools</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            Pick a converter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Each tool page carries the formula, a reference table and answers to the
            questions people ask about those units.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {toolsByCategory.flatMap((category) =>
              category.tools.map((tool) => (
                <Link
                  key={tool.url}
                  href={tool.url}
                  className="group card-nested card-interactive p-5 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl leading-none" aria-hidden="true">{tool.icon}</span>
                    <span className="eyebrow">{category.label}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    {tool.description}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="card-panel p-6 sm:p-10 my-12">
          <p className="eyebrow mb-2">Search terms</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            Popular conversions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Dedicated pages, each with the conversion factor, a worked example and a
            quick-reference table.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularConversions.map((pair) => (
              <li key={pair.url}>
                <Link
                  href={pair.url}
                  className="card-nested card-interactive flex items-center gap-3 px-4 py-3 text-gray-900 dark:text-gray-100"
                >
                  <span className="text-[var(--accent)]" aria-hidden="true">→</span>
                  {pair.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-panel p-6 sm:p-10 my-12">
          <p className="eyebrow mb-2">Why this site</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
            Accurate by construction, not by approximation.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card-nested p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Exact factors</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                A foot is exactly 0.3048 m and a pound exactly 0.45359237 kg. This site uses
                the definitions, not rounded approximations, and a test suite holds them to
                ten decimal places.
              </p>
            </div>
            <div className="card-nested p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Nothing hidden</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Every page shows the formula and a worked example, so you can check the
                arithmetic rather than trusting a black box.
              </p>
            </div>
            <div className="card-nested p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">US and imperial kept apart</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Gallons, pints and fluid ounces differ between the US and UK. They are listed
                separately everywhere, so you never have to guess which one is meant.
              </p>
            </div>
          </div>
        </section>

        <section className="card-panel p-6 sm:p-10 my-12">
          <p className="eyebrow mb-2">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            One base unit per family
          </h2>
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 max-w-3xl">
            <p>
              Almost every conversion here works the same way: the value is converted into a
              base unit, then out again into the target. Length runs through metres, mass
              through kilograms, volume through litres. Each unit needs only one number
              defining it, and any pair converts without a separate rule per combination.
            </p>
            <p>
              Temperature is the exception. Celsius and Fahrenheit have different zero points
              as well as different degree sizes, so it needs an offset as well as a ratio.
              That is why{" "}
              <Link href="/celsius-to-fahrenheit" className="text-[var(--accent)] hover:underline">
                Celsius to Fahrenheit
              </Link>{" "}
              is <code className="text-sm">°C × 9/5 + 32</code> and not a single
              multiplication — the most common mistake in hand conversions.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
