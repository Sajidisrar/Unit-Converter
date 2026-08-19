import ConverterPageClient from "@/components/ConverterPageClient";
import ConversionTable from "@/components/shared/ConversionTable";
import FaqSection from "@/components/shared/FaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { volumeUnits } from "@/utils/conversions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volume Converter - Litres, Gallons, Pints & Fluid Ounces",
  description:
    "Convert volume between litres, millilitres, US and UK gallons, pints, quarts, cubic metres and fluid ounces. Handles the difference between US and imperial measures.",
  alternates: { canonical: "https://freeunitconvertor.com/volume" },
  openGraph: {
    title: "Volume Converter - Litres, Gallons, Pints & Fluid Ounces",
    description:
      "Convert litres, gallons, pints and fluid ounces, with separate US and imperial units.",
    url: "https://freeunitconvertor.com/volume",
  },
};

export default function VolumePage() {
  const seoContent = (
    <>
      <section className="card-panel p-8 my-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          How volume conversion works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Every unit on this page is defined against the litre, so a conversion is a single
          multiplication followed by a division:
        </p>
        <p className="font-mono text-sm bg-gray-100 dark:bg-gray-900 rounded p-4 mb-4 text-gray-800 dark:text-gray-200">
          result = value × (litres per source unit) ÷ (litres per target unit)
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          The one thing that catches people out is that <strong>US and imperial units share
          names but not sizes</strong>. A US gallon is 3.785411784 litres; an imperial gallon is
          4.54609 litres, about 20% larger. Pints and fluid ounces differ too, and in opposite
          directions: a UK pint is larger than a US pint, but a UK fluid ounce is slightly
          smaller than a US one, because the imperial pint holds 20 fluid ounces where the US
          pint holds 16. Both are listed separately here so you never have to guess.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          For recipe quantities, the <a href="/cooking" className="text-blue-600 dark:text-blue-400 hover:underline">cooking converter</a> uses
          the 240 ml metric cup and is the better tool. For engineering work in cubic
          measures, the <a href="/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">unit converter</a> covers
          length and area alongside volume.
        </p>
      </section>

      <ConversionTable
        caption="Common volume conversions"
        columns={["Conversion", "Result"]}
        rows={[
          ["1 litre", "0.264172 US gallons"],
          ["1 litre", "0.219969 imperial gallons"],
          ["1 US gallon", "3.785411784 litres"],
          ["1 imperial gallon", "4.54609 litres"],
          ["1 US pint", "473.176473 ml"],
          ["1 imperial pint", "568.26125 ml"],
          ["1 US fluid ounce", "29.5735 ml"],
          ["1 imperial fluid ounce", "28.4131 ml"],
          ["1 cubic metre", "1000 litres"],
          ["1 cubic foot", "28.3168 litres"],
        ]}
      />

      <RelatedTools currentUrl="/volume" />
    </>
  );

  const faqContent = (
    <FaqSection
      entries={[
        {
          question: "Why is a UK gallon bigger than a US gallon?",
          answer:
            "They descend from different historical standards. The US gallon was fixed at 231 cubic inches (3.785411784 litres), based on the old English wine gallon. The imperial gallon was redefined in 1824 as the volume of ten pounds of water, giving 4.54609 litres. The two were never reconciled, so an imperial gallon is roughly 20% larger.",
        },
        {
          question: "How many millilitres are in a pint?",
          answer:
            "It depends which pint. A US liquid pint is 473.18 ml. An imperial pint, used in the UK, is 568.26 ml. That is why a UK pint of beer is noticeably larger than a US one.",
        },
        {
          question: "Is a fluid ounce a measure of weight or volume?",
          answer:
            "Volume. A fluid ounce measures how much space a liquid occupies, whereas an ounce measures mass. They are only interchangeable for water, and even then only approximately. To convert weight, use the unit converter instead.",
        },
        {
          question: "How do I convert litres to cubic metres?",
          answer:
            "Divide by 1000. One cubic metre holds exactly 1000 litres, because a cubic metre is a cube one metre on each side and a litre is a cube 10 cm on each side.",
        },
        {
          question: "Which cup size does this converter use?",
          answer:
            "The volume converter uses the US customary cup of 236.588 ml, which is exactly 8 US fluid ounces. The cooking converter uses the 240 ml metric cup instead, because that is the figure most modern recipes assume.",
        },
      ]}
    />
  );

  return (
    <ConverterPageClient
      title="Volume Converter"
      subtitle="Convert litres, gallons, pints, cubic metres and fluid ounces, with US and imperial units kept separate."
      units={volumeUnits}
      conversionType="volume"
      defaultFromUnit="l"
      seoContent={seoContent}
      faqContent={faqContent}
      toolUrl="/volume"
    />
  );
}
