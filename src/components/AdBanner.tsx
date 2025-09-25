interface AdBannerProps {
  position: 'top' | 'side' | 'inline';
  className?: string;
}

export default function AdBanner({ position, className = '' }: AdBannerProps) {
  const getDimensions = () => {
    switch (position) {
      case 'top':
        return 'w-full h-[90px]'; // 728x90 leaderboard
      case 'side':
        return 'w-[300px] h-[250px]'; // 300x250 medium rectangle
      case 'inline':
        return 'w-full h-[90px]'; // 728x90 leaderboard
      default:
        return 'w-full h-[90px]';
    }
  };

  const getContainerClasses = () => {
    const baseClasses = 'bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center';
    const positionClasses = {
      top: 'mx-auto mb-6',
      side: 'mx-auto',
      inline: 'mx-auto my-6'
    };
    
    return `${baseClasses} ${positionClasses[position]} ${className}`;
  };

  return (
    <div className={getContainerClasses()}>
      <div className={`${getDimensions()} bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center`}>
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Advertisement ({position === 'side' ? '300x250' : '728x90'})
        </span>
      </div>
    </div>
  );
}
