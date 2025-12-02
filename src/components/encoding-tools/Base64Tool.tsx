'use client';

import { useState, useRef, useCallback } from "react";

type TabType = 'text' | 'file';

function utf8ToBase64(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  bytes.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary);
}

function base64ToUtf8(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

function detectMimeType(base64: string): string {
  const signatures: Record<string, string> = {
    'iVBORw0KGgo': 'image/png',
    '/9j/': 'image/jpeg',
    'R0lGODlh': 'image/gif',
    'R0lGODdh': 'image/gif',
    'UklGR': 'image/webp',
    'PD94bWw': 'image/svg+xml',
    'PHN2Zw': 'image/svg+xml',
    'JVBERi': 'application/pdf',
    'UEsDB': 'application/zip',
  };

  for (const [signature, mime] of Object.entries(signatures)) {
    if (base64.startsWith(signature)) {
      return mime;
    }
  }
  return 'application/octet-stream';
}

function getFileExtension(mimeType: string): string {
  const extensions: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
    'application/zip': 'zip',
    'text/plain': 'txt',
    'application/json': 'json',
  };
  return extensions[mimeType] || 'bin';
}

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [tab, setTab] = useState<TabType>('text');
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [includeDataUrl, setIncludeDataUrl] = useState(false);
  const [detectedMime, setDetectedMime] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextEncode = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const encoded = utf8ToBase64(input);
      setOutput(includeDataUrl ? `data:text/plain;base64,${encoded}` : encoded);
    } catch {
      setError('Invalid input for Base64 encoding');
      setOutput('');
    }
  };

  const handleTextDecode = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        setPreviewUrl(null);
        return;
      }

      let base64Data = input.trim();
      if (base64Data.includes(',')) {
        base64Data = base64Data.split(',')[1];
      }

      const decoded = base64ToUtf8(base64Data);
      setOutput(decoded);

      const mime = detectMimeType(base64Data);
      setDetectedMime(mime);
      if (mime.startsWith('image/')) {
        setPreviewUrl(`data:${mime};base64,${base64Data}`);
      } else {
        setPreviewUrl(null);
      }
    } catch {
      setError('Invalid Base64 string');
      setOutput('');
      setPreviewUrl(null);
    }
  };

  const handleFileUpload = useCallback((file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (includeDataUrl) {
        setOutput(result);
      } else {
        const base64 = result.split(',')[1];
        setOutput(base64);
      }

      if (file.type.startsWith('image/')) {
        setPreviewUrl(result);
      } else {
        setPreviewUrl(null);
      }
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsDataURL(file);
  }, [includeDataUrl]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDownload = () => {
    try {
      let base64Data = input.trim();
      let mimeType = 'application/octet-stream';

      if (base64Data.startsWith('data:')) {
        const match = base64Data.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          mimeType = match[1];
          base64Data = match[2];
        }
      } else {
        mimeType = detectMimeType(base64Data);
      }

      const binary = atob(base64Data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `decoded-file.${getFileExtension(mimeType)}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to download file. Invalid Base64 data.');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setFileName('');
    setFileSize(0);
    setPreviewUrl(null);
    setDetectedMime('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 bg-gray-100 dark:bg-gray-700">
          <button
            onClick={() => { setMode('encode'); handleClear(); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode('decode'); handleClear(); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      {/* Tab Toggle for Encode mode */}
      {mode === 'encode' && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 bg-gray-100 dark:bg-gray-700">
            <button
              onClick={() => { setTab('text'); handleClear(); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === 'text'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Text Input
            </button>
            <button
              onClick={() => { setTab('file'); handleClear(); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === 'file'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              File Upload
            </button>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="mb-4 flex justify-center">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={includeDataUrl}
            onChange={(e) => setIncludeDataUrl(e.target.checked)}
            className="rounded border-gray-300"
          />
          {mode === 'encode' ? 'Include data URL prefix' : 'Input is data URL'}
        </label>
      </div>

      <div className="space-y-6">
        {/* Text Input */}
        {(mode === 'decode' || tab === 'text') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string or data URL to decode...'}
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white resize-none font-mono text-sm"
            />
          </div>
        )}

        {/* File Upload */}
        {mode === 'encode' && tab === 'file' && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 dark:hover:border-green-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <div className="text-gray-500 dark:text-gray-400">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {fileName ? (
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">{fileName}</p>
                  <p className="text-sm">{formatFileSize(fileSize)}</p>
                </div>
              ) : (
                <>
                  <p className="font-medium">Drop a file here or click to browse</p>
                  <p className="text-sm mt-1">Supports images, PDFs, and other files</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {mode === 'encode' ? (
            tab === 'text' ? (
              <button
                onClick={handleTextEncode}
                disabled={!input.trim()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Encode to Base64
              </button>
            ) : null
          ) : (
            <>
              <button
                onClick={handleTextDecode}
                disabled={!input.trim()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Decode to Text
              </button>
              <button
                onClick={handleDownload}
                disabled={!input.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Download as File
              </button>
            </>
          )}
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Preview for images */}
        {previewUrl && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image Preview
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-64 mx-auto rounded"
              />
            </div>
          </div>
        )}

        {/* Detected MIME type */}
        {mode === 'decode' && detectedMime && !detectedMime.startsWith('image/') && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Detected file type: <span className="font-medium">{detectedMime}</span>
            </p>
          </div>
        )}

        {/* Output */}
        {output && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Base64 Encoded Result' : 'Decoded Text'}
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white resize-none font-mono text-sm"
              />
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            {mode === 'encode' && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Output size: {output.length} characters ({formatFileSize(output.length)})
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
