import ConverterPageClient from "@/components/ConverterPageClient";
import ConversionTable from "@/components/shared/ConversionTable";
import FaqSection from "@/components/shared/FaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { dataStorageUnits } from "@/utils/conversions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Storage Converter - GB to MB, TB to GB, GiB vs GB",
  description:
    "Convert bytes, kilobytes, megabytes, gigabytes and terabytes, with both decimal (kB) and binary (KiB) prefixes. Explains why a 1 TB drive shows as 931 GB.",
  alternates: { canonical: "https://freeunitconvertor.com/data-storage" },
  openGraph: {
    title: "Data Storage Converter - GB to MB, TB to GB, GiB vs GB",
    description:
      "Convert between bytes, kB, MB, GB and TB, covering both decimal and binary prefixes.",
    url: "https://freeunitconvertor.com/data-storage",
  },
};

export default function DataStoragePage() {
  const seoContent = (
    <>
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Decimal and binary prefixes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Digital storage is counted two different ways, and the two disagree by an amount that
          grows with size. <strong>Decimal prefixes</strong> follow SI: a kilobyte is 1000 bytes,
          a megabyte is 1000 kilobytes, and so on. <strong>Binary prefixes</strong> follow powers
          of two: a kibibyte (KiB) is 1024 bytes, a mebibyte (MiB) is 1024 KiB.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          The gap starts at 2.4% for kilobytes and widens to roughly 10% by terabytes. This is
          the whole explanation for the most common storage complaint: a drive sold as
          &ldquo;1 TB&rdquo; holds 1,000,000,000,000 bytes, which Windows then reports as about
          931 GB because it is actually counting gibibytes. Neither figure is wrong; they are
          different units wearing similar labels.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Drive manufacturers and network speeds use decimal. Operating system file sizes and RAM
          use binary. Both are listed here so you can convert between them directly.
        </p>
      </section>

      <ConversionTable
        caption="Decimal versus binary at each scale"
        columns={["Decimal unit", "Equivalent binary value"]}
        rows={[
          ["1 kB (1000 bytes)", "0.9766 KiB"],
          ["1 MB (1000 kB)", "0.9537 MiB"],
          ["1 GB (1000 MB)", "0.9313 GiB"],
          ["1 TB (1000 GB)", "0.9095 TiB (931.32 GiB)"],
          ["1 KiB", "1024 bytes"],
          ["1 MiB", "1,048,576 bytes"],
          ["1 GiB", "1,073,741,824 bytes"],
          ["1 byte", "8 bits"],
        ]}
      />

      <RelatedTools currentUrl="/data-storage" />
    </>
  );

  const faqContent = (
    <FaqSection
      entries={[
        {
          question: "Why does my 1 TB drive only show 931 GB?",
          answer:
            "The manufacturer sells it as 1 TB meaning 1,000,000,000,000 bytes, using decimal prefixes. Windows displays capacity in binary units but labels them GB, so it divides by 1,073,741,824 and reports about 931. The drive holds exactly what was advertised; the two systems just count differently.",
        },
        {
          question: "What is the difference between GB and GiB?",
          answer:
            "A gigabyte (GB) is 1,000,000,000 bytes. A gibibyte (GiB) is 1,073,741,824 bytes, about 7.4% more. GiB is the unambiguous binary unit, introduced precisely because GB was being used for both meanings.",
        },
        {
          question: "How many megabytes are in a gigabyte?",
          answer:
            "1000 MB in a decimal gigabyte. If you mean the binary sense, there are 1024 MiB in a GiB. Most file managers show the binary figure.",
        },
        {
          question: "Why are internet speeds in megabits rather than megabytes?",
          answer:
            "Network throughput has always been measured in bits per second. A byte is 8 bits, so a 100 Mbps connection transfers at most about 12.5 MB per second. Watch the capitalisation: Mb is megabits, MB is megabytes.",
        },
      ]}
    />
  );

  return (
    <ConverterPageClient
      title="Data Storage Converter"
      subtitle="Convert bytes, kilobytes, megabytes, gigabytes and terabytes across both decimal and binary prefixes."
      units={dataStorageUnits}
      conversionType="dataStorage"
      defaultFromUnit="GB"
      seoContent={seoContent}
      faqContent={faqContent}
    />
  );
}
