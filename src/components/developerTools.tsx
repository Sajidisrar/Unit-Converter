// Move 'use client' to the very top of the file
'use client';
// JSON to CSV converter
function jsonToCsv(jsonStr: string): string {
  try {
    let arr = JSON.parse(jsonStr);
    if (!Array.isArray(arr)) {
      // If it's a single object, wrap in array
      if (typeof arr === 'object' && arr !== null) {
        arr = [arr];
      } else {
        return 'Input must be a JSON object or an array of objects';
      }
    }
    if (arr.length === 0 || typeof arr[0] !== 'object' || arr[0] === null) {
      return 'Input must be a JSON object or an array of objects';
    }
    // Collect all unique keys in all objects
    const keys = Array.from(
      arr.reduce((set: Set<string>, obj: Record<string, unknown>) => {
        if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(k => set.add(k));
        }
        return set;
      }, new Set<string>())
    );
    // Convert to CSV
    const escape = (v: unknown) => {
      // If value is array or object (but not null), use JSON.stringify
      let str: string;
      if (typeof v === 'object' && v !== null) {
        str = JSON.stringify(v);
      } else {
        str = String(v);
      }
      // Handle undefined/null as empty string
      if (typeof v === 'undefined' || v === null) {
        str = '';
      }
      // Escape quotes, handle commas, quotes, newlines
      if (str.includes('"')) {
        str = str.replace(/"/g, '""');
      }
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str}"`;
      }
      return str;
    };
    const header = keys.join(',');
    const rows = arr.map((obj: Record<string, string | number | boolean | null | undefined>) =>
      keys.map(k => escape(obj && typeof obj === 'object' ? obj[k as keyof typeof obj] : undefined)).join(',')
    );
    return [header, ...rows].join('\n');
  } catch {
    return 'Invalid JSON';
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

  // Unix Timestamp Converter
  const handleConvertTimestamp = () => {
    if (!timestampInput) {
      setTimestampOutput('');
      return;
    }
    // If input is numeric, treat as Unix timestamp
    if (/^\d+$/.test(timestampInput.trim())) {
      const num = Number(timestampInput);
      const date = new Date(num * 1000);
      setTimestampOutput(date.toISOString());
    } else {
      // Try parsing as date string
      const date = new Date(timestampInput);
      if (!isNaN(date.getTime())) {
        setTimestampOutput(Math.floor(date.getTime() / 1000).toString());
      } else {
        setTimestampOutput('Invalid input');
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

  // Helper for downloading CSV
  const handleDownloadCsv = (csv: string) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
                rows={5}
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
                  className="w-full h-40 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                  value={base64Output}
                />
              </div>
              <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1"
                  onClick={() => handleCopy(base64Output)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Base64 encoding</strong> is a widely used technique for converting binary data into a text-based format that can be safely transmitted and stored in environments that only support textual data. At its core, Base64 encoding transforms binary data&mdash;such as images, files, or any arbitrary byte stream&mdash;into a string of ASCII characters. This process is crucial because many communication protocols, data storage systems, and APIs are designed to handle only readable text, making the direct transmission or storage of raw binary data impractical or even impossible.
                <br /><br />
                The way <strong>Base64 encoding</strong> works is by grouping the original binary data into blocks of three bytes (24 bits). These 24 bits are then split into four groups of six bits each. Each six-bit group is mapped to a specific character in the Base64 alphabet, which consists of 64 unique characters: uppercase and lowercase letters (A-Z, a-z), digits (0-9), and two special characters (<code>+</code> and <code>/</code>). If the input data does not divide evenly into three-byte chunks, padding characters (<code>=</code>) are added to the output to ensure that the encoded string length is always a multiple of four. This systematic approach guarantees that the encoded data remains consistent and easily decodable.
                <br /><br />
                <strong>Base64 decoding</strong> is the reverse operation, converting a Base64-encoded string back into its original binary form. During decoding, the Base64 string is processed in four-character blocks, each representing 24 bits. These are then reassembled into the original bytes. This seamless conversion between binary and text formats is why Base64 is often referred to as a <strong>binary-to-text encoding scheme</strong>.
                <br /><br />
                The primary benefit of using Base64 encoding is that it enables the reliable and secure transmission of binary data over media that are designed to handle only textual data. For example, email protocols such as SMTP and MIME were originally designed to transfer text, so sending binary attachments (like images or documents) requires encoding them in Base64. Similarly, when embedding images directly into HTML or CSS as data URIs, Base64 encoding ensures that the image data is represented as plain text, making it compatible with web standards and easy to include within source code. <strong>APIs</strong> and <strong>web services</strong> also often use Base64 encoding to transmit binary files, authentication tokens, or cryptographic keys in JSON or XML payloads, which are inherently text-based formats.
                <br /><br />
                <strong>Common applications of Base64 encoding include:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Email attachments</strong>: Safely transmitting binary files (images, PDFs, etc.) via email by encoding them into a Base64 string.</li>
                  <li><strong>Web development</strong>: Embedding images and fonts in HTML, CSS, or SVG files using Base64-encoded data URIs, reducing the number of HTTP requests.</li>
                  <li><strong>APIs and data transmission</strong>: Sending binary data in JSON or XML payloads, such as file uploads, cryptographic signatures, or authentication tokens (e.g., JWTs).</li>
                  <li><strong>Data storage</strong>: Storing binary files in databases that only support textual data, such as certain SQL or NoSQL systems.</li>
                  <li><strong>Serialization</strong>: Encoding binary objects for transport over network protocols that expect text, including WebSockets or REST APIs.</li>
                </ul>
                <br />
                While Base64 encoding is highly versatile, it does have some limitations. One notable drawback is its efficiency: Base64-encoded data is approximately 33% larger than the original binary data due to the mapping of 3 bytes to 4 characters. This overhead can be significant when dealing with large files or bandwidth-constrained environments. Additionally, Base64 is not a form of encryption or data protection; it simply encodes data for compatibility, so sensitive information should still be encrypted before encoding if security is a concern.
                <br /><br />
                In summary, <strong>Base64 encoding and decoding</strong> are essential tools for modern software development, enabling seamless <strong>binary to text conversion</strong> for data transmission, storage, and interoperability between diverse systems. Whether you need to embed images in your web pages, send attachments via email, or safely transmit binary data through APIs, Base64 encoding ensures that your data remains intact and readable across platforms. Use this tool to quickly encode or decode Base64 strings, making your data transmission and storage tasks more efficient and reliable.
              </p>
            </div>
          )}
          {tool.title === 'JSON Formatter/Minifier' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Paste JSON here..."
                rows={10}
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
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>JSON Formatter and Minifier</strong> tools are essential for anyone working with <strong>JavaScript Object Notation (JSON)</strong>, the most popular data interchange format for web APIs, configuration files, and data storage. <br /><br />
                <strong>Formatting JSON</strong> means transforming compact, minified JSON into a human-readable, indented structure. This process makes it much easier to analyze, debug, and edit data. Developers often encounter minified JSON when working with APIs or logs, where all whitespace is removed to save bandwidth. A <strong>JSON formatter</strong> restores indentation and line breaks, making nested objects and arrays clear, improving readability and reducing errors during development or troubleshooting.<br /><br />
                <strong>Minifying JSON</strong> is the reverse process: all unnecessary whitespace, line breaks, and indentation are stripped away, resulting in a compact string. This is highly useful for production environments, where minimizing file size can lead to faster network transfers and reduced storage requirements. Minified JSON is ideal for embedding in web pages, APIs, or configuration files where efficiency is critical.<br /><br />
                <strong>Use Cases:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>API Development:</strong> Format API responses for easier debugging and validation.</li>
                  <li><strong>Configuration Files:</strong> Edit and review structured settings for apps and frameworks.</li>
                  <li><strong>Data Interchange:</strong> Prepare JSON for transmission between frontend and backend systems.</li>
                  <li><strong>Performance Optimization:</strong> Minify JSON to reduce payload size in web applications.</li>
                </ul>
                <br />
                <strong>Benefits:</strong> Readable JSON reduces errors and speeds up development, while minified JSON saves bandwidth and storage. Both formatting and minification are lossless, meaning no data is changed&mdash;only presentation.<br /><br />
                <strong>Limitations:</strong> Formatting large or deeply nested JSON can be slow in browsers or editors. Minification does not compress data as efficiently as binary formats, and minified files are hard to read without formatting.<br /><br />
                Use this tool to quickly <strong>beautify</strong> or <strong>compress</strong> your JSON for any workflow, from debugging to production deployment.
              </p>
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
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>URL Encoding and Decoding</strong> are fundamental processes in web development, ensuring that data transmitted in URLs is both safe and correctly interpreted by browsers and servers. <br /><br />
                <strong>URL encoding</strong> (also known as percent encoding) converts characters into a format that can be transmitted over the Internet. URLs can only contain a limited set of characters: letters, digits, and a few special characters like <code>- _ . ~</code>. Reserved characters such as <code>?</code>, <code>&amp;</code>, <code>=</code>, <code>/</code>, and spaces must be encoded to prevent misinterpretation. Encoding replaces these characters with a percent sign (%) followed by two hexadecimal digits representing the character’s ASCII value. For example, a space becomes <code>%20</code>, and an ampersand (&amp;) becomes <code>%26</code>.<br /><br />
                <strong>URL decoding</strong> reverses this process, converting percent-encoded sequences back into their original characters. This is crucial for interpreting data received from web forms, API requests, or redirects, where user input or special symbols may have been encoded.<br /><br />
                <strong>Use Cases:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Web Requests:</strong> Safely send query parameters or form data in GET/POST requests.</li>
                  <li><strong>APIs:</strong> Encode data in URLs to interact with RESTful endpoints.</li>
                  <li><strong>Bookmarking:</strong> Create shareable, valid URLs containing special characters.</li>
                  <li><strong>SEO:</strong> Ensure URLs are clean, readable, and standards-compliant for search engines.</li>
                </ul>
                <br />
                <strong>Benefits:</strong> URL encoding prevents errors and security issues by ensuring all data in a URL is interpreted correctly. It also enables the inclusion of non-ASCII and reserved characters in links.<br /><br />
                <strong>Limitations:</strong> Over-encoding can make URLs harder to read, and decoding is necessary to retrieve the original information. Not all characters need encoding, so understanding which ones are reserved is important.<br /><br />
                Use this tool to <strong>encode</strong> or <strong>decode</strong> URLs, query strings, and web data, ensuring compatibility and safety in all your web projects.
              </p>
            </div>
          )}
          {tool.title === 'Color Code Converter' && (
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
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Hex, RGB, and HSL Color Converters</strong> are indispensable tools for web designers, developers, and digital artists who work with colors in different coding and design environments.<br /><br />
                <strong>Hexadecimal (Hex)</strong> color codes are six-digit codes (e.g., <code>#FF5733</code>) widely used in HTML, CSS, and graphic design to represent colors. Each pair of digits corresponds to the red, green, and blue (RGB) components in hexadecimal (base 16).<br /><br />
                <strong>RGB (Red, Green, Blue)</strong> is another popular color model, representing colors through three integer values ranging from 0 to 255 (e.g., <code>255,87,51</code>). RGB is intuitive for digital displays, as it matches how screens emit colored light.<br /><br />
                <strong>HSL (Hue, Saturation, Lightness)</strong> is a cylindrical color model that describes colors more like artists do: <strong>hue</strong> (color type, 0&ndash;360&deg;), <strong>saturation</strong> (intensity, 0&ndash;100%), and <strong>lightness</strong> (brightness, 0&ndash;100%). HSL is especially useful for generating color palettes, adjusting tints/shades, and creating accessible designs.<br /><br />
                <strong>Use Cases:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Web Design:</strong> Convert between hex, RGB, and HSL to match CSS requirements or design tools.</li>
                  <li><strong>UI/UX:</strong> Generate accessible color schemes and gradients using HSL adjustments.</li>
                  <li><strong>Branding:</strong> Ensure consistent color representation across platforms and file formats.</li>
                  <li><strong>Digital Art:</strong> Translate color codes for use in Photoshop, Illustrator, or web projects.</li>
                </ul>
                <br />
                <strong>Benefits:</strong> Quick conversion between color models speeds up design workflows, ensures precision, and enhances cross-platform compatibility. HSL makes it easy to tweak colors for contrast and accessibility.<br /><br />
                <strong>Limitations:</strong> Some color models (like CMYK for print) are not covered here. Converting between models may result in rounding errors or slight color shifts.<br /><br />
                Use this tool to seamlessly switch between <strong>Hex, RGB, and HSL</strong> color formats, ensuring your designs look perfect everywhere&mdash;from code to canvas.
              </p>
            </div>
          )}
          {tool.title === 'Unix Timestamp Converter' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-20 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                placeholder="Enter Unix timestamp or date..."
                value={timestampInput}
                onChange={e => setTimestampInput(e.target.value)}
              />
              <button
                onClick={handleConvertTimestamp}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start"
                type="button"
              >Convert</button>
              <div className="flex gap-2 items-start">
                <textarea
                  readOnly
                  className="w-full h-20 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 mt-2 flex-1 not-italic"
                  value={timestampOutput}
                />
                <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-3"
                  onClick={() => handleCopy(timestampOutput)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Unix Timestamps</strong> are a universal method for representing a specific point in time as the number of seconds (or milliseconds) that have elapsed since January 1, 1970, 00:00:00 UTC&mdash;known as the Unix epoch.<br /><br />
                <strong>What is a Unix Timestamp?</strong> A Unix timestamp is a simple integer, such as <code>1687555200</code>, that counts the total seconds since the epoch. This format is widely used in programming, databases, and logging systems for its simplicity and cross-platform compatibility. Unix timestamps are timezone-independent, making them ideal for storing and comparing dates and times in distributed systems.<br /><br />
                <strong>Conversion and Use Cases:</strong> While Unix timestamps are efficient for computers, they are not human-readable. Converting a Unix timestamp to a human-readable date (e.g., <code>2023-06-24T00:00:00Z</code>) is essential for debugging, reporting, or displaying dates to users. This tool also converts human-readable dates back to Unix timestamps, simplifying tasks like scheduling, time calculations, or working with APIs and logs.<br /><br />
                <strong>Practical Applications:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Programming:</strong> Store and compare dates in databases, schedule tasks, or measure time intervals.</li>
                  <li><strong>APIs:</strong> Many APIs use Unix timestamps for date fields, ensuring consistent communication between systems.</li>
                  <li><strong>Logging:</strong> Record precise event times in logs for analytics, debugging, or auditing.</li>
                  <li><strong>Data Migration:</strong> Convert timestamps between systems or formats during ETL (Extract, Transform, Load) processes.</li>
                </ul>
                <br />
                <strong>Benefits:</strong> Unix timestamps are compact, unambiguous, and easy to manipulate in code. They avoid issues with timezones and date formatting.<br /><br />
                <strong>Limitations:</strong> Not human-friendly&mdash;conversion is needed for display or manual entry. Some systems use milliseconds instead of seconds, so care must be taken to use the correct unit.<br /><br />
                Use this tool to <strong>convert between Unix timestamps and readable dates</strong> for programming, logging, and data analysis tasks.
              </p>
            </div>
          )}
          {tool.title === 'HTML Entity Encoder/Decoder' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Enter HTML or text..."
                rows={7}
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
                  className="w-full h-40 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                  value={htmlOutput}
                />
                <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1"
                  onClick={() => handleCopy(htmlOutput)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>HTML Entity Encoder/Decoder</strong> tools are vital for web developers, content creators, and anyone working with HTML, XML, or web-based text. <br /><br />
                <strong>HTML entity encoding</strong> replaces reserved or special characters (like <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, <code>&quot;</code>, and <code>&apos;</code>) with their corresponding HTML entities (e.g., <code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;amp;</code>, <code>&amp;quot;</code>, <code>&amp;apos;</code>). This process ensures that the browser interprets the text as literal characters and not as HTML tags or code, preventing rendering issues and security vulnerabilities such as <strong>Cross-Site Scripting (XSS)</strong>.<br /><br />
                <strong>HTML entity decoding</strong> reverses this process, converting entities back to their original characters. This is crucial when displaying encoded data, extracting text from HTML sources, or preparing content for editing.<br /><br />
                <strong>Use Cases:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Web Security:</strong> Encode user input to prevent XSS attacks and code injection.</li>
                  <li><strong>Displaying Code:</strong> Show HTML, CSS, or JavaScript code on web pages without interpretation.</li>
                  <li><strong>Data Interchange:</strong> Safely transmit special characters in XML or JSON payloads.</li>
                  <li><strong>Content Management:</strong> Prepare text for WYSIWYG editors or blog platforms.</li>
                </ul>
                <br />
                <strong>Benefits:</strong> Encoding ensures that special characters are displayed safely and correctly, maintaining data integrity and protecting against security threats.<br /><br />
                <strong>Limitations:</strong> Over-encoding can make content harder to read, and decoding is required for editing or display. Not all characters require encoding, so selective use is best.<br /><br />
                Use this tool to <strong>encode or decode HTML entities</strong> for secure, standards-compliant, and user-friendly web content.
              </p>
            </div>
          )}
          {tool.title === 'Text ↔ ASCII' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Enter text or ASCII codes..."
                rows={7}
                value={textAsciiInput}
                onChange={e => setTextAsciiInput(e.target.value)}
              />
              <button onClick={handleTextAsciiConvert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start">Convert</button>
              <div className="flex gap-2 items-start">
                <textarea
                  readOnly
                  className="w-full h-40 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                  value={textAsciiOutput}
                />
                <button
                  className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1"
                  onClick={() => handleCopy(textAsciiOutput)}
                  tabIndex={0}
                  type="button"
                >Copy</button>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Text to ASCII and ASCII to Text Conversion</strong> is a powerful capability for developers, network engineers, and anyone working with data encoding or low-level communications.<br /><br />
                <strong>ASCII (American Standard Code for Information Interchange)</strong> is a character encoding standard that assigns a unique numeric code (0&ndash;127) to each letter, digit, punctuation mark, and control character. For example, the letter &quot;A&quot; is <code>65</code>, and &quot;a&quot; is <code>97</code>. Converting text to ASCII reveals the underlying codes, which are used in computers, communication protocols, and file formats.<br /><br />
                <strong>Text to ASCII conversion</strong> allows you to see or transmit the numeric representation of characters, which is useful for debugging, data transmission, or cryptography. <strong>ASCII to text conversion</strong> does the reverse, reconstructing readable messages from numeric codes.<br /><br />
                <strong>Use Cases:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Data Communication:</strong> Transmit data as ASCII codes over serial, network, or radio protocols.</li>
                  <li><strong>Debugging:</strong> Analyze or manipulate data streams at the byte/character level.</li>
                  <li><strong>Education:</strong> Learn about character encoding and digital data representation.</li>
                  <li><strong>Security:</strong> Encode or obfuscate messages for simple cryptographic schemes.</li>
                </ul>
                <br />
                <strong>Benefits:</strong> ASCII encoding is universally supported, lightweight, and easy to process in code. It forms the foundation for many modern encodings (like UTF-8).<br /><br />
                <strong>Limitations:</strong> ASCII is limited to 128 characters&mdash;no support for accented letters, emojis, or non-Latin scripts. For those, Unicode is required.<br /><br />
                Use this tool to <strong>convert text to ASCII codes and back</strong> for learning, debugging, or data transmission tasks.
              </p>
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
              <div className="flex flex-row">
                <button
                  onClick={handleNumberBaseConvert}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32 self-start"
                  type="button"
                >
                  Convert
                </button>
                <button
                  onClick={() => { setBinary(''); setDecimal(''); setHex(''); setOctal(''); }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 w-32 self-start ml-2"
                  type="button"
                >
                  Clear
                </button>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Number Base Converter</strong> tools are crucial for programmers, engineers, and students working with different numbering systems in computing and electronics.<br /><br />
                <strong>Binary (Base 2):</strong> Uses only 0 and 1. It&apos;s the fundamental language of computers, representing every value as a series of bits.<br />
                <strong>Decimal (Base 10):</strong> The standard system for human arithmetic, using digits 0&ndash;9.<br />
                <strong>Hexadecimal (Base 16):</strong> Uses digits 0&ndash;9 and letters A&ndash;F. Hex is compact and maps easily to binary, making it popular for representing colors, memory addresses, and machine code.<br />
                <strong>Octal (Base 8):</strong> Uses digits 0&ndash;7. While less common today, it&apos;s still found in legacy systems and Unix file permissions.<br /><br />
                <strong>Use Cases:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Programming:</strong> Convert between binary, decimal, hex, and octal for debugging, memory dumps, or low-level development.</li>
                  <li><strong>Networking:</strong> Interpret IP addresses, MAC addresses, or subnet masks in different bases.</li>
                  <li><strong>Web Development:</strong> Use hex for CSS colors, or binary for bitwise operations.</li>
                  <li><strong>Education:</strong> Learn how computers represent and manipulate numbers.</li>
                </ul>
                <br />
                <strong>Benefits:</strong> Instant conversion between bases saves time, reduces errors, and aids understanding of how computers process data.<br /><br />
                <strong>Limitations:</strong> Large numbers may be unwieldy in binary or octal. Some bases (like base-64 or base-36) are not included here.<br /><br />
                Use this tool to <strong>convert numbers between binary, decimal, hexadecimal, and octal</strong> for programming, electronics, or educational projects.
              </p>
            </div>
          )}
          {tool.title === 'JWT Decoder' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <textarea
                className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                placeholder="Paste JWT here..."
                rows={10}
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
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>JWT Decoder</strong> tools are essential for developers working with secure authentication and authorization in modern web applications.<br /><br />
                <strong>What is a JWT?</strong> A <strong>JSON Web Token (JWT)</strong> is a compact, URL-safe token format used to securely transmit information between parties. A JWT consists of three parts: <strong>header</strong>, <strong>payload</strong>, and <strong>signature</strong>, separated by dots (<code>.</code>). The header specifies the algorithm and token type; the payload contains claims (such as user ID, roles, or expiration); and the signature ensures integrity by allowing the recipient to verify that the payload hasn&apos;t been tampered with.<br /><br />
                <strong>JWT Structure:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Header:</strong> Encoded in Base64Url, contains algorithm and type (e.g., <code>&#123;&quot;alg&quot;:&quot;HS256&quot;,&quot;typ&quot;:&quot;JWT&quot;&#125;</code>).</li>
                  <li><strong>Payload:</strong> Encoded in Base64Url, holds user data and claims (e.g., <code>&#123;&quot;sub&quot;:&quot;1234567890&quot;,&quot;name&quot;:&quot;John Doe&quot;&#125;</code>).</li>
                  <li><strong>Signature:</strong> Cryptographic hash of the header and payload, signed with a secret key.</li>
                </ul>
                <br />
               <strong>Use Cases:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Authentication:</strong> Securely identify users in web/mobile apps (stateless sessions).</li>
                  <li><strong>Authorization:</strong> Grant or restrict access to resources based on JWTs claims.</li>
                  <li><strong>API Security:</strong> Pass identity and permissions between microservices or client/server.</li>
                  <li><strong>Debugging:</strong> Inspect JWTs to verify claims, expiration, or troubleshoot authentication issues.</li>
                </ul>
                <br />
                <strong>Benefits:</strong> JWTs are compact, portable, and self-contained. They enable stateless authentication, easy scaling, and secure data transmission.<br /><br />
                <strong>Limitations:</strong> JWTs are only as secure as their signing key&mdash;never share secrets. Decoding a JWT does not verify it&apos;s signature; always validate tokens server-side.<br /><br />
                Use this tool to <strong>decode JWTs</strong> and inspect their contents for debugging, learning, or security analysis.
              </p>
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
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>CSS Unit Converter</strong> tools are essential for responsive web design, accessibility, and cross-device consistency.<br /><br />
                <strong>Common CSS units:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>px (Pixels):</strong> Absolute unit representing a single screen pixel. Simple but not scalable for different devices or user settings.</li>
                  <li><strong>em:</strong> Relative to the font size of the current element. Useful for scaling components within a design system.</li>
                  <li><strong>rem (Root em):</strong> Relative to the root (HTML) element&apos;s font size. Provides consistent scaling across an entire page.</li>
                </ul>
                <br />
                <strong>Use Cases:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Responsive Design:</strong> Convert px to rem/em for layouts that adapt to user preferences and device resolutions.</li>
                  <li><strong>Accessibility:</strong> Use rem/em units so users can resize text for better readability.</li>
                  <li><strong>Design Systems:</strong> Maintain consistent spacing, sizing, and typography by using relative units.</li>
                  <li><strong>Cross-platform:</strong> Ensure UI elements look correct on mobile, tablet, and desktop screens.</li>
                </ul>
                <br />
                <strong>Benefits:</strong> Relative units like rem and em improve scalability, accessibility, and maintainability of web projects.<br /><br />
                <strong>Limitations:</strong> Relative units depend on base font size (usually 16px); unexpected results may occur if the root size is changed. Pixels are not device-independent.<br /><br />
                Use this tool to <strong>convert between px, rem, and em</strong> for modern, accessible, and responsive CSS.
              </p>
            </div>
          )}
          {tool.title === 'JSON to CSV Converter' && (
            <div className="w-full h-full flex flex-col gap-3 flex-1">
              <div className="flex gap-4 w-full">
                <div className="flex flex-col w-1/2 gap-2">
                  <textarea
                    className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-1"
                    placeholder='Paste JSON object or array of objects here...'
                    rows={25}
                    value={jsonToCsvInput}
                    onChange={e => setJsonToCsvInput(e.target.value)}
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={jsonToCsvConvert}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-32"
                      type="button"
                    >Convert</button>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 gap-2">
                  <textarea
                    readOnly
                    className="w-full h-28 rounded p-2 border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 flex-1"
                    value={jsonToCsvOutput}
                  />
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 mt-1"
                      onClick={() => handleCopy(jsonToCsvOutput)}
                      tabIndex={0}
                      type="button"
                    >Copy</button>
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 mt-1"
                      onClick={() => handleDownloadCsv(jsonToCsvOutput)}
                      tabIndex={0}
                      type="button"
                    >
                      Download CSV
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>JSON to CSV Converter</strong> tools are vital for data analysts, developers, and anyone needing to transfer data between modern applications and traditional tools like spreadsheets.<br /><br />
                <strong>JSON (JavaScript Object Notation)</strong> is a flexible, hierarchical data format used for APIs, configuration files, and web applications. <strong>CSV (Comma-Separated Values)</strong> is a simple, flat format where each row represents a record and each column a field, widely supported by Excel, Google Sheets, and databases.<br /><br />
                <strong>Why convert JSON to CSV?</strong> Many analytics, reporting, and business tools require CSV input. Converting JSON arrays of objects into CSV makes it easy to import data into Excel, perform bulk edits, or load into SQL databases.<br /><br />
                <strong>Use Cases:</strong>
                <ul className="list-disc ml-5">
                  <li><strong>Data Analytics:</strong> Analyze API exports or web app data in Excel or Google Sheets.</li>
                  <li><strong>Reporting:</strong> Generate CSV files for business reports, dashboards, or data sharing.</li>
                  <li><strong>ETL Pipelines:</strong> Prepare JSON data for import into relational databases or data warehouses.</li>
                  <li><strong>Interoperability:</strong> Move data between modern apps (JSON) and legacy systems (CSV).</li>
                </ul>
                <br />
                <strong>Benefits:</strong> CSV is fast to read, easy to edit, and supported everywhere. Converting from JSON unlocks powerful spreadsheet and analytics capabilities.<br /><br />
                <strong>Limitations:</strong> CSV can&apos;t represent nested or hierarchical data&mdash;only flat tables. Data may need to be normalized or simplified before conversion.<br /><br />
                Use this tool to <strong>convert JSON to CSV</strong> for seamless data analysis, reporting, and integration with spreadsheet tools.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}