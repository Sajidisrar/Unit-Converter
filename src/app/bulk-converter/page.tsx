import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import BulkConverterPageClient from "@/components/BulkConverterPageClient";
import FaqSection from "@/components/shared/FaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk Unit Converter - Convert a Whole List at Once",
  description:
    "Paste a column of values and convert them all at once. Handles length, weight, temperature, volume, energy and more, with CSV download and copy to clipboard.",
  alternates: { canonical: "https://freeunitconvertor.com/bulk-converter" },
  openGraph: {
    title: "Bulk Unit Converter - Convert a Whole List at Once",
    description:
      "Paste a column of values and convert them all at once, then copy the results or download a CSV.",
    url: "https://freeunitconvertor.com/bulk-converter",
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
            Convert a whole column of values in one go. Paste from a spreadsheet, pick your units,
            and copy the results back or download them as CSV.
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

          <AdBanner position="inline" />

          <FaqSection
            entries={[
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
