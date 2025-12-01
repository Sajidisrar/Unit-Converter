'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import TabContainer from '@/components/shared/TabContainer';
import { YamlFormatterTool, YamlJsonConverterTool } from '@/components/yaml-tools';

const yamlTabs = [
  { id: 'formatter', label: 'Formatter', icon: '✨' },
  { id: 'converter', label: 'YAML ↔ JSON', icon: '🔄' },
];

export default function YamlToolsClient() {
  const [activeTab, setActiveTab] = useState('formatter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            YAML Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Format, validate, and convert YAML with our comprehensive toolkit. Perfect for DevOps and configuration management.
          </p>
        </header>

        {/* Main Tool */}
        <main className="max-w-[1800px] mx-auto">
          {/* Ad Banner - Top */}
          <div className="mb-4">
            <AdBanner position="top" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
            {/* Tab Navigation */}
            <TabContainer
              tabs={yamlTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              accentColor="purple"
            />

            {/* Tool Content */}
            {activeTab === 'formatter' && <YamlFormatterTool />}
            {activeTab === 'converter' && <YamlJsonConverterTool />}
          </div>

          {/* SEO Content Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Complete Guide to YAML Tools</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">What is YAML?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  YAML (YAML Ain&apos;t Markup Language) is a human-readable data serialization format. It&apos;s widely used for configuration files in DevOps tools like Kubernetes, Docker Compose, Ansible, GitHub Actions, and CI/CD pipelines.
                </p>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Our YAML Tools Include:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Formatter:</strong> Beautify and validate YAML with custom indentation</li>
                  <li><strong>Converter:</strong> Convert between YAML and JSON formats</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Key Features</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Real-time YAML validation with detailed error messages</li>
                  <li>Custom indentation (2 or 4 spaces)</li>
                  <li>Bidirectional YAML ↔ JSON conversion</li>
                  <li>Minify YAML for compact output</li>
                  <li>Copy to clipboard functionality</li>
                  <li>All processing happens locally in your browser</li>
                </ul>
                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Pro Tip:</strong> Use YAML for configuration files (readable, supports comments) and JSON for API data exchange (wider language support).
                  </p>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Common Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Kubernetes</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Format and validate K8s manifests, deployments, and services.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Docker Compose</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Validate docker-compose.yml files before deployment.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">CI/CD Pipelines</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Format GitHub Actions, GitLab CI, and CircleCI configs.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Ansible</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Validate playbooks and inventory files.</p>
                </div>
              </div>
            </div>

            {/* YAML vs JSON */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">YAML vs JSON: When to Use Each</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Use YAML When:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Configuration files (more readable)</li>
                    <li>• You need comments in your data</li>
                    <li>• Human editing is frequent</li>
                    <li>• DevOps/infrastructure tools</li>
                    <li>• Multi-line strings are common</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Use JSON When:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• API request/response bodies</li>
                    <li>• JavaScript/web applications</li>
                    <li>• Machine-to-machine communication</li>
                    <li>• Strict data validation needed</li>
                    <li>• Wider language support required</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-5 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">What is YAML used for?</h3>
                <p>YAML is primarily used for configuration files in DevOps tools (Kubernetes, Docker, Ansible), CI/CD pipelines (GitHub Actions, GitLab CI), and application settings. Its human-readable syntax makes it ideal for files that need to be edited manually.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Is my YAML data safe?</h3>
                <p>Yes, all processing happens locally in your browser. Your YAML data never leaves your device, ensuring complete privacy.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Can YAML have comments?</h3>
                <p>Yes! Unlike JSON, YAML supports comments using the # symbol. Comments are preserved when formatting but are removed when converting to JSON (since JSON doesn&apos;t support comments).</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Why is indentation important in YAML?</h3>
                <p>YAML uses indentation to define structure (like Python). Incorrect indentation will cause parsing errors. Use consistent spaces (2 or 4) and never mix tabs with spaces.</p>
              </div>
            </div>
          </section>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/yaml" />
        </main>
      </div>
    </div>
  );
}
