"use client";
import { useEffect } from 'react';

interface AdBannerProps {
  position: 'top' | 'side' | 'inline';
  className?: string;
}

export default function AdBanner({ position, className = '' }: AdBannerProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        // @ts-expect-error adsbygoogle is not defined on Window
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsense error", e);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const getContainerClasses = () => {
    const baseClasses = 'rounded-lg flex items-center justify-center w-full';// bg-red-50
    const positionClasses = {
      top: 'mx-auto mb-6',
      side: 'mx-auto',
      inline: 'mx-auto my-6'
    };
    
    return `${baseClasses} ${positionClasses[position]} ${className}`;
  };

  return (
    <div className={getContainerClasses()} style={{ minHeight: '50px', minWidth: '100vh' }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100vh", height: "50%" }}
        data-ad-client="ca-pub-3759958145886276"
        data-ad-slot="4003156004"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
