import ConverterPageClient from "@/components/ConverterPageClient";
import ConversionTable from "@/components/shared/ConversionTable";
import FaqSection from "@/components/shared/FaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { energyUnits } from "@/utils/conversions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Energy Converter - kWh to Joules, Calories, kJ & BTU",
  description:
    "Convert energy between joules, kilojoules, kilowatt hours, calories, kilocalories, BTU and electronvolts. Useful for energy bills and food labels alike.",
  alternates: { canonical: "https://freeunitconvertor.com/energy" },
  openGraph: {
    title: "Energy Converter - kWh to Joules, Calories, kJ & BTU",
    description: "Convert joules, kilowatt hours, calories, kilojoules and BTU.",
    url: "https://freeunitconvertor.com/energy",
  },
};

export default function EnergyPage() {
  const seoContent = (
    <>
      <section className="card-panel p-8 my-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Energy versus power
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          These are routinely confused. <strong>Power</strong> is a rate, measured in watts.
          <strong> Energy</strong> is the total delivered over time, measured in joules or
          kilowatt hours. A 2000 W kettle draws power at 2000 watts; run it for six minutes and
          it consumes 0.2 kWh of energy. Your electricity bill charges for energy, not power.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          The relationship is simply energy = power × time. One watt sustained for one second is
          one joule, so a kilowatt hour is 1000 W × 3600 s = 3,600,000 joules.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Food labels add their own wrinkle. The &ldquo;calorie&rdquo; on a nutrition panel is
          really a kilocalorie: 1000 small calories, or 4184 joules. UK and EU labels show both
          kJ and kcal, which is why the kJ figure is always about 4.2 times larger. To work out
          appliance running costs, use the <a href="/electricity-consumption" className="text-blue-600 dark:text-blue-400 hover:underline">electricity
          consumption calculator</a>; for rates rather than totals, use the <a href="/power" className="text-blue-600 dark:text-blue-400 hover:underline">power converter</a>.
        </p>
      </section>

      <ConversionTable
        caption="Common energy conversions"
        columns={["Conversion", "Result"]}
        rows={[
          ["1 kWh", "3,600,000 joules (3.6 MJ)"],
          ["1 kWh", "3412.14 BTU"],
          ["1 Wh", "3600 joules"],
          ["1 kcal (food calorie)", "4184 joules (4.184 kJ)"],
          ["1 calorie", "4.184 joules"],
          ["1 BTU", "1055.06 joules"],
          ["1 MJ", "0.2778 kWh"],
          ["1 kJ", "0.239 kcal"],
          ["100 kcal snack", "418.4 kJ"],
          ["1 electronvolt", "1.602177 × 10⁻¹⁹ joules"],
        ]}
      />

      <RelatedTools currentUrl="/energy" />
    </>
  );

  const faqContent = (
    <FaqSection
      entries={[
        {
          question: "How many joules are in a kilowatt hour?",
          answer:
            "Exactly 3,600,000 joules, or 3.6 megajoules. A kilowatt hour is 1000 watts sustained for 3600 seconds, and one watt-second is one joule.",
        },
        {
          question: "Is a food calorie the same as a calorie?",
          answer:
            "No. The calorie on a nutrition label is a kilocalorie, equal to 1000 small calories or 4184 joules. Physics uses the small calorie. This is why a chocolate bar shows perhaps 250 kcal alongside 1046 kJ.",
        },
        {
          question: "How do I convert kJ to calories?",
          answer:
            "Divide kilojoules by 4.184 to get kilocalories, the figure most people mean by calories. A 2000 kJ meal is about 478 kcal.",
        },
        {
          question: "What is the difference between kW and kWh?",
          answer:
            "A kilowatt is a rate of energy use; a kilowatt hour is an amount of energy. A 3 kW heater running for two hours uses 6 kWh. Energy suppliers bill in kWh.",
        },
        {
          question: "How much energy does a typical household use?",
          answer:
            "A UK home uses roughly 2700 kWh of electricity a year, though this varies widely with heating type, home size and occupancy. That is about 7.4 kWh per day, or 26.6 MJ.",
        },
      ]}
    />
  );

  return (
    <ConverterPageClient
      title="Energy Converter"
      subtitle="Convert joules, kilojoules, kilowatt hours, calories, BTU and electronvolts."
      units={energyUnits}
      conversionType="energy"
      defaultFromUnit="kWh"
      seoContent={seoContent}
      faqContent={faqContent}
      toolUrl="/energy"
    />
  );
}
