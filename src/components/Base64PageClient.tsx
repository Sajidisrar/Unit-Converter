"use client";

import AdBanner from "@/components/AdBanner";
import Base64EncoderDecoder from "@/components/Base64EncoderDecoder";
import DeveloperToolsNav from "@/components/DeveloperToolsNav";

export default function Base64PageClient() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Base64 Encoder Decoder
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Encode text to Base64 or decode Base64 strings instantly. Essential for web development, API testing, and secure data transmission.
            </p>
          </header>

          <main className="max-w-6xl mx-auto">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>

            <Base64EncoderDecoder />

            <div className="mt-8">
              <AdBanner position="inline" />
            </div>

            <DeveloperToolsNav />

            <section className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-10 my-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                How Base64 Encoding Works
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
                Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It&apos;s widely used in web development for encoding data that needs to be transmitted over text-based protocols.
              </p>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
                Common use cases include encoding images for data URLs, encoding credentials for HTTP Basic Authentication, and encoding binary data in JSON or XML. Base64 encoding ensures data integrity when transmitting binary information through text-based systems.
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">Common Use Cases</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
                Common use cases include encoding images for data URLs, encoding credentials for HTTP Basic Authentication, and encoding binary data in JSON or XML. Base64 encoding ensures data integrity when transmitting binary information through text-based systems.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">Security Considerations</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
                Our tool supports both encoding text to Base64 and decoding Base64 strings back to their original text. This is essential for developers working with APIs, web applications, and data transmission systems.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Common use:</strong> Embedding images in HTML/CSS, API authentication, data transmission<br />
                  <strong>Example:</strong> &quot;Hello World&quot; → &quot;SGVsbG8gV29ybGQ=&quot;<br />
                  <strong>Data URL:</strong> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
                </p>
              </div>
            </section>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Frequently Asked Questions - Base64 Encoding
              </h2>

              <div className="space-y-6">
                <details>
                  <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    What is Base64 encoding used for?
                  </summary>
                  <p className="text-gray-600 dark:text-gray-300">
                    Base64 encoding is used to encode binary data into ASCII text format. Common uses include encoding images in data URLs, encoding credentials for HTTP Basic Authentication, and encoding binary data in JSON or XML.
                  </p>
                </details>

                <details>
                  <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Is Base64 encoding secure?
                  </summary>
                  <p className="text-gray-600 dark:text-gray-300">
                    Base64 is an encoding scheme, not encryption. It&apos;s not secure for sensitive data as it can be easily decoded. Use proper encryption for sensitive information.
                  </p>
                </details>

                <details>
                  <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    How do I encode an image to Base64?
                  </summary>
                  <p className="text-gray-600 dark:text-gray-300">
                    You can use our tool to encode text, but for images, you&apos;d typically use a file input or drag-and-drop interface. The encoded string can then be used in data URLs like &quot;data:image/png;base64,encoded_string&quot;.
                  </p>
                </details>
              </div>
            </div>
          </main>

          <div className="mt-12">
            <AdBanner position="inline" />
          </div>
        </div>
      </div>
    </>
  );
}
