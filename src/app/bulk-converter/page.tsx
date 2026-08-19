import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import BulkConverterPageClient from "@/components/BulkConverterPageClient";
import FaqSection from "@/components/shared/FaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { Metadata } from "next";

export const metadata: Metadata = {
  // Title leads with the head term and covers the two phrasings people
  // actually search: "bulk unit converter" and "batch convert".
  title: "Bulk Unit Converter - Batch Convert a List of Values at Once",
  description:
    "Paste a spreadsheet column and batch convert hundreds of values in one go. Length, weight, temperature, volume, energy and more, with CSV export and copy to clipboard.",
  alternates: { canonical: "https://freeunitconvertor.com/bulk-converter" },
  openGraph: {
    title: "Bulk Unit Converter - Batch Convert a List of Values at Once",
    description:
      "Paste a column from Excel or Google Sheets and convert every value at once, then copy the results or download a CSV.",
    url: "https://freeunitconvertor.com/bulk-converter",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Bulk Unit Converter - Batch Convert a List of Values",
    description:
      "Convert a whole column of measurements at once. CSV export, nothing uploaded.",
  },
};

export default function BulkConverterPage() {
  return (
    <div className="page-ground">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <Breadcrumbs trail={[{ name: "Measurement" }, { name: "Bulk Converter", url: "/bulk-converter" }]} />

        <header className="mb-10">
          <p className="eyebrow mb-3">Measurement</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-gray-900 dark:text-white mb-4">
            Bulk Unit Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Batch convert a whole column of measurements in one go. Paste straight from Excel or
            Google Sheets, pick your units, then copy the results back or download them as CSV.
          </p>
        </header>

        <main>
          <AdBanner position="top" />

          <div className="my-8">
            <BulkConverterPageClient />
          </div>

          <section className="card-panel p-8 my-8">
            <p className="eyebrow mb-2">How it works</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Built for lists, not single lookups
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              <p>
                Converting one value is easy anywhere. Converting three hundred is not, and that is
                the job this page exists for — a column of measurements out of a spreadsheet, a set
                of readings from an instrument, a parts list in the wrong units.
              </p>
              <p>
                Values can be separated by new lines, commas, tabs or spaces, so a pasted
                spreadsheet column and a comma-separated list both work without reformatting.
                Everything runs in your browser: nothing is uploaded, which matters if the numbers
                are not yours to share.
              </p>
              <p>
                Anything that is not a number is flagged in place rather than skipped. A silently
                shortened list is worse than an obvious error, because you would have no way of
                knowing a row went missing.
              </p>
            </div>
          </section>

          <section className="card-panel p-8 my-8">
            <p className="eyebrow mb-2">Working from a spreadsheet</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Converting an Excel or Google Sheets column
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              <p>
                Spreadsheets can convert units with a formula, but only if you know the factor and
                are willing to add a helper column. For a one-off job it is usually quicker to
                select the column, copy it, and paste it here.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Select the cells you want to convert and copy them.</li>
                <li>Paste into the box above — one value per row is handled automatically.</li>
                <li>Choose the unit you are converting from and to.</li>
                <li>
                  Copy the results back into an adjacent column, or download the CSV if you would
                  rather keep the original and converted values side by side.
                </li>
              </ol>
              <p>
                Common uses: converting a parts list from inches to millimetres, a set of weights
                from pounds to kilograms, sensor readings from Fahrenheit to Celsius, or file sizes
                between gigabytes and gibibytes. Anything the{" "}
                <a href="/unit-converter" className="text-[var(--accent)] hover:underline">single-value converters</a>{" "}
                handle works here too — every converter page also has a bulk tab.
              </p>
            </div>
          </section>

          <AdBanner position="inline" />

          <FaqSection
            entries={[
              {
                question: "How do I convert multiple values at once?",
                answer:
                  "Paste them into the box above, one per line or separated by commas. Every value is converted as you type, so there is no button to press and no limit on how many times you can change the units.",
              },
              {
                question: "Can I batch convert a column from Excel or Google Sheets?",
                answer:
                  "Yes. Select the cells, copy, and paste straight in — a copied spreadsheet column arrives as one value per line and is handled without reformatting. Download CSV gives you the input and output side by side to paste back.",
              },
              {
                question: "How many values can I convert at once?",
                answer:
                  "Up to 5,000 in a single paste. Beyond that the page tells you it has only converted the first 5,000 rather than quietly dropping the rest.",
              },
              {
                question: "What separators are supported?",
                answer:
                  "New lines, commas, tabs, semicolons and spaces. That covers a column copied from Excel or Google Sheets, a CSV fragment, and a plain space-separated list.",
              },
              {
                question: "Are my numbers uploaded anywhere?",
                answer:
                  "No. The conversion runs entirely in your browser using JavaScript. Nothing is sent to a server, so the tool works offline once the page has loaded.",
              },
              {
                question: "Can I get the results as a file?",
                answer:
                  "Yes. Download CSV gives you a two-column file with the original input alongside the converted value, which pastes straight back into a spreadsheet.",
              },
              {
                question: "Why is one of my rows showing an error?",
                answer:
                  "It could not be read as a number. Stray text, a unit symbol typed alongside the figure, or a currency prefix will all do it. Fix the row in the input box and the result updates immediately.",
              },
            ]}
          />

          <RelatedTools currentUrl="/bulk-converter" />
        </main>
      </div>
    </div>
  );
}
