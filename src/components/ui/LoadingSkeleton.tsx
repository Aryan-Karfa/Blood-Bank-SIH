import React from 'react';
import { cn } from '../../lib/utils';

export interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  height?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  count = 1,
  height = 'h-5',
}) => {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'bg-[#EAE9E4] animate-pulse rounded-[2px] w-full',
            height,
            className
          )}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Loading operational data...</span>
    </div>
  );
};
