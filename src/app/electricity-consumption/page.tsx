import type { Metadata } from 'next';
import ElectricityConsumptionClient from './ElectricityConsumptionClient';

export const metadata: Metadata = {
  title: 'Electricity Consumption Calculator - Estimate Energy Costs | Free Online Tool',
  description: 'Calculate your home electricity consumption and costs. Select appliances, set usage hours, and estimate daily, monthly, and annual energy bills. Free online electricity calculator.',
  keywords: 'electricity consumption calculator, energy cost calculator, power consumption, kWh calculator, electricity bill estimator, appliance energy use, home energy calculator',
  openGraph: {
    title: 'Electricity Consumption Calculator - Estimate Energy Costs',
    description: 'Calculate your home electricity consumption and costs based on common appliances. Free online energy cost estimator.',
    type: 'website',
    url: 'https://freeunitconvertor.com/electricity-consumption',
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/electricity-consumption',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Electricity Consumption Calculator',
  description: 'Free online calculator to estimate home electricity consumption and costs based on common appliances.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Common appliance power ratings',
    'Custom appliance input',
    'Daily, monthly, and annual cost estimation',
    'Adjustable electricity rate',
    'Browser-based calculations',
  ],
};

export default function ElectricityConsumptionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ElectricityConsumptionClient />
    </>
  );
}
