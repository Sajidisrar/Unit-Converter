// Move 'use client' to the very top of the file
'use client';
// JSON to CSV converter
function jsonToCsv(jsonStr: string): string {
  try {
    const arr = JSON.parse(jsonStr);
    if (!Array.isArray(arr) || arr.length === 0 || typeof arr[0] !== 'object') {
      return 'Input must be a JSON array of objects';
    }
    // Collect all unique keys in all objects
    const keys = Array.from(
      arr.reduce((set: Set<string>, obj: Record<string, unknown>) => {
        Object.keys(obj).forEach(k => set.add(k));
        return set;
      }, new Set<string>())
    );
    // Convert to CSV
    const escape = (v: unknown) =>
      typeof v === 'undefined' || v === null
        ? ''
        : String(v).replace(/"/g, '""').includes(',') || String(v).includes('"') || String(v).includes('\n')
        ? `"${String(v).replace(/"/g, '""')}"`
        : String(v);
    const header = keys.join(',');
    const rows = arr.map((obj: Record<string, string | number | boolean | null | undefined>) =>
      keys.map(k => escape(obj[k as keyof typeof obj])).join(',')
    );
    return [header, ...rows].join('\n');
  } catch {
    return 'Invalid JSON array';
  }
}

import React, { useState } from 'react';

type Tool = {
  title: string;
  description: string;
  slug: string;
};

function base64Encode(input: string) {
  try {
    return btoa(input);
  } catch {
    return 'Invalid input for Base64 encoding';
  }
}

function base64Decode(input: string) {
  try {
    return atob(input);
  } catch {
    return 'Invalid Base64 string';
  }
}

function jsonFormat(input: string) {
  try {
    const obj = JSON.parse(input);
    return JSON.stringify(obj, null, 2);
  } catch {
    return 'Invalid JSON';
  }
}

function jsonMinify(input: string) {
  try {
    const obj = JSON.parse(input);
    return JSON.stringify(obj);
  } catch {
    return 'Invalid JSON';
  }
}

function urlEncode(input: string) {
  try {
    return encodeURIComponent(input);
  } catch {
    return 'Invalid input';
  }
}

function urlDecode(input: string) {
  try {
    return decodeURIComponent(input);
  } catch {
    return 'Invalid input';
  }
}

function htmlEntityEncode(input: string) {
  const textArea = document.createElement('textarea');
  textArea.textContent = input;
  return textArea.innerHTML;
}

function htmlEntityDecode(input: string) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = input;
  return textArea.textContent || '';
}

function textToAscii(input: string) {
  return input.split('').map(c => c.charCodeAt(0)).join(' ');
}

function asciiToText(input: string) {
  try {
    return input
      .split(' ')
      .map(code => String.fromCharCode(parseInt(code, 10)))
      .join('');
  } catch {
    return 'Invalid ASCII codes';
  }
}

function jwtDecode(input: string) {
  try {
    const parts = input.split('.');
    if (parts.length !== 3) return 'Invalid JWT';
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.stringify(JSON.parse(decoded), null, 2);
  } catch {
    return 'Invalid JWT';
  }
}

function hexToRgb(hex: string) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function parseRgb(input: string) {
  const parts = input.split(',').map(p => p.trim());
  if (parts.length !== 3) return null;
  const r = parseInt(parts[0], 10);
  const g = parseInt(parts[1], 10);
  const b = parseInt(parts[2], 10);
  if ([r, g, b].some(n => isNaN(n) || n < 0 || n > 255)) return null;
  return { r, g, b };
}

function parseHsl(input: string) {
  const parts = input.split(',').map(p => p.trim());
  if (parts.length !== 3) return null;
  const h = parseInt(parts[0], 10);
  const s = parts[1].endsWith('%') ? parseInt(parts[1], 10) : NaN;
  const l = parts[2].endsWith('%') ? parseInt(parts[2], 10) : NaN;
  if (
    isNaN(h) ||
    isNaN(s) ||
    isNaN(l) ||
    h < 0 ||
    h > 360 ||
    s < 0 ||
    s > 100 ||
    l < 0 ||
    l > 100
  )
    return null;
  return { h, s, l };
}

