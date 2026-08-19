import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celsius to Fahrenheit Converter - °C to °F with Formula",
  description:
    "Convert Celsius to Fahrenheit. Formula: °F = °C × 9/5 + 32. Includes a worked example, a conversion table and common reference temperatures.",
  alternates: { canonical: "https://freeunitconvertor.com/celsius-to-fahrenheit" },
  openGraph: {
    title: "Celsius to Fahrenheit Converter - °C to °F with Formula",
    description: "°F = °C × 9/5 + 32. Formula, worked example and conversion table.",
    url: "https://freeunitconvertor.com/celsius-to-fahrenheit",
  },
};

export default function CelsiusToFahrenheitPage() {
  return (
    <ConversionPairPage
      title="Celsius to Fahrenheit"
      subtitle="Convert °C to °F. Unlike most conversions this one has an offset as well as a ratio."
      conversionType="temperature"
      fromUnit="c"
      toUnit="f"
      fromLabel="Celsius"
      toLabel="Fahrenheit"
      fromSymbol="°C"
      toSymbol="°F"
      tableValues={[-40, -10, 0, 10, 20, 25, 30, 37, 100]}
      converterUrl="/unit-converter"
      converterName="Unit Converter"
      explanation={
        <>
          <p>
            Temperature is the awkward case. Most conversions are a single multiplication, because
            zero in one unit is zero in the other. The Celsius and Fahrenheit scales have different
            zero points as well as different degree sizes, so the conversion needs both a ratio and
            an offset: <strong>°F = °C × 9/5 + 32</strong>. Skipping the offset is by far the most
            common mistake.
          </p>
          <p>
            Celsius puts 0 at the freezing point of water and 100 at its boiling point at standard
            pressure, which is why it feels natural for weather and cooking. Fahrenheit places
            those same two points at 32 and 212, giving 180 degrees between them, so a Fahrenheit
            degree is exactly 5/9 the size of a Celsius one.
          </p>
          <p>
            The two scales meet at −40, where −40 °C and −40 °F are the same temperature. That is
            a useful sanity check: if your conversion does not produce −40 from −40, the offset is
            in the wrong place. For scientific work, Kelvin uses Celsius-sized degrees starting
            from absolute zero, so K = °C + 273.15.
          </p>
        </>
      }
      faqs={[
        {
          question: "What is the formula to convert Celsius to Fahrenheit?",
          answer:
            "Multiply by 9, divide by 5, then add 32. Written out: °F = °C × 9/5 + 32. To go the other way, subtract 32 first, then multiply by 5/9.",
        },
        {
          question: "What is 20 degrees Celsius in Fahrenheit?",
          answer:
            "68 °F. Working it through: 20 × 9/5 = 36, and 36 + 32 = 68. That is a comfortable room temperature.",
        },
        {
          question: "Is there a quick mental approximation?",
          answer:
            "Double the Celsius value and add 30. For 20 °C that gives 70 against a true 68. It is close enough for weather but drifts at extremes, so use the real formula when it matters.",
        },
        {
          question: "At what temperature are Celsius and Fahrenheit equal?",
          answer:
            "At −40 degrees. It is the single point where the two scales cross, and a handy way to check that a conversion has been implemented correctly.",
        },
        {
          question: "What is normal body temperature in Fahrenheit?",
          answer:
            "37 °C converts to 98.6 °F. The familiar 98.6 figure is simply the rounded conversion of a rounded Celsius value; normal body temperature actually varies by roughly half a degree Celsius through the day.",
        },
      ]}
    />
  );
}
