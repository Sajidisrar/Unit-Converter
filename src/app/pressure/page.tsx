import ConverterPageClient from "@/components/ConverterPageClient";
import ConversionTable from "@/components/shared/ConversionTable";
import FaqSection from "@/components/shared/FaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { pressureUnits } from "@/utils/conversions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pressure Converter - PSI to Bar, kPa, Atmospheres & mmHg",
  description:
    "Convert pressure between psi, bar, pascal, kilopascal, atmospheres, torr and mmHg. Includes a tyre pressure reference table for psi and bar.",
  alternates: { canonical: "https://freeunitconvertor.com/pressure" },
  openGraph: {
    title: "Pressure Converter - PSI to Bar, kPa, Atmospheres & mmHg",
    description: "Convert psi, bar, pascal, atmospheres, torr and mmHg.",
    url: "https://freeunitconvertor.com/pressure",
  },
};

export default function PressurePage() {
  const seoContent = (
    <>
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Understanding pressure units
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Pressure is force spread over an area. The SI unit is the pascal, one newton per square
          metre, which is a very small quantity: normal atmospheric pressure is 101,325 Pa. That
          is why practical work uses larger units. Weather reports use hectopascals or millibars,
          which are numerically identical. Engineering uses bar and kilopascals. Tyre gauges in
          the UK and US use psi.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Medical and vacuum work still use millimetres of mercury, a legacy of the mercury
          barometer: the pressure that supports a column of mercury one millimetre high. A torr
          is defined as exactly 1/760 of an atmosphere and is very nearly, but not exactly, the
          same as 1 mmHg.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          One caution: tyre and boiler gauges usually read <strong>gauge pressure</strong>, which
          is pressure above the surrounding air. Absolute pressure is gauge pressure plus about
          1 bar. This converter changes units; it does not convert between gauge and absolute.
        </p>
      </section>

      <ConversionTable
        caption="Common pressure conversions"
        columns={["Conversion", "Result"]}
        rows={[
          ["1 bar", "14.5038 psi"],
          ["1 psi", "0.0689476 bar"],
          ["1 bar", "100,000 Pa (100 kPa)"],
          ["1 atmosphere", "101,325 Pa"],
          ["1 atmosphere", "14.6959 psi"],
          ["1 atmosphere", "760 torr"],
          ["30 psi (tyre)", "2.07 bar"],
          ["32 psi (tyre)", "2.21 bar"],
          ["35 psi (tyre)", "2.41 bar"],
          ["1 hPa", "1 mbar"],
        ]}
      />

      <RelatedTools currentUrl="/pressure" />
    </>
  );

  const faqContent = (
    <FaqSection
      entries={[
        {
          question: "How do I convert psi to bar?",
          answer:
            "Divide by 14.5038. A tyre inflated to 32 psi is at about 2.21 bar. Going the other way, multiply bar by 14.5038 to get psi.",
        },
        {
          question: "What tyre pressure is 2.2 bar in psi?",
          answer:
            "About 32 psi. Typical car tyre pressures run from 2.0 to 2.5 bar, which is roughly 29 to 36 psi. Always use the figure on the sticker inside the driver's door rather than a general rule.",
        },
        {
          question: "Are millibars and hectopascals the same?",
          answer:
            "Yes, exactly. One millibar equals one hectopascal, both being 100 pascals. Meteorologists switched labels to align with SI, but the numbers on weather charts did not change.",
        },
        {
          question: "What is the difference between torr and mmHg?",
          answer:
            "A torr is defined as exactly 1/760 of a standard atmosphere, or 133.3224 Pa. A conventional millimetre of mercury is 133.3224 Pa as well, so they agree to about one part in seven million. For all practical purposes they are interchangeable.",
        },
        {
          question: "Is gauge pressure the same as absolute pressure?",
          answer:
            "No. Gauge pressure is measured relative to the surrounding atmosphere, so a flat tyre reads zero even though it contains air at roughly 1 bar. Absolute pressure adds that atmospheric baseline back in. Most everyday gauges show gauge pressure.",
        },
      ]}
    />
  );

  return (
    <ConverterPageClient
      title="Pressure Converter"
      subtitle="Convert psi, bar, pascal, kilopascal, atmospheres, torr and millimetres of mercury."
      units={pressureUnits}
      conversionType="pressure"
      defaultFromUnit="bar"
      seoContent={seoContent}
      faqContent={faqContent}
    />
  );
}
