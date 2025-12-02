'use client';

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

const CLAIM_DESCRIPTIONS: Record<string, string> = {
  iss: 'Issuer - Who issued the token',
  sub: 'Subject - Who the token represents',
  aud: 'Audience - Intended recipient',
  exp: 'Expiration Time - When the token expires',
  nbf: 'Not Before - Token not valid before this time',
  iat: 'Issued At - When the token was created',
  jti: 'JWT ID - Unique token identifier',
  name: 'Full name of the user',
  email: 'Email address',
  role: 'User role or permission level',
  roles: 'List of user roles',
  scope: 'OAuth 2.0 scopes',
  permissions: 'User permissions',
  azp: 'Authorized Party',
  at_hash: 'Access Token Hash',
  nonce: 'Value to associate client session',
};

const ALGORITHM_INFO: Record<string, { name: string; type: string; secure: boolean }> = {
  HS256: { name: 'HMAC SHA-256', type: 'Symmetric', secure: true },
  HS384: { name: 'HMAC SHA-384', type: 'Symmetric', secure: true },
  HS512: { name: 'HMAC SHA-512', type: 'Symmetric', secure: true },
  RS256: { name: 'RSA SHA-256', type: 'Asymmetric', secure: true },
  RS384: { name: 'RSA SHA-384', type: 'Asymmetric', secure: true },
  RS512: { name: 'RSA SHA-512', type: 'Asymmetric', secure: true },
  ES256: { name: 'ECDSA P-256', type: 'Asymmetric', secure: true },
  ES384: { name: 'ECDSA P-384', type: 'Asymmetric', secure: true },
  ES512: { name: 'ECDSA P-521', type: 'Asymmetric', secure: true },
  PS256: { name: 'RSA-PSS SHA-256', type: 'Asymmetric', secure: true },
  PS384: { name: 'RSA-PSS SHA-384', type: 'Asymmetric', secure: true },
  PS512: { name: 'RSA-PSS SHA-512', type: 'Asymmetric', secure: true },
  none: { name: 'No Signature', type: 'None', secure: false },
};

export default function JwtDecoderTool() {
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
    <div>
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
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button
          onClick={handleDecode}
          disabled={!input.trim()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Decode JWT
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
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
            {/* Algorithm Info */}
            {decoded.header && typeof decoded.header.alg === 'string' && ALGORITHM_INFO[decoded.header.alg] && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium">{ALGORITHM_INFO[decoded.header.alg].name}</span>
                  <span className="mx-1">-</span>
                  <span>{ALGORITHM_INFO[decoded.header.alg].type}</span>
                  {!ALGORITHM_INFO[decoded.header.alg].secure && (
                    <span className="ml-2 text-red-500 dark:text-red-400">(Insecure!)</span>
                  )}
                </p>
              </div>
            )}
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
            <div className="font-mono text-sm space-y-2 max-h-64 overflow-y-auto">
              {decoded.payload && Object.entries(decoded.payload).map(([key, value]) => (
                <div key={key} className="group">
                  <div className="flex flex-wrap">
                    <span className="text-gray-600 dark:text-gray-400 mr-2" title={CLAIM_DESCRIPTIONS[key] || key}>{key}:</span>
                    {renderClaimValue(key, value)}
                  </div>
                  {CLAIM_DESCRIPTIONS[key] && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 ml-0 mt-0.5 opacity-70">
                      {CLAIM_DESCRIPTIONS[key]}
                    </p>
                  )}
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

      {/* JWT Info */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="font-medium text-gray-800 dark:text-white mb-3">About JWT Tokens</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-red-600 dark:text-red-400 mb-1">Header</h5>
            <p className="text-gray-600 dark:text-gray-300">Contains algorithm (alg) and token type (typ)</p>
          </div>
          <div>
            <h5 className="font-semibold text-purple-600 dark:text-purple-400 mb-1">Payload</h5>
            <p className="text-gray-600 dark:text-gray-300">Contains claims like user ID, roles, and expiration</p>
          </div>
          <div>
            <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Signature</h5>
            <p className="text-gray-600 dark:text-gray-300">Verifies token integrity (requires secret key)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
