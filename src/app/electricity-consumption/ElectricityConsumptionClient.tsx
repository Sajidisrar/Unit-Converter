'use client';

import AdBanner from '@/components/AdBanner';
import Link from 'next/link';
import { useState } from 'react';

// Common home appliances with their typical power consumption
const appliances = [
  { name: 'Air Conditioner (Central)', power: 3500, unit: 'W', category: 'HVAC' },
  { name: 'Air Conditioner (Window)', power: 1500, unit: 'W', category: 'HVAC' },
  { name: 'Refrigerator', power: 150, unit: 'W', category: 'Kitchen' },
  { name: 'Dishwasher', power: 1200, unit: 'W', category: 'Kitchen' },
  { name: 'Washing Machine', power: 500, unit: 'W', category: 'Laundry' },
  { name: 'Dryer', power: 3000, unit: 'W', category: 'Laundry' },
  { name: 'Water Heater', power: 4000, unit: 'W', category: 'Water' },
  { name: 'Electric Stove', power: 2000, unit: 'W', category: 'Kitchen' },
  { name: 'Microwave', power: 1000, unit: 'W', category: 'Kitchen' },
  { name: 'Coffee Maker', power: 800, unit: 'W', category: 'Kitchen' },
  { name: 'Toaster', power: 800, unit: 'W', category: 'Kitchen' },
  { name: 'Television (LED)', power: 100, unit: 'W', category: 'Entertainment' },
  { name: 'Television (Plasma)', power: 300, unit: 'W', category: 'Entertainment' },
  { name: 'Computer Desktop', power: 200, unit: 'W', category: 'Electronics' },
  { name: 'Laptop', power: 50, unit: 'W', category: 'Electronics' },
  { name: 'Gaming Console', power: 150, unit: 'W', category: 'Entertainment' },
  { name: 'Light Bulb (LED)', power: 10, unit: 'W', category: 'Lighting' },
  { name: 'Light Bulb (Incandescent)', power: 60, unit: 'W', category: 'Lighting' },
  { name: 'Ceiling Fan', power: 75, unit: 'W', category: 'HVAC' },
  { name: 'Vacuum Cleaner', power: 1000, unit: 'W', category: 'Cleaning' },
  { name: 'Hair Dryer', power: 1500, unit: 'W', category: 'Personal Care' },
  { name: 'Iron', power: 1000, unit: 'W', category: 'Laundry' },
  { name: 'Electric Kettle', power: 1500, unit: 'W', category: 'Kitchen' },
  { name: 'Space Heater', power: 1500, unit: 'W', category: 'HVAC' },
];

interface ApplianceUsage {
  name: string;
  power: number;
  hours: number;
  cost: number;
}

