import ConverterPageClient from "@/components/ConverterPageClient";
import ConversionTable from "@/components/shared/ConversionTable";
import FaqSection from "@/components/shared/FaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { angleUnits } from "@/utils/conversions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Angle Converter - Degrees to Radians, Gradians & Arcminutes",
  description:
    "Convert angles between degrees, radians, gradians, milliradians, arcminutes, arcseconds and turns. Includes the exact degree to radian formula.",
  alternates: { canonical: "https://freeunitconvertor.com/angle" },
  openGraph: {
    title: "Angle Converter - Degrees to Radians, Gradians & Arcminutes",
    description: "Convert degrees, radians, gradians, arcminutes, arcseconds and turns.",
    url: "https://freeunitconvertor.com/angle",
  },
};

export default function AnglePage() {
  const seoContent = (
    <>
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Degrees, radians and the formula
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          A full turn is 360 degrees, 2π radians, or 400 gradians. Converting between degrees and
          radians is a single multiplication:
        </p>
        <p className="font-mono text-sm bg-gray-100 dark:bg-gray-900 rounded p-4 mb-4 text-gray-800 dark:text-gray-200">
          radians = degrees × π ÷ 180<br />
          degrees = radians × 180 ÷ π
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Radians are the natural unit in mathematics because they measure arc length on a unit
          circle: an angle of one radian subtends an arc exactly one radius long. Every
          trigonometric function in JavaScript, Python and virtually every other language expects
          radians, which is the single most common source of wrong-looking trigonometry results.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Degrees subdivide into arcminutes and arcseconds, sixtieths and
          three-thousand-six-hundredths of a degree, still used in navigation, surveying and
          astronomy. Gradians divide the right angle into a round 100 and survive mainly in
          European surveying. Milliradians are used in optics and ballistics.
        </p>
      </section>

      <ConversionTable
        caption="Common angle conversions"
        columns={["Angle", "Equivalent"]}
        rows={[
          ["1 turn", "360° = 2π rad = 400 gon"],
          ["180°", "π radians (3.14159 rad)"],
          ["90°", "π/2 radians (1.570796 rad)"],
          ["60°", "π/3 radians (1.047198 rad)"],
          ["45°", "π/4 radians (0.785398 rad)"],
          ["30°", "π/6 radians (0.523599 rad)"],
          ["1 radian", "57.29578°"],
          ["1 degree", "0.0174533 radians"],
          ["1 degree", "60 arcminutes"],
          ["1 degree", "3600 arcseconds"],
        ]}
      />

      <RelatedTools currentUrl="/angle" />
    </>
  );

  const faqContent = (
    <FaqSection
      entries={[
        {
          question: "How do I convert degrees to radians?",
          answer:
            "Multiply the number of degrees by π and divide by 180. So 90 degrees becomes 90 × π ÷ 180 = π/2, roughly 1.5708 radians.",
        },
        {
          question: "How many degrees is one radian?",
          answer:
            "About 57.29578 degrees, which is 180 divided by π. It is deliberately not a round number: a radian is defined by the geometry of the circle, not by convention.",
        },
        {
          question: "Why do programming languages use radians?",
          answer:
            "Trigonometric functions in almost every language, including JavaScript's Math.sin and Python's math.sin, expect radians. Passing degrees produces plausible-looking but wrong answers, which makes it a common and hard-to-spot bug. Convert first.",
        },
        {
          question: "What is a gradian?",
          answer:
            "A gradian, or gon, divides a full turn into 400 parts, so a right angle is exactly 100 gradians. It was introduced alongside the metric system and is still used in some European surveying work.",
        },
        {
          question: "What are arcminutes and arcseconds used for?",
          answer:
            "Navigation, surveying and astronomy, where angles are small and precision matters. One arcminute is 1/60 of a degree and one arcsecond is 1/3600. Latitude and longitude are traditionally written in degrees, minutes and seconds.",
        },
      ]}
    />
  );

  return (
    <ConverterPageClient
      title="Angle Converter"
      subtitle="Convert degrees, radians, gradians, milliradians, arcminutes, arcseconds and turns."
      units={angleUnits}
      conversionType="angle"
      defaultFromUnit="deg"
      seoContent={seoContent}
      faqContent={faqContent}
    />
  );
}
