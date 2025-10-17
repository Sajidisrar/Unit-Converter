'use client';

import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

const Skeleton = ({ className, lines = 1, height = 'h-4' }: SkeletonProps) => {
  if (lines === 1) {
    return (
      <div className={cn("skeleton", height, className)} />
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "skeleton",
            height,
            index === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
};

export default Skeleton;
