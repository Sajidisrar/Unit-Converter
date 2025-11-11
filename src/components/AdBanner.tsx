"use client";
import { useEffect, useRef, useState } from 'react';

// Extend the Window interface to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

interface AdBannerProps {
  position: 'top' | 'side' | 'inline' | 'left' | 'right';
  className?: string;
}

// Unique ad slot IDs for each position
const AD_SLOTS: Record<AdBannerProps['position'], string> = {
  top: '4003156004',
  inline: '1920224971',
  side: '8294061635',
  left: '8294061635',
  right: '8294061635',
};

export default function AdBanner({ position, className = '' }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const insRef = useRef<HTMLModElement | null>(null);
  const hasPushedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [adState, setAdState] = useState<'loading' | 'loaded' | 'error' | 'blocked'>('loading');

  useEffect(() => {
    const container = containerRef.current;
    const ins = insRef.current;

    if (!container || !ins) {
      return;
    }

    const isDev = process.env.NODE_ENV === 'development';
    const isLocalhost = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
       window.location.hostname === '127.0.0.1' ||
       window.location.hostname.startsWith('192.168.'));

    // In development on localhost, AdSense won't work - show friendly message
    if (isDev && isLocalhost) {
      console.info(`[AdBanner] Development mode detected - ads won't load on localhost. Deploy to production to see ads.`);
      setAdState('loading'); // Keep in loading state to show placeholder
      return;
    }

    // Check for ad blocker
    const checkAdBlocker = () => {
      if (typeof window === 'undefined') return false;

      // Simple ad blocker detection
      const testDiv = document.createElement('div');
      testDiv.innerHTML = '&nbsp;';
      testDiv.className = 'adsbox';
      testDiv.style.position = 'absolute';
      testDiv.style.left = '-999px';
      document.body.appendChild(testDiv);
      const isBlocked = testDiv.offsetHeight === 0;
      document.body.removeChild(testDiv);
      return isBlocked;
    };

    // Single initialization function
    const initializeAd = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Skip if already pushed
      if (hasPushedRef.current) {
        return;
      }

      // Check if AdSense is loaded
      if (typeof window === 'undefined' || !window.adsbygoogle) {
        // Check for ad blocker
        if (checkAdBlocker()) {
          setAdState('blocked');
          console.warn('[AdBanner] Ad blocker detected');
          return;
        }

        // Retry after delay (max 10 seconds)
        const startTime = Date.now();
        const maxWaitTime = 10000; // 10 seconds

        const retryInit = () => {
          if (Date.now() - startTime > maxWaitTime) {
            setAdState('error');
            console.error('[AdBanner] AdSense script failed to load within timeout. Check your network or AdSense configuration.');
            return;
          }

          if (window.adsbygoogle) {
            initializeAd();
          } else {
            timeoutRef.current = setTimeout(retryInit, 200);
          }
        };

        timeoutRef.current = setTimeout(retryInit, 200);
        return;
      }

      // Push the ad
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        hasPushedRef.current = true;
        setAdState('loaded');
        console.log(`[AdBanner] Ad initialized successfully for position: ${position}`);
      } catch (error) {
        setAdState('error');
        console.error('[AdBanner] Failed to push ad:', error);
      }
    };

    // Use IntersectionObserver to initialize when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPushedRef.current) {
            initializeAd();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    // Cleanup function
    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [position]);

  const getContainerClasses = () => {
    const baseClasses = 'rounded-lg flex items-center justify-center w-full';
    const positionClasses = {
      top: 'mx-auto mb-6',
      side: 'mx-auto',
      inline: 'mx-auto my-6',
      left: 'w-48 h-96 min-h-[250px]',
      right: 'w-48 h-96 min-h-[250px]'
    };

    return `${baseClasses} ${positionClasses[position]} ${className}`;
  };

  // Show different states for debugging
  const showDebugInfo = process.env.NODE_ENV === 'development';

  return (
    <div
      ref={containerRef}
      className={getContainerClasses()}
      data-ad-container="true"
      data-ad-state={adState}
    >
      {showDebugInfo && adState === 'blocked' && (
        <div className="text-xs text-gray-500 p-4 text-center">
          <div className="font-semibold mb-1">🚫 Ad Blocker Detected</div>
          <div>Ad blocker is preventing ads from loading</div>
        </div>
      )}
      {showDebugInfo && adState === 'error' && (
        <div className="text-xs text-red-500 p-4 text-center">
          <div className="font-semibold mb-1">⚠️ Ad Failed to Load</div>
          <div>Check console for details</div>
        </div>
      )}
      {showDebugInfo && adState === 'loading' && (
        <div className="text-xs text-gray-500 p-4 text-center">
          <div className="font-semibold mb-1">📍 Ad Placeholder ({position})</div>
          <div className="text-[10px] mt-1">Ads don&apos;t show on localhost in development mode</div>
          <div className="text-[10px]">Slot ID: {AD_SLOTS[position]}</div>
        </div>
      )}
      <ins
        ref={insRef}
        className="adsbygoogle"
        data-ad-client="ca-pub-3759958145886276"
        data-ad-slot={AD_SLOTS[position]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
