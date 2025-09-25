"use client";
import { useEffect } from 'react';

interface AdBannerProps {
  position: 'top' | 'side' | 'inline';
  className?: string;
}

export default function AdBanner({ position, className = '' }: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-expect-error
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  const getContainerClasses = () => {
    const baseClasses = 'rounded-lg flex items-center justify-center';
    const positionClasses = {
      top: 'mx-auto mb-6',
      side: 'mx-auto',
      inline: 'mx-auto my-6'
    };
    
    return `${baseClasses} ${positionClasses[position]} ${className}`;
  };

  return (
    <div className={getContainerClasses()}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3759958145886276"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
