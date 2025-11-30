'use client';

import AdBanner from "@/components/AdBanner";
import DeveloperToolsNav from "@/components/DeveloperToolsNav";
import { useState } from "react";

interface DecodedJWT {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string;
  isExpired: boolean;
  expiresIn: string | null;
  issuedAt: string | null;
}

function decodeBase64Url(str: string): string {
  // Replace URL-safe characters and add padding
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
  return atob(padded);
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

function getTimeRemaining(exp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = exp - now;

  if (diff <= 0) return 'Expired';

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
}

function decodeJWT(token: string): DecodedJWT | { error: string } {
  try {
    const parts = token.trim().split('.');

    if (parts.length !== 3) {
      return { error: 'Invalid JWT format. JWT must have 3 parts separated by dots (header.payload.signature)' };
    }

    let header: Record<string, unknown> | null = null;
    let payload: Record<string, unknown> | null = null;

    try {
      header = JSON.parse(decodeBase64Url(parts[0]));
    } catch {
      return { error: 'Failed to decode JWT header. The header is not valid Base64URL encoded JSON.' };
    }

    try {
      payload = JSON.parse(decodeBase64Url(parts[1]));
    } catch {
      return { error: 'Failed to decode JWT payload. The payload is not valid Base64URL encoded JSON.' };
    }

    const signature = parts[2];

    // Check expiration
    let isExpired = false;
    let expiresIn: string | null = null;
    let issuedAt: string | null = null;

    if (payload && typeof payload.exp === 'number') {
      const now = Math.floor(Date.now() / 1000);
      isExpired = payload.exp < now;
      expiresIn = getTimeRemaining(payload.exp);
    }

    if (payload && typeof payload.iat === 'number') {
      issuedAt = formatDate(payload.iat);
    }

    return { header, payload, signature, isExpired, expiresIn, issuedAt };
  } catch {
    return { error: 'Failed to decode JWT. Please check the token format.' };
  }
}

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMyOTIwMDAwLCJleHAiOjE3MzU1MTIwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export default function JwtDecoderClient() {
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleDecode = () => {
    if (!input.trim()) {
      setError('Please enter a JWT token');
      setDecoded(null);
      return;
    }

    const result = decodeJWT(input);

    if ('error' in result) {
      setError(result.error);
      setDecoded(null);
    } else {
      setDecoded(result);
      setError('');
    }
  };

  const handleCopy = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleClear = () => {
    setInput('');
    setDecoded(null);
    setError('');
  };

  const loadSample = () => {
    setInput(SAMPLE_JWT);
    setError('');
    setDecoded(null);
  };

  const renderClaimValue = (key: string, value: unknown): React.ReactNode => {
    // Format timestamps
    if ((key === 'exp' || key === 'iat' || key === 'nbf') && typeof value === 'number') {
      return (
        <span>
          <span className="text-blue-600 dark:text-blue-400">{value}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">({formatDate(value)})</span>
        </span>
      );
    }

    if (typeof value === 'string') {
      return <span className="text-green-600 dark:text-green-400">&quot;{value}&quot;</span>;
    }
    if (typeof value === 'number') {
      return <span className="text-blue-600 dark:text-blue-400">{value}</span>;
    }
    if (typeof value === 'boolean') {
      return <span className="text-purple-600 dark:text-purple-400">{String(value)}</span>;
    }
    if (value === null) {
      return <span className="text-gray-500">null</span>;
    }
    if (Array.isArray(value)) {
      return <span className="text-orange-600 dark:text-orange-400">{JSON.stringify(value)}</span>;
    }
    return <span>{JSON.stringify(value)}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            JWT Decoder
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Decode and inspect JSON Web Tokens instantly. View header, payload, and check expiration status.
          </p>
        </header>

        {/* Main Tool - Full Width */}
        <main className="max-w-[1600px] mx-auto">
          {/* Ad Banner - Top */}
          <div className="mb-4">
            <AdBanner position="top" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
            {/* Input Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  JWT Token Input
                </label>
                <button
                  onClick={loadSample}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Load sample token
                </button>
              </div>
              <textarea
                className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                style={{ minHeight: '120px' }}
                placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleDecode}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Decode JWT
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-2.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
              >
                Clear
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Decoded Output - 3 Column Grid */}
            {decoded && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Header Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Header
                    </h3>
                    <button
                      onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2), 'header')}
                      className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      {copiedSection === 'header' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="font-mono text-sm space-y-1">
                    {decoded.header && Object.entries(decoded.header).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-gray-600 dark:text-gray-400 mr-2">{key}:</span>
                        {renderClaimValue(key, value)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payload Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Payload
                    </h3>
                    <button
                      onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2), 'payload')}
                      className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      {copiedSection === 'payload' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="font-mono text-sm space-y-1 max-h-64 overflow-y-auto">
                    {decoded.payload && Object.entries(decoded.payload).map(([key, value]) => (
                      <div key={key} className="flex flex-wrap">
                        <span className="text-gray-600 dark:text-gray-400 mr-2">{key}:</span>
                        {renderClaimValue(key, value)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signature & Status Section */}
                <div className="space-y-4">
                  {/* Expiration Status */}
                  {decoded.expiresIn && (
                    <div className={`rounded-lg p-4 ${decoded.isExpired ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'}`}>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${decoded.isExpired ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        <span className={decoded.isExpired ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}>
                          Token Status
                        </span>
                      </h3>
                      <p className={`text-sm font-medium ${decoded.isExpired ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {decoded.expiresIn}
                      </p>
                      {decoded.issuedAt && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Issued: {decoded.issuedAt}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Signature */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Signature
                      </h3>
                      <button
                        onClick={() => handleCopy(decoded.signature, 'signature')}
                        className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        {copiedSection === 'signature' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="font-mono text-xs text-gray-600 dark:text-gray-400 break-all">
                      {decoded.signature}
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                      Note: Signature verification requires the secret key
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About JWT Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-red-600 dark:text-red-400 mb-1">Header</h3>
                <p className="text-gray-600 dark:text-gray-300">Contains algorithm (alg) and token type (typ)</p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-1">Payload</h3>
                <p className="text-gray-600 dark:text-gray-300">Contains claims like user ID, roles, and expiration</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Signature</h3>
                <p className="text-gray-600 dark:text-gray-300">Verifies token integrity (requires secret key)</p>
              </div>
            </div>
          </div>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/jwt-decoder" />
        </main>
      </div>
    </div>
  );
}
