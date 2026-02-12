'use client';

import { useState, useCallback, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

type OcrLanguage = 'eng' | 'ara' | 'chi_sim' | 'deu' | 'fra' | 'hin' | 'ita' | 'jpn' | 'kor' | 'por' | 'spa' | 'urd';

const LANGUAGES: { value: OcrLanguage; label: string }[] = [
  { value: 'eng', label: 'English' },
  { value: 'ara', label: 'Arabic' },
  { value: 'chi_sim', label: 'Chinese (Simplified)' },
  { value: 'deu', label: 'German' },
  { value: 'fra', label: 'French' },
  { value: 'hin', label: 'Hindi' },
  { value: 'ita', label: 'Italian' },
  { value: 'jpn', label: 'Japanese' },
  { value: 'kor', label: 'Korean' },
  { value: 'por', label: 'Portuguese' },
  { value: 'spa', label: 'Spanish' },
  { value: 'urd', label: 'Urdu' },
];

export default function OCRScannerClient() {
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState<OcrLanguage>('eng');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be under 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImage(result);
      setExtractedText('');
      setError(null);
      setProgress(0);
    };
    reader.onerror = () => {
      setError('Failed to read the image file');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleScan = async () => {
    if (!image) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setExtractedText('');

    try {
      const worker = await createWorker(language, undefined, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const { data } = await worker.recognize(image);
      setExtractedText(data.text.trim());
      await worker.terminate();

      if (!data.text.trim()) {
        setError('No text detected in the image. Try a clearer image with visible text.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleCopy = async () => {
    if (!extractedText) return;

    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const handleClear = () => {
    setImage(null);
    setExtractedText('');
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            OCR Scanner
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Extract text from images using Optical Character Recognition. Upload an image and get the text content instantly — all processing happens in your browser.
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="mb-4">
            <AdBanner position="top" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            {/* Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Image
              </label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <div className="text-4xl mb-3">
                  {isDragging ? '\u{1F4E5}' : '\u{1F4F7}'}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {isDragging ? 'Drop image here' : 'Drag and drop an image here, or click to select'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Supports PNG, JPG, WEBP, GIF, BMP (max 10MB)
                </p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Text Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as OcrLanguage)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Preview */}
            {image && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview
                </label>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt="Preview"
                    className="max-w-full max-h-96 rounded-lg object-contain"
                  />
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Processing...
                  </span>
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <button
                onClick={handleScan}
                disabled={!image || isProcessing}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing ({progress}%)
                  </>
                ) : (
                  'Extract Text'
                )}
              </button>
              <button
                onClick={handleClear}
                disabled={isProcessing}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>

            {/* Extracted Text */}
            {extractedText && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Extracted Text
                  </h3>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 dark:text-gray-200">
                    {extractedText}
                  </pre>
                </div>
              </div>
            )}

            {!extractedText && !isProcessing && image && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                Click &quot;Extract Text&quot; to scan the image
              </div>
            )}
          </div>

          <AdBanner position="inline" />

          {/* SEO Content */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6 mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              About OCR Technology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">What is OCR?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Optical Character Recognition (OCR) converts images containing text into machine-readable text data. Upload scanned documents, photos, or screenshots to extract their text content. All processing happens locally in your browser — your images are never uploaded to any server.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Use Cases</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Digitizing printed documents</li>
                  <li>Extracting text from screenshots</li>
                  <li>Converting scanned PDFs</li>
                  <li>Reading text from photos</li>
                  <li>Multi-language text recognition</li>
                </ul>
              </div>
            </div>
          </section>

          <DeveloperToolsNav currentPath="/ocr-scanner" />
        </main>
      </div>
    </div>
  );
}
