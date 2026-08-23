import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Load Operational Data',
  message,
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'p-6 bg-[#FEF3F2] border border-[#FECDCA] rounded-[4px] flex flex-col items-start max-w-lg my-4',
        className
      )}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#B42318]" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#B42318]">{title}</h3>
      </div>
      <p className="text-xs text-[#171817] mt-2 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-3 bg-[#FFFFFF] border-[#FECDCA] text-[#B42318] hover:bg-[#FEF3F2]">
          RETRY REQUEST
        </Button>
      )}
    </div>
  );
};
