"use client";
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

interface AdBannerProps {
  position: 'top' | 'side' | 'inline' | 'left' | 'right';
  className?: string;
  slotId?: string;
}

const AD_SLOTS: Record<AdBannerProps['position'], string> = {
  top: '4003156004',
  inline: '1920224971',
  side: '8294061635',
  left: '8294061635',
  right: '8294061635',
};

export default function AdBanner({ position, className = '', slotId }: AdBannerProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const insRef = useRef<HTMLModElement | null>(null);
  const [adState, setAdState] = useState<'loading' | 'loaded' | 'error' | 'blocked'>('loading');
  const [adKey, setAdKey] = useState(0);

  // Reset ad on route change so a fresh <ins> is created
  useEffect(() => {
    setAdKey(prev => prev + 1);
    setAdState('loading');
  }, [pathname]);

  useEffect(() => {
    const ins = insRef.current;
    if (!ins) return;

    const isDev = process.env.NODE_ENV === 'development';
    const isLocalhost = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
       window.location.hostname === '127.0.0.1' ||
       window.location.hostname.startsWith('192.168.'));

    if (isDev && isLocalhost) {
      return;
    }

    let pushed = false;
    let timeoutId: NodeJS.Timeout | null = null;

    const pushAd = () => {
      if (pushed) return;
      if (typeof window === 'undefined' || !window.adsbygoogle) return false;

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed = true;
        setAdState('loaded');
        return true;
      } catch {
        setAdState('error');
        return true;
      }
    };

    // Try immediately
    if (!pushAd()) {
      // Retry until AdSense script loads (max 15s)
      const start = Date.now();
      const retry = () => {
        if (Date.now() - start > 15000) {
          setAdState('error');
          return;
        }
        if (!pushAd()) {
          timeoutId = setTimeout(retry, 300);
        }
      };
      timeoutId = setTimeout(retry, 300);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [adKey, position, slotId]);

  const positionClasses: Record<string, string> = {
    top: 'mx-auto mb-6 min-h-[90px]',
    side: 'mx-auto',
    inline: 'mx-auto my-6 min-h-[250px]',
    left: 'w-48 h-96 min-h-[250px]',
    right: 'w-48 h-96 min-h-[250px]',
  };

  return (
    <div
      ref={containerRef}
      className={`w-full ${positionClasses[position]} ${className}`}
      data-ad-container="true"
      data-ad-state={adState}
    >
      <ins
        key={adKey}
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client="ca-pub-3759958145886276"
        data-ad-slot={slotId || AD_SLOTS[position]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