function binaryToDecimal(bin: string) {
  return parseInt(bin, 2);
}

function decimalToBinary(dec: number) {
  return dec.toString(2);
}

function decimalToHex(dec: number) {
  return dec.toString(16).toUpperCase();
}

function hexToDecimal(hex: string) {
  return parseInt(hex, 16);
}

function decimalToOctal(dec: number) {
  return dec.toString(8);
}

function octalToDecimal(oct: string) {
  return parseInt(oct, 8);
}

const rootFontSize = 16;

export default function DeveloperTools({ tool }: { tool: Tool }) {
  // JSON to CSV Converter
  const [jsonToCsvInput, setJsonToCsvInput] = useState('');
  const [jsonToCsvOutput, setJsonToCsvOutput] = useState('');
  // Handler for JSON to CSV
  const jsonToCsvConvert = () => {
    setJsonToCsvOutput(jsonToCsv(jsonToCsvInput));
  };
  // Base64 Encoder/Decoder
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');

  // JSON Formatter/Minifier
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');

  // URL Encoder/Decoder
  const [urlInput, setUrlInput] = useState('');
  const [urlOutput, setUrlOutput] = useState('');

  // Hex ↔ RGB ↔ HSL
  const [hexInput, setHexInput] = useState('');
  const [rgbInput, setRgbInput] = useState('');
  const [hslInput, setHslInput] = useState('');
  const [colorOutput, setColorOutput] = useState({ hex: '', rgb: '', hsl: '' });

  // Unix Timestamp
  const [timestampInput, setTimestampInput] = useState('');
  const [timestampOutput, setTimestampOutput] = useState('');

  // HTML Entity Encoder/Decoder
  const [htmlInput, setHtmlInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');

  // Text ↔ ASCII
  const [textAsciiInput, setTextAsciiInput] = useState('');
  const [textAsciiOutput, setTextAsciiOutput] = useState('');

  // Number Base Converter
  const [binary, setBinary] = useState('');
  const [decimal, setDecimal] = useState('');
  const [hex, setHex] = useState('');
  const [octal, setOctal] = useState('');

  // JWT Decoder
  const [jwtInput, setJwtInput] = useState('');
  const [jwtOutput, setJwtOutput] = useState('');

  // CSS Unit Converter
  const [cssValue, setCssValue] = useState('');
  const [cssUnit, setCssUnit] = useState('px');
  const [cssOutput, setCssOutput] = useState('');

  // Handlers for each tool
  const handleBase64Encode = () => {
    setBase64Output(base64Encode(base64Input));
  };

  const handleBase64Decode = () => {
    setBase64Output(base64Decode(base64Input));
  };

  const handleJsonFormat = () => {
    setJsonOutput(jsonFormat(jsonInput));
  };

  const handleJsonMinify = () => {
    setJsonOutput(jsonMinify(jsonInput));
  };

  const handleUrlEncode = () => {
    setUrlOutput(urlEncode(urlInput));
  };

  const handleUrlDecode = () => {
    setUrlOutput(urlDecode(urlInput));
  };

  const handleColorConvert = () => {
    // Priority: Hex -> RGB -> HSL
    if (hexInput) {
      const rgb = hexToRgb(hexInput);
      if (!rgb) {
        setColorOutput({ hex: 'Invalid Hex', rgb: '', hsl: '' });
        return;
      }
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColorOutput({
        hex: hexInput.startsWith('#') ? hexInput.toUpperCase() : '#' + hexInput.toUpperCase(),
        rgb: `${rgb.r},${rgb.g},${rgb.b}`,
        hsl: `${hsl.h},${hsl.s}%,${hsl.l}%`,
      });
      setRgbInput(`${rgb.r},${rgb.g},${rgb.b}`);
      setHslInput(`${hsl.h},${hsl.s}%,${hsl.l}%`);
    } else if (rgbInput) {
      const rgb = parseRgb(rgbInput);
      if (!rgb) {
        setColorOutput({ hex: '', rgb: 'Invalid RGB', hsl: '' });
        return;
      }
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColorOutput({
        hex,
        rgb: rgbInput,
        hsl: `${hsl.h},${hsl.s}%,${hsl.l}%`,
      });
      setHexInput(hex);
      setHslInput(`${hsl.h},${hsl.s}%,${hsl.l}%`);
    } else if (hslInput) {
      const hsl = parseHsl(hslInput);
      if (!hsl) {
        setColorOutput({ hex: '', rgb: '', hsl: 'Invalid HSL' });
        return;
      }
      const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      setColorOutput({
        hex,
        rgb: `${rgb.r},${rgb.g},${rgb.b}`,
        hsl: hslInput,
      });
      setHexInput(hex);
      setRgbInput(`${rgb.r},${rgb.g},${rgb.b}`);
    } else {
      setColorOutput({ hex: '', rgb: '', hsl: '' });
    }
  };

  const handleTimestampConvert = () => {
    const input = timestampInput.trim();
    if (/^\d+$/.test(input)) {
      // Unix timestamp to date
      const num = Number(input);
      // Determine if seconds or milliseconds
      const date =
        input.length === 10 ? new Date(num * 1000) : new Date(num);
      if (isNaN(date.getTime())) {
        setTimestampOutput('Invalid timestamp');
      } else {
        setTimestampOutput(date.toISOString());
      }
    } else {
      // Date to unix timestamp
      const date = new Date(input);
      if (isNaN(date.getTime())) {
        setTimestampOutput('Invalid date');
      } else {
        setTimestampOutput(Math.floor(date.getTime() / 1000).toString());
      }
    }
  };

  const handleHtmlEncode = () => {
    setHtmlOutput(htmlEntityEncode(htmlInput));
  };

  const handleHtmlDecode = () => {
    setHtmlOutput(htmlEntityDecode(htmlInput));
  };

  const handleTextAsciiConvert = () => {
    // Determine if input is ascii codes or text
    if (/^[\d\s]+$/.test(textAsciiInput.trim())) {
      setTextAsciiOutput(asciiToText(textAsciiInput.trim()));
    } else {
      setTextAsciiOutput(textToAscii(textAsciiInput));
    }
  };

  const handleNumberBaseConvert = () => {
    // Try decimal first if decimal input is valid
    if (decimal !== '') {
      const dec = Number(decimal);
      if (!isNaN(dec) && dec >= 0) {
        setBinary(decimalToBinary(dec));
        setHex(decimalToHex(dec));
        setOctal(decimalToOctal(dec));
        return;
      }
    }
    // Try binary
    if (binary !== '') {
      if (/^[01]+$/.test(binary)) {
        const dec = binaryToDecimal(binary);
        setDecimal(dec.toString());
        setHex(decimalToHex(dec));
        setOctal(decimalToOctal(dec));
        return;
      }
    }
    // Try hex
    if (hex !== '') {
      if (/^[a-fA-F0-9]+$/.test(hex)) {
        const dec = hexToDecimal(hex);
        setDecimal(dec.toString());
        setBinary(decimalToBinary(dec));
        setOctal(decimalToOctal(dec));
        return;
      }
    }
    // Try octal
    if (octal !== '') {
      if (/^[0-7]+$/.test(octal)) {
        const dec = octalToDecimal(octal);
        setDecimal(dec.toString());
        setBinary(decimalToBinary(dec));
        setHex(decimalToHex(dec));
        return;
      }
    }
  };

  const handleJwtDecode = () => {
    setJwtOutput(jwtDecode(jwtInput));
  };

  const handleCssConvert = () => {
    const val = parseFloat(cssValue);
    if (isNaN(val)) {
      setCssOutput('Invalid input');
      return;
    }
    let pxVal = 0;
    if (cssUnit === 'px') {
      pxVal = val;
    } else if (cssUnit === 'rem' || cssUnit === 'em') {
      pxVal = val * rootFontSize;
    } else {
      setCssOutput('Invalid unit');
      return;
    }
    const rem = pxVal / rootFontSize;
    const px = pxVal;
    const em = rem;
    setCssOutput(`px: ${px.toFixed(2)}, rem: ${rem.toFixed(2)}, em: ${em.toFixed(2)}`);
  };

  // Helper for copy button
  const handleCopy = (text: string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="flex min-h-[500px] rounded-xl bg-gradient-to-br from-gray-100 to-gray-300 dark:from-zinc-900 dark:to-zinc-800 shadow-lg overflow-hidden w-full h-full">
      {/* Sidebar */}
      
      {/* Content */}
      <section className="w-full h-full flex flex-col flex-1 p-0 bg-white dark:bg-zinc-900">
        {/* Tool title removed from top of editor area */}
        <div className="w-full h-full flex flex-col bg-gray-100 dark:bg-zinc-800 rounded-lg min-h-[200px] p-6 text-gray-900 dark:text-gray-100 font-mono overflow-auto flex-1">
          {tool.title === 'Base64 Encoder/Decoder' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Enter text to encode or decode..."
                value={base64Input}
                onChange={e => setBase64Input(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={handleBase64Encode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">Encode</button>
                <button onClick={handleBase64Decode} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">Decode</button>
              </div>
              <div className="flex gap-2 items-start">
                <textarea
                  readOnly
                  className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                  value={base64Output}
                />
                <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1"
                  onClick={() => handleCopy(base64Output)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
            </div>
          )}
          {tool.title === 'JSON Formatter/Minifier' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Paste JSON here..."
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleJsonFormat}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                  type="button"
                >Format</button>
                <button
                  onClick={handleJsonMinify}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                  type="button"
                >Minify</button>
              </div>
              <textarea
                readOnly
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                value={jsonOutput}
              />
              <button
                className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1 w-24"
                onClick={() => handleCopy(jsonOutput)}
                tabIndex={0}
                type="button"
              >Copy</button>
            </div>
          )}
          {tool.title === 'URL Encoder/Decoder' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Enter URL or text..."
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={handleUrlEncode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" type="button">Encode</button>
                <button onClick={handleUrlDecode} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800" type="button">Decode</button>
              </div>
              <textarea
                readOnly
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                value={urlOutput}
              />
              <button
                className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1 w-24"
                onClick={() => handleCopy(urlOutput)}
                tabIndex={0}
                type="button"
              >Copy</button>
            </div>
          )}
          {tool.title === 'Hex ↔ RGB ↔ HSL' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <div className="flex flex-col gap-2">
                <input
                  className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  placeholder="Hex (#FFFFFF)"
                  value={hexInput}
                  onChange={e => setHexInput(e.target.value)}
                />
                <input
                  className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  placeholder="RGB (e.g. 255,255,255)"
                  value={rgbInput}
                  onChange={e => setRgbInput(e.target.value)}
                />
                <input
                  className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  placeholder="HSL (e.g. 0,0%,100%)"
                  value={hslInput}
                  onChange={e => setHslInput(e.target.value)}
                />
              </div>
              <button onClick={handleColorConvert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start">Convert</button>
              <div className="mt-2 whitespace-pre-wrap w-full flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span>Hex: {colorOutput.hex}</span>
                  <button
                    className="px-2 py-1 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500"
                    onClick={() => handleCopy(colorOutput.hex)}
                    tabIndex={0}
                    type="button"
                  >Copy</button>
                </div>
                <div className="flex items-center gap-2">
                  <span>RGB: {colorOutput.rgb}</span>
                  <button
                    className="px-2 py-1 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500"
                    onClick={() => handleCopy(colorOutput.rgb)}
                    tabIndex={0}
                    type="button"
                  >Copy</button>
                </div>
                <div className="flex items-center gap-2">
                  <span>HSL: {colorOutput.hsl}</span>
                  <button
                    className="px-2 py-1 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500"
                    onClick={() => handleCopy(colorOutput.hsl)}
                    tabIndex={0}
                    type="button"
                  >Copy</button>
                </div>
              </div>
            </div>
          )}
          {tool.title === 'Unix Timestamp' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <input
                className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                placeholder="Enter Unix timestamp or date..."
                value={timestampInput}
                onChange={e => setTimestampInput(e.target.value)}
              />
              <button onClick={handleTimestampConvert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start">Convert</button>
              <div className="flex gap-2 items-start">
                <textarea
                  readOnly
                  className="w-full h-20 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 mt-2 flex-1"
                  value={timestampOutput}
                />
                <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-3"
                  onClick={() => handleCopy(timestampOutput)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
            </div>
          )}
          {tool.title === 'HTML Entity Encoder/Decoder' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Enter HTML or text..."
                value={htmlInput}
                onChange={e => setHtmlInput(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={handleHtmlEncode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">Encode</button>
                <button onClick={handleHtmlDecode} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">Decode</button>
              </div>
              <div className="flex gap-2 items-start">
                <textarea
                  readOnly
                  className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                  value={htmlOutput}
                />
                <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1"
                  onClick={() => handleCopy(htmlOutput)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
            </div>
          )}
          {tool.title === 'Text ↔ ASCII' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Enter text or ASCII codes..."
                value={textAsciiInput}
                onChange={e => setTextAsciiInput(e.target.value)}
              />
              <button onClick={handleTextAsciiConvert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start">Convert</button>
              <div className="flex gap-2 items-start">
                <textarea
                  readOnly
                  className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                  value={textAsciiOutput}
                />
                <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1"
                  onClick={() => handleCopy(textAsciiOutput)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
            </div>
          )}
          {tool.title === 'Number Base Converter' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <div className="flex flex-col gap-2">
                <input
                  className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  placeholder="Binary"
                  value={binary}
                  onChange={e => setBinary(e.target.value)}
                />
                <input
                  className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  placeholder="Decimal"
                  value={decimal}
                  onChange={e => setDecimal(e.target.value)}
                />
                <input
                  className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  placeholder="Hexadecimal"
                  value={hex}
                  onChange={e => setHex(e.target.value)}
                />
                <input
                  className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  placeholder="Octal"
                  value={octal}
                  onChange={e => setOctal(e.target.value)}
                />
              </div>
              <button onClick={handleNumberBaseConvert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start">Convert</button>
            </div>
          )}
          {tool.title === 'JWT Decoder' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Paste JWT here..."
                value={jwtInput}
                onChange={e => setJwtInput(e.target.value)}
              />
              <button onClick={handleJwtDecode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start">Decode</button>
              <div className="flex gap-2 items-start">
                <textarea
                  readOnly
                  className="w-full h-48 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 mt-2 flex-1"
                  value={jwtOutput}
                />
                <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-3"
                  onClick={() => handleCopy(jwtOutput)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
            </div>
          )}
          {tool.title === 'CSS Unit Converter' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <div className="flex flex-col gap-2">
                <input
                  className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  placeholder="Value (e.g. 16)"
                  value={cssValue}
                  onChange={e => setCssValue(e.target.value)}
                />
                <select
                  className="w-full rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  value={cssUnit}
                  onChange={e => setCssUnit(e.target.value)}
                >
                  <option value="px">px</option>
                  <option value="rem">rem</option>
                  <option value="em">em</option>
                </select>
              </div>
              <button onClick={handleCssConvert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start">Convert</button>
              <div className="mt-2 whitespace-pre-wrap w-full flex items-center gap-2">
                <span>{cssOutput}</span>
                <button
                  className="px-2 py-1 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500"
                  onClick={() => handleCopy(cssOutput)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
            </div>
          )}
          {tool.title === 'JSON to CSV Converter' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder='Paste JSON array of objects here...'
                value={jsonToCsvInput}
                onChange={e => setJsonToCsvInput(e.target.value)}
              />
              <button
                onClick={jsonToCsvConvert}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start"
                type="button"
              >Convert</button>
              <div className="flex gap-2 items-start">
                <textarea
                  readOnly
                  className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                  value={jsonToCsvOutput}
                />
                <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1"
                  onClick={() => handleCopy(jsonToCsvOutput)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}