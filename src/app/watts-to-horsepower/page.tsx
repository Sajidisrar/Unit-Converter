import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watts to Horsepower Converter - W to HP with Formula",
  description:
    "Convert watts to horsepower. 1 hp = 745.7 W mechanical, 735.5 W metric. Formula, table and the difference between hp, PS and bhp explained.",
  alternates: { canonical: "https://freeunitconvertor.com/watts-to-horsepower" },
  openGraph: {
    title: "Watts to Horsepower Converter - W to HP with Formula",
    description: "1 hp = 745.7 W. Formula, conversion table and hp vs PS vs bhp explained.",
    url: "https://freeunitconvertor.com/watts-to-horsepower",
  },
};

export default function WattsToHorsepowerPage() {
  return (
    <ConversionPairPage
      title="Watts to Horsepower"
      subtitle="Convert watts to mechanical horsepower, with metric horsepower (PS) explained below."
      conversionType="power"
      fromUnit="W"
      toUnit="hp"
      fromLabel="watts"
      toLabel="horsepower"
      fromSymbol="W"
      toSymbol="hp"
      tableValues={[100, 500, 745.7, 1000, 5000, 10000, 50000, 75000, 100000]}
      converterUrl="/power"
      converterName="Power Converter"
      explanation={
        <>
          <p>
            There is more than one horsepower. <strong>Mechanical horsepower</strong>, used in the
            UK and US, is 745.6998716 watts. <strong>Metric horsepower</strong>, written PS or CV
            and standard across continental Europe, is 735.49875 watts, about 1.4% smaller. A car
            advertised at 150 PS in Germany is around 148 hp in Britain, describing the same engine.
          </p>
          <p>
            The unit dates from James Watt&apos;s marketing of steam engines in the 1780s. He
            estimated the sustained output of a working horse turning a mill wheel and priced his
            engines against it. The watt was named after him a century later, which is why the two
            units are so entangled in engineering.
          </p>
          <p>
            You will also meet <strong>bhp</strong>, brake horsepower, which is measured at the
            engine flywheel before losses through the gearbox and drivetrain. Wheel horsepower is
            typically 10 to 15% lower. When comparing figures, check they were measured the same
            way — the <a href="/power" className="text-blue-600 dark:text-blue-400 hover:underline">power
            converter</a> covers both horsepower definitions alongside BTU/h and kilowatts.
          </p>
        </>
      }
      faqs={[
        {
          question: "How many watts are in one horsepower?",
          answer:
            "745.7 watts for mechanical horsepower, the figure used in the UK and US. Metric horsepower, written PS, is 735.5 watts.",
        },
        {
          question: "How do I convert kW to hp?",
          answer:
            "Multiply kilowatts by 1.341 for mechanical horsepower, or by 1.360 for metric horsepower (PS). A 100 kW engine is 134 hp or 136 PS.",
        },
        {
          question: "What is the difference between hp, bhp and PS?",
          answer:
            "hp and bhp are both mechanical horsepower at 745.7 W; bhp specifies that the measurement was taken at the flywheel before drivetrain losses. PS is metric horsepower at 735.5 W, about 1.4% smaller.",
        },
        {
          question: "Why is horsepower still used for engines?",
          answer:
            "Convention and familiarity. Kilowatts are the SI unit and appear on European documentation, but buyers have decades of intuition for horsepower figures, so manufacturers keep quoting both.",
        },
      ]}
    />
  );
}
