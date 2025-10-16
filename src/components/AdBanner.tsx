"use client";
import { useEffect, useRef } from 'react';

interface AdBannerProps {
  position: 'top' | 'side' | 'inline' | 'left' | 'right';
  className?: string;
}

export default function AdBanner({ position, className = '' }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const insRef = useRef<HTMLModElement | null>(null);
  const hasPushedRef = useRef(false);

  useEffect(() => {
    function tryPush() {
      if (hasPushedRef.current) return;
      const container = containerRef.current;
      const ins = insRef.current;
      if (!container || !ins) return;
      const width = container.offsetWidth;
      if (width && width > 0) {
        try {
          // @ts-expect-error adsbygoogle is not defined on Window
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          hasPushedRef.current = true;
        } catch {
          // Swallow and retry on next observer event
        }
      }
    }

    // Attempt immediately in case width is already available
    tryPush();

    // Observe size changes to push when width becomes available
    const resizeObserver = new ResizeObserver(() => {
      tryPush();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also attempt when element becomes visible in viewport
    const intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        tryPush();
      }
    }, { threshold: 0.1 });
    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
    }

    // Fallback: try on window load
    const onLoad = () => tryPush();
    window.addEventListener('load', onLoad);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('load', onLoad);
    };
  }, []);

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

  return (
    <div 
      ref={containerRef} 
      className={getContainerClasses()} 
      data-ad-container="true"
      style={{ 
        minHeight: '90px', 
        width: '100%', 
        display: 'block',
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        opacity: '1',
        visibility: 'visible',
        zIndex: '1'
      }}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ 
          display: "block", 
          width: "100%", 
          minHeight: "90px",
          opacity: '1',
          visibility: 'visible'
        }}
        data-ad-client="ca-pub-3759958145886276"
        data-ad-slot="4003156004"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
