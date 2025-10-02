'use client';

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  cmyk: { c: number; m: number; y: number; k: number };
}

export default function ColorConverter() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [colorValues, setColorValues] = useState<ColorValues>({
    hex: '#3B82F6',
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 },
    hsv: { h: 217, s: 76, v: 96 },
    cmyk: { c: 76, m: 47, y: 0, k: 4 }
  });
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'hex' | 'rgb' | 'hsl'>('hex');

  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert RGB to HSV
  const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  };

  // Convert RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, Math.max(g, b));
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  // Update all color values when color changes
  const updateColorValues = useCallback((hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    setColorValues({
      hex,
      rgb,
      hsl,
      hsv,
      cmyk
    });
  }, []);

  // Handle color picker change
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateColorValues(color);
  };

  // Handle manual input
  const handleInputSubmit = () => {
    try {
      let hex = '';
      
      if (inputType === 'hex') {
        hex = inputValue.startsWith('#') ? inputValue : `#${inputValue}`;
        if (!/^#[0-9A-F]{6}$/i.test(hex)) throw new Error('Invalid hex');
      } else if (inputType === 'rgb') {
        const match = inputValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!match) throw new Error('Invalid RGB format');
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        if (r > 255 || g > 255 || b > 255) throw new Error('RGB values must be 0-255');
        hex = rgbToHex(r, g, b);
      } else if (inputType === 'hsl') {
        const match = inputValue.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!match) throw new Error('Invalid HSL format');
        // Convert HSL to RGB then to hex (simplified)
        const h = parseInt(match[1]) / 360;
        const s = parseInt(match[2]) / 100;
        const l = parseInt(match[3]) / 100;
        
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };

        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
        }

        hex = rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
      }

      setSelectedColor(hex);
      updateColorValues(hex);
      setInputValue('');
    } catch {
      alert('Invalid color format. Please check your input.');
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    updateColorValues(selectedColor);
  }, [selectedColor, updateColorValues]);

  return (
    <>
      <Head>
        <title>Color Converter Tool - HEX, RGB, HSL, HSV, CMYK Converter</title>
        <meta name="description" content="Free online color converter tool. Convert between HEX, RGB, HSL, HSV, and CMYK color formats instantly. Perfect for designers, developers, and digital artists." />
        <meta name="keywords" content="color converter, hex to rgb, rgb to hex, hsl converter, hsv converter, cmyk converter, color picker, web colors, design tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/color-converter" />
        <meta property="og:title" content="Color Converter Tool - HEX, RGB, HSL, HSV, CMYK" />
        <meta property="og:description" content="Convert between different color formats instantly with our free online color converter tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/color-converter" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Color Converter Tool
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Convert between HEX, RGB, HSL, HSV, and CMYK color formats instantly. Perfect for designers, developers, and digital artists.
            </p>
          </div>

          <main className="max-w-6xl mx-auto">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
              {/* Color Picker Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Color Picker</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-20 h-20 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div 
                          className="w-full h-20 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                          style={{ backgroundColor: selectedColor }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Manual Input */}
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <select
                          value={inputType}
                          onChange={(e) => setInputType(e.target.value as 'hex' | 'rgb' | 'hsl')}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="hex">HEX</option>
                          <option value="rgb">RGB</option>
                          <option value="hsl">HSL</option>
                        </select>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={
                            inputType === 'hex' ? '#FF5733 or FF5733' :
                            inputType === 'rgb' ? 'rgb(255, 87, 51)' :
                            'hsl(14, 100%, 60%)'
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <button
                          onClick={handleInputSubmit}
                          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                        >
                          Convert
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Values Display */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Color Values</h3>
                  <div className="space-y-3">
                    {/* HEX */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">HEX:</span>
                        <span className="ml-2 font-mono text-gray-900 dark:text-white">{colorValues.hex}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(colorValues.hex)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                      >
                        Copy
                      </button>
                    </div>

                    {/* RGB */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">RGB:</span>
                        <span className="ml-2 font-mono text-gray-900 dark:text-white">
                          rgb({colorValues.rgb.r}, {colorValues.rgb.g}, {colorValues.rgb.b})
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`rgb(${colorValues.rgb.r}, ${colorValues.rgb.g}, ${colorValues.rgb.b})`)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                      >
                        Copy
                      </button>
                    </div>

                    {/* HSL */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">HSL:</span>
                        <span className="ml-2 font-mono text-gray-900 dark:text-white">
                          hsl({colorValues.hsl.h}, {colorValues.hsl.s}%, {colorValues.hsl.l}%)
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`hsl(${colorValues.hsl.h}, ${colorValues.hsl.s}%, ${colorValues.hsl.l}%)`)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                      >
                        Copy
                      </button>
                    </div>

                    {/* HSV */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">HSV:</span>
                        <span className="ml-2 font-mono text-gray-900 dark:text-white">
                          hsv({colorValues.hsv.h}, {colorValues.hsv.s}%, {colorValues.hsv.v}%)
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`hsv(${colorValues.hsv.h}, ${colorValues.hsv.s}%, ${colorValues.hsv.v}%)`)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                      >
                        Copy
                      </button>
                    </div>

                    {/* CMYK */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">CMYK:</span>
                        <span className="ml-2 font-mono text-gray-900 dark:text-white">
                          cmyk({colorValues.cmyk.c}%, {colorValues.cmyk.m}%, {colorValues.cmyk.y}%, {colorValues.cmyk.k}%)
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`cmyk(${colorValues.cmyk.c}%, ${colorValues.cmyk.m}%, ${colorValues.cmyk.y}%, ${colorValues.cmyk.k}%)`)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <AdBanner position="inline" />
            </div>

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Complete Color Conversion Guide</h2>
              
              {/* What is Color Conversion */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Understanding Color Formats & Conversion</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Color conversion transforms colors between different formats like <strong>HEX</strong>, <strong>RGB</strong>, <strong>HSL</strong>, <strong>HSV</strong>, and <strong>CMYK</strong>. Essential for web designers, graphic artists, and developers working with digital and print media. Our free color picker and converter handles all major color spaces with precision.
                </p>
              </div>

              {/* Color Format Guide */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Color Format Reference Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">🌐 HEX Colors</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Hexadecimal format (#RRGGBB)</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Web development standard</li>
                      <li>• CSS and HTML compatible</li>
                      <li>• 6-digit format (#FF5733)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">🖥️ RGB Colors</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Red, Green, Blue (0-255)</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Digital displays</li>
                      <li>• Screen color mixing</li>
                      <li>• Programming interfaces</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🎨 HSL Colors</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Hue, Saturation, Lightness</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Intuitive color selection</li>
                      <li>• Design-friendly format</li>
                      <li>• Color harmony creation</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">🔧 HSV Colors</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Hue, Saturation, Value</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Color picker interfaces</li>
                      <li>• Image processing</li>
                      <li>• Graphics software</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">🖨️ CMYK Colors</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Cyan, Magenta, Yellow, Black</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Print design standard</li>
                      <li>• Professional printing</li>
                      <li>• Offset printing process</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Use Cases */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Professional Color Conversion Use Cases</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">🎯 Web Development</h4>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                      <li>• CSS color specification</li>
                      <li>• Brand color implementation</li>
                      <li>• Accessibility compliance (WCAG)</li>
                      <li>• Theme and design systems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">🎨 Graphic Design</h4>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                      <li>• Print to digital conversion</li>
                      <li>• Brand guideline creation</li>
                      <li>• Color palette development</li>
                      <li>• Cross-media consistency</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">🤖 AI & Data Science</h4>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                      <li>• Computer vision preprocessing</li>
                      <li>• Image analysis workflows</li>
                      <li>• Data visualization color schemes</li>
                      <li>• Machine learning color features</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">📱 UI/UX Design</h4>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                      <li>• Mobile app color schemes</li>
                      <li>• Accessibility testing</li>
                      <li>• Dark/light theme creation</li>
                      <li>• Design token generation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">💡 Professional Color Tips</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <strong>Web Design:</strong> Use HEX for CSS, ensure contrast ratios meet WCAG AA standards (4.5:1 for normal text).
                  </div>
                  <div>
                    <strong>Print Design:</strong> Always convert to CMYK before printing. RGB colors may appear different in print.
                  </div>
                  <div>
                    <strong>Brand Colors:</strong> Document all color formats (HEX, RGB, CMYK) in brand guidelines for consistency.
                  </div>
                  <div>
                    <strong>Accessibility:</strong> Test color combinations with tools to ensure they&apos;re accessible to colorblind users.
                  </div>
                </div>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/color-converter" />
          </main>
        </div>
      </div>
    </>
  );
}
