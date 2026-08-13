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
  slotId?: string; // Optional custom slot ID to override default
}

// Unique ad slot IDs for each position
const AD_SLOTS: Record<AdBannerProps['position'], string> = {
  top: '4003156004',
  inline: '1920224971',
  side: '8294061635',
  left: '8294061635',
  right: '8294061635',
};

// 'loading' reserves space, 'loaded' lets the creative size itself, and
// 'unfilled' / 'error' collapse the slot so no empty gap is left behind.
type AdState = 'loading' | 'loaded' | 'unfilled' | 'error';

// Test ads in development only. Derived from NODE_ENV rather than the
// hostname so the server and client render the same markup.
const IS_DEV = process.env.NODE_ENV === 'development';

export default function AdBanner({ position, className = '', slotId }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const insRef = useRef<HTMLModElement | null>(null);
  const hasPushedRef = useRef(false);
  const [adState, setAdState] = useState<AdState>('loading');

  useEffect(() => {
    const ins = insRef.current;

    if (!ins) {
      return;
    }

    // AdSense writes data-ad-status on the <ins> once the request resolves:
    // 'filled' when a creative was returned, 'unfilled' when it had nothing
    // to serve. Watching it is the only way to know a slot came back empty.
    const readAdStatus = () => {
      const status = ins.getAttribute('data-ad-status');

      if (status === 'filled') {
        setAdState('loaded');
      } else if (status === 'unfilled') {
        setAdState('unfilled');
      }

      if (IS_DEV && status) {
        console.log(`[AdBanner] Slot ${slotId || AD_SLOTS[position]} (${position}): ${status}`);
      }
    };

    const observer = new MutationObserver(readAdStatus);
    observer.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] });

    // Covers the case where AdSense resolved this slot before we attached.
    readAdStatus();

    // This form creates the queue array when the script has not arrived yet,
    // so AdSense drains it on load. No polling or readiness check is needed.
    if (!hasPushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        hasPushedRef.current = true;
      } catch (error) {
        setAdState('error');
        console.error('[AdBanner] Failed to push ad:', error);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [position, slotId]);

  const getContainerClasses = () => {
    const baseClasses = 'rounded-lg w-full';
    const positionClasses = {
      top: 'mx-auto mb-6 min-h-[90px]',
      side: 'mx-auto min-h-[250px]',
      inline: 'mx-auto my-6 min-h-[90px]',
      left: 'w-48 h-96 min-h-[250px]',
      right: 'w-48 h-96 min-h-[250px]'
    };

    return `${baseClasses} ${positionClasses[position]} ${className}`;
  };

  return (
    <div
      ref={containerRef}
      className={getContainerClasses()}
      data-ad-container="true"
      data-ad-state={adState}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client="ca-pub-3759958145886276"
        data-ad-slot={slotId || AD_SLOTS[position]}
        data-ad-format="auto"
        data-full-width-responsive="true"
        {...(IS_DEV ? { 'data-adtest': 'on' } : {})}
      />
    </div>
  );
}