export default function ElectricityConsumptionClient() {
  const [selectedAppliances, setSelectedAppliances] = useState<ApplianceUsage[]>([]);
  const [customAppliance, setCustomAppliance] = useState({ name: '', power: 0 });
  const [electricityRate, setElectricityRate] = useState(0.12);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const addAppliance = (appliance: typeof appliances[0]) => {
    const newAppliance: ApplianceUsage = {
      name: appliance.name,
      power: appliance.power,
      hours: 1,
      cost: 0
    };
    setSelectedAppliances([...selectedAppliances, newAppliance]);
  };

  const addCustomAppliance = () => {
    if (customAppliance.name && customAppliance.power > 0) {
      const newAppliance: ApplianceUsage = {
        name: customAppliance.name,
        power: customAppliance.power,
        hours: 1,
        cost: 0
      };
      setSelectedAppliances([...selectedAppliances, newAppliance]);
      setCustomAppliance({ name: '', power: 0 });
    }
  };

  const updateAppliance = (index: number, field: keyof ApplianceUsage, value: number | string) => {
    const updated = [...selectedAppliances];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedAppliances(updated);
  };

  const removeAppliance = (index: number) => {
    setSelectedAppliances(selectedAppliances.filter((_, i) => i !== index));
  };

  const calculateConsumption = () => {
    let totalWatts = 0;
    let calcTotalCost = 0;

    selectedAppliances.forEach(appliance => {
      const dailyConsumption = (appliance.power * appliance.hours) / 1000;
      const dailyCost = dailyConsumption * electricityRate;
      totalWatts += appliance.power * appliance.hours;
      calcTotalCost += dailyCost;
    });

    setTotalConsumption(totalWatts / 1000);
    setTotalCost(calcTotalCost);
  };

  const groupedAppliances = appliances.reduce((acc, appliance) => {
    if (!acc[appliance.category]) {
      acc[appliance.category] = [];
    }
    acc[appliance.category].push(appliance);
    return acc;
  }, {} as Record<string, typeof appliances>);

  return (
    <div className="page-ground">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Electricity Consumption Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your home&apos;s electricity consumption and costs based on common appliances. Perfect for energy planning, bill estimation, and identifying high-consumption devices.
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="mb-6">
            <AdBanner position="top" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
            {/* Appliance Selection */}
            <div className="card-panel p-6 min-w-0">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Select Appliances
              </h2>

              {/* Custom Appliance */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Add Custom Appliance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Appliance name"
                    value={customAppliance.name}
                    onChange={(e) => setCustomAppliance({...customAppliance, name: e.target.value})}
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="Power (W)"
                      value={customAppliance.power || ''}
                      onChange={(e) => setCustomAppliance({...customAppliance, power: Math.max(0, Number(e.target.value))})}
                      className="flex-1 min-w-0 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                    />
                    <button
                      onClick={addCustomAppliance}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Appliance Categories */}
              {Object.entries(groupedAppliances).map(([category, categoryAppliances]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {categoryAppliances.map((appliance, index) => (
                      <button
                        key={index}
                        onClick={() => addAppliance(appliance)}
                        className="text-left p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-800 dark:text-white">{appliance.name}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {appliance.power}W
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Appliances & Calculations */}
            <div className="card-panel p-6 min-w-0">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Your Appliances
              </h2>

              {/* Electricity Rate */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Electricity Rate ($/kWh)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(Math.max(0, Number(e.target.value)))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                />
              </div>

              {/* Selected Appliances List */}
              <div className="space-y-4 mb-6">
                {selectedAppliances.map((appliance, index) => (
                  <div key={index} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {appliance.name}
                      </h4>
                      <button
                        onClick={() => removeAppliance(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Hours per day
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          value={appliance.hours}
                          onChange={(e) => updateAppliance(index, 'hours', Math.max(0, Math.min(24, Number(e.target.value))))}
                          className="w-full min-w-0 p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Power (W)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={appliance.power}
                          onChange={(e) => updateAppliance(index, 'power', Math.max(0, Number(e.target.value)))}
                          className="w-full min-w-0 p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateConsumption}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold mb-6"
              >
                Calculate Consumption
              </button>

              {/* Results */}
              {(totalConsumption > 0 || totalCost > 0) && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Daily Consumption
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Total Energy:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {totalConsumption.toFixed(2)} kWh
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Daily Cost:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        ${totalCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Monthly Cost:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        ${(totalCost * 30).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Annual Cost:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        ${(totalCost * 365).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <AdBanner position="inline" />
          </div>

          <section className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-10 my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              About Electricity Consumption
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
              Understanding your home&apos;s electricity consumption is crucial for energy management, cost control, and environmental awareness. This calculator helps you identify which appliances consume the most energy and estimate your monthly electricity bills.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
              Common high-consumption appliances include air conditioners, water heaters, electric dryers, and space heaters. By monitoring usage patterns and optimising appliance efficiency, you can significantly reduce your electricity costs and carbon footprint.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
              Energy-efficient appliances, smart thermostats, and LED lighting can help reduce consumption. Consider upgrading to ENERGY STAR certified appliances and implementing energy-saving habits like unplugging unused devices and using appliances during off-peak hours.
            </p>
            <div className="flex space-x-4">
              <Link href="/power" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Power Converter
              </Link>
              <Link href="/unit-converter" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Unit Converter
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <div className="card-panel p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Frequently Asked Questions - Electricity Consumption
            </h2>

            <div className="space-y-6">
              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Which appliances consume the most electricity?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  Air conditioners, water heaters, electric dryers, and space heaters typically consume the most electricity. HVAC systems and water heating can account for 40-60% of your total energy consumption.
                </p>
              </details>

              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How can I reduce my electricity consumption?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  Use energy-efficient appliances, LED lighting, programmable thermostats, and unplug unused devices. Consider solar panels, insulation improvements, and using appliances during off-peak hours.
                </p>
              </details>

              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  What is the difference between watts and kilowatt-hours?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  Watts measure power (rate of energy use), while kilowatt-hours measure energy consumption over time. 1 kWh = 1000 watts used for 1 hour.
                </p>
              </details>

              <details>
                <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  How accurate are these consumption estimates?
                </summary>
                <p className="text-gray-600 dark:text-gray-300">
                  These are typical consumption values. Actual consumption varies based on appliance efficiency, usage patterns, age of equipment, and environmental conditions. Check your appliance labels for specific power ratings.
                </p>
              </details>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
