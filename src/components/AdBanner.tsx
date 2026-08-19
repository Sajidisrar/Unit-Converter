"use client";
import { useEffect, useRef, useState } from 'react';

// Extend the Window interface to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

interface AdBannerProps {
  position: 'top' | 'side' | 'inline' | 'article-end' | 'left' | 'right';
  className?: string;
  slotId?: string; // Optional custom slot ID to override default
}

// Unique ad slot IDs for each position.
//
// AdSense fills the FIRST occurrence of a slot ID on a page and returns
// 'unfilled' for any later occurrence of the same ID. Positions that can
// appear together on one page must therefore map to different IDs.
//
// TODO: 'article-end' currently borrows the side-rail slot because no
// dedicated unit exists for it yet. Create a purpose-made display unit in
// the AdSense dashboard and point it here.
const AD_SLOTS: Record<AdBannerProps['position'], string> = {
  top: '4003156004',
  inline: '1920224971',
  side: '8294061635',
  'article-end': '8294061635',
  left: '8294061635',
  right: '8294061635',
};

// 'loading' reserves space, 'loaded' lets the creative size itself, and
// 'unfilled' / 'error' / 'duplicate' collapse the slot so no empty gap is
// left behind.
type AdState = 'loading' | 'loaded' | 'unfilled' | 'error' | 'duplicate';

// Test ads in development only. Derived from NODE_ENV rather than the
// hostname so the server and client render the same markup.
const IS_DEV = process.env.NODE_ENV === 'development';

// Slot IDs currently mounted on this page, reference-counted so client-side
// navigation cleans up correctly. A slot that is already mounted must not be
// pushed a second time -- that is the failure mode this guards against.
const mountedSlots = new Map<string, number>();

export default function AdBanner({ position, className = '', slotId }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const insRef = useRef<HTMLModElement | null>(null);
  const hasPushedRef = useRef(false);
  const [adState, setAdState] = useState<AdState>('loading');

  const resolvedSlot = slotId || AD_SLOTS[position];

  useEffect(() => {
    const ins = insRef.current;

    if (!ins) {
      return;
    }

    // Refuse to push a slot that is already live on this page. Pushing it
    // would come back unfilled and silently cost an impression.
    const alreadyMounted = (mountedSlots.get(resolvedSlot) ?? 0) > 0;
    mountedSlots.set(resolvedSlot, (mountedSlots.get(resolvedSlot) ?? 0) + 1);

    if (alreadyMounted) {
      setAdState('duplicate');
      console.warn(
        `[AdBanner] Slot ${resolvedSlot} (${position}) is already on this page. ` +
        `Skipping the duplicate push -- AdSense would return 'unfilled' for it. ` +
        `Give this position its own slot ID.`
      );

      return () => {
        mountedSlots.set(resolvedSlot, Math.max(0, (mountedSlots.get(resolvedSlot) ?? 1) - 1));
      };
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
        console.log(`[AdBanner] Slot ${resolvedSlot} (${position}): ${status}`);
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
      mountedSlots.set(resolvedSlot, Math.max(0, (mountedSlots.get(resolvedSlot) ?? 1) - 1));
    };
  }, [position, resolvedSlot]);

  const getContainerClasses = () => {
    const baseClasses = 'rounded-lg w-full';
    const positionClasses = {
      top: 'mx-auto mb-6 min-h-[90px]',
      side: 'mx-auto min-h-[250px]',
      inline: 'mx-auto my-6 min-h-[90px]',
      'article-end': 'mx-auto my-6 min-h-[90px]',
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
      {...(IS_DEV ? { 'data-ad-debug': 'true' } : {})}
    >
      {/* Dev-only status readout. An unfilled slot is collapsed by CSS, which
          makes it indistinguishable from a slot that never rendered -- this
          makes fill visible without deploying a diagnostic ad unit. */}
      {IS_DEV && (
        <span className="absolute top-0 left-0 z-50 bg-black/75 text-white text-[10px] font-mono px-1.5 py-0.5 rounded-br pointer-events-none">
          ad · {position} · {resolvedSlot} · {adState}
          {adState === 'unfilled' && ' (expected on localhost)'}
        </span>
      )}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client="ca-pub-3759958145886276"
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        {...(IS_DEV ? { 'data-adtest': 'on' } : {})}
      />
    </div>
  );
}
