"use client";

import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import BulkConverter from "@/components/BulkConverter";
import Calculator from "@/components/Calculator";
import TabContainer from "@/components/shared/TabContainer";
import { getCategoryLabel, getToolByUrl } from "@/constants/tools";
import { ConversionType } from "@/types/conversions";
import { ReactNode, useEffect, useState } from "react";

interface Unit {
  label: string;
  value: string;
}

interface ConverterPageClientProps {
  title: string;
  subtitle: string;
  units: Unit[];
  conversionType: ConversionType;
  defaultFromUnit?: string;
  seoContent?: ReactNode;
  faqContent?: ReactNode;
  /** Registry URL for this tool, used to build the breadcrumb trail. */
  toolUrl?: string;
}

export default function ConverterPageClient({
  title,
  subtitle,
  units,
  conversionType,
  defaultFromUnit,
  seoContent,
  faqContent,
  toolUrl,
}: ConverterPageClientProps) {
  const tool = toolUrl ? getToolByUrl(toolUrl) : undefined;
  // Resolve ?from= on the client. Reading it on the server would opt the whole
  // page out of static rendering for a parameter robots.txt already disallows.
  const [fromUnit, setFromUnit] = useState(defaultFromUnit);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('from');

    if (requested && units.some((unit) => unit.value === requested)) {
      setFromUnit(requested);
    }
  }, [units]);

  return (
    <div className="page-ground">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {tool && (
          <Breadcrumbs
            trail={[
              { name: getCategoryLabel(tool.category) },
              { name: tool.name, url: tool.url },
            ]}
          />
        )}
        <header className="mb-10">
          {tool && <p className="eyebrow mb-3">{getCategoryLabel(tool.category)}</p>}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {subtitle}
          </p>
        </header>

        <main>
          <div className="mb-6">
            <AdBanner position="top" />
          </div>

          <TabContainer
            tabs={[
              { id: 'single', label: 'Single value', icon: '🔢' },
              { id: 'bulk', label: 'Bulk list', icon: '📋' },
            ]}
            activeTab={mode}
            onTabChange={(id) => setMode(id as 'single' | 'bulk')}
            accentColor="blue"
          />

          {mode === 'single' ? (
            <Calculator
              title={`${title} Tool`}
              units={units}
              conversionType={conversionType}
              initialFromUnit={fromUnit || units[0]?.value}
            />
          ) : (
            <BulkConverter
              units={units}
              conversionType={conversionType}
              defaultFrom={fromUnit || units[0]?.value}
            />
          )}

          <div className="mt-8">
            <AdBanner position="inline" />
          </div>

          {seoContent}
          {faqContent}
        </main>
      </div>
    </div>
  );
}
